import { Query, Resolver, Mutation, Arg, Int, Args } from "type-graphql"
import OpenWeatherFetcher, { CurrentWeatherResponse, ForecastResponse, Region } from "../openweather";
import { ForecastWeatherArgs, ForecastWeatherDTO } from "../schemas/forecast.schema";
import { RegionWeatherDTO, WeatherInputDTO } from "../schemas/weather.schema";
import { RegionParam, validateWeatherInput } from "../decorators";
import client from "../redis";

@Resolver(() => RegionWeatherDTO)
export class WeatherResolver {

    @Query(() => RegionWeatherDTO)
    @validateWeatherInput()
    async currentWeather(@Arg('input') input: WeatherInputDTO,@RegionParam() region: Region): Promise<RegionWeatherDTO>{
        let cityid: number = region.type === 'cityid' ? region.id 
            : region.type === 'city' ? parseInt((await client.get(`citynames:${region.name}`))!)
            : region.type === 'coordinate' ? parseInt((await client.get(`coordinates:${region.coord.lat}:${region.coord.lon}`))!)
            : NaN

        
        let data: CurrentWeatherResponse | undefined = undefined

        if(cityid) {
            const res = await client.get(`weather:${cityid}:current`)


            if(!!res)
                data = JSON.parse(res!)
        }

        if(!data){
            data = await new OpenWeatherFetcher()
                .fetchCityWeather(region)

            client.set(`coordinates:${data.coord.lat}:${data.coord.lon}`,data.id)
            client.set(`citynames:${data.name}`,data.id)

            client.setEx(`weather:${data.id}:current`,60 * 30,JSON.stringify(data))
        }


        return RegionWeatherDTO.toDTO(data)
    }


    @Query(() => ForecastWeatherDTO)
    @validateWeatherInput('forecast')
    async forecastWeather(@Args() forecast: ForecastWeatherArgs,@RegionParam('forecast') region: Region): Promise<ForecastWeatherDTO>{
        let cityid: number = region.type === 'cityid' ? region.id 
            : region.type === 'city' ? parseInt((await client.get(`citynames:${region.name}`))!)
            : region.type === 'coordinate' ? parseInt((await client.get(`coordinates:${region.coord.lat}:${region.coord.lon}`))!)
            : NaN

        
        let data: ForecastResponse | undefined = undefined

        if(cityid) {
            const res = await client.get(`weather:${cityid}:forecast`)


            if(!!res){
                console.log('CACHE')
                data = JSON.parse(res!)
            }
        }

        if(!data){
            data = await new OpenWeatherFetcher()
                .fetchCityForecast(region)

            console.log('FETCH')

            client.set(`coordinates:${data.city.coord.lat}:${data.city.coord.lon}`,data.city.id)
            client.set(`citynames:${data.city.name}`,data.city.id)

            client.setEx(`weather:${data.city.id}:forecast`,60 * 30,JSON.stringify(data))
        }

        return ForecastWeatherDTO.toDTO(data)
    }
}