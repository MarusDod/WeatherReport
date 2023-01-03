import { Query, Resolver, Mutation, Arg, Int, Args, Authorized } from "type-graphql"
import OpenWeatherFetcher, { CurrentWeatherResponse, ForecastResponse, Region } from "../openweather";
import { ForecastWeatherArgs, ForecastWeatherDTO } from "../schemas/forecast.schema";
import { PreferencesInputDTO, RegionWeatherDTO, WeatherInputDTO } from "../schemas/weather.schema";
import { RegionParam, validateWeatherInput } from "../decorators";
import client from "../redis";
import { GraphQLError } from "graphql";

const weatherCacheExpire = 60 * 30
const forecastCacheExpire = 60 * 60 * 3

function handleAPIErrorCode(code: number): void {
    switch(code){
        case 200:
            break;
        case 401:
            throw new GraphQLError('invalid openweather API key')
        case 404:
            throw new GraphQLError('internal error')
        case 400:
            throw new GraphQLError('invalid geocode location')
    }
}

@Resolver(() => RegionWeatherDTO)
export class WeatherResolver {

    @Query(() => RegionWeatherDTO)
    @validateWeatherInput()
    async currentWeather(@Arg('input') input: WeatherInputDTO,@RegionParam() region: Region,@Arg('preferences',{nullable: true}) pref: PreferencesInputDTO): Promise<RegionWeatherDTO>{
        let cityid: number = region.type === 'cityid' ? region.id 
            : region.type === 'city' ? parseInt((await client.get(`citynames:${region.name}`))!)
            : region.type === 'coordinate' ? parseInt((await client.get(`coordinates:${region.coord.lat}:${region.coord.lon}`))!)
            : NaN

        
        let data: CurrentWeatherResponse | undefined = undefined

        if(cityid) {
            const res = await client.get(`weather:${cityid}:current`)


            if(!!res){
                data = JSON.parse(res!)
            }
        }

        if(!data){
            data = await new OpenWeatherFetcher()
                .fetchCityWeather(region)

            handleAPIErrorCode(data.cod)

            client.set(`coordinates:${data.coord.lat}:${data.coord.lon}`,data.id)
            client.set(`citynames:${data.name}`,data.id)

            client.setEx(`weather:${data.id}:current`,weatherCacheExpire,JSON.stringify(data))
        }


        return RegionWeatherDTO.toDTO(data)
    }


    @Authorized()
    @Query(() => ForecastWeatherDTO)
    @validateWeatherInput('forecast')
    async forecastWeather(@Args() forecast: ForecastWeatherArgs,@RegionParam('forecast') region: Region): Promise<ForecastWeatherDTO>{
        let cityid: number = region.type === 'cityid' ? region.id 
            : region.type === 'city' ? parseInt((await client.get(`citynames:${region.name}`))!)
            : region.type === 'coordinate' ? parseInt((await client.get(`coordinates:${region.coord.lat}:${region.coord.lon}`))!)
            : NaN;

        let data: ForecastResponse | undefined = undefined

        if(cityid) {
            const cnt = await client.get(`weather:${cityid}:count`)


            if(!!cnt && parseInt(cnt) >= (!forecast.limit ? 0 : forecast.limit > 40 ? 40 : forecast.limit)){
                console.log('CACHE')
                data = JSON.parse((await client.get(`weather:${cityid}:forecast`))!!)
            }
        }

        if(!data){
            data = await new OpenWeatherFetcher()
                .fetchCityForecast(region)

            console.log('FETCH')
            handleAPIErrorCode(data.cod)

            client.set(`coordinates:${data.city.coord.lat}:${data.city.coord.lon}`,data.city.id)
            client.set(`citynames:${data.city.name}`,data.city.id)

            client.setEx(`weather:${data.city.id}:forecast`,forecastCacheExpire,JSON.stringify(data))
            client.setEx(`weather:${data.city.id}:count`,forecastCacheExpire,data.cnt.toString())
        }

        return ForecastWeatherDTO.toDTO(data)
    }
}