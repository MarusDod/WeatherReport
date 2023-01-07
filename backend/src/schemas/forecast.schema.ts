import { ObjectType, Field, ArgsType, Int } from 'type-graphql'
import {  PreferencesInputDTO, WeatherInputDTO } from './weather.schema'
import { IsInt, IsPositive, Max, Min } from 'class-validator'
import { ForecastResponse } from '../openweather'

@ObjectType()
export class Forecast {
    @Field()
    main: string

    @Field()
    description: string

    @Field()
    dayIcon: string
    @Field()
    nightIcon: string

    @Field()
    date: Date;

    @Field({nullable:true})
    rain?: number
    @Field({nullable:true})
    snow?: number

    @Field()
    seaLevel: number

    @Field()
    clouds: number

    @Field()
    windSpeed: number
    @Field()
    windDegrees: number

    @Field()
    visibility: number

    @Field()
    feelsLike: number

    @Field()
    temperature: number
    @Field()
    minTemperature: number
    @Field()
    maxTemperature: number

    @Field()
    pressure: number

    @Field()
    humidity: number

    static toDTO(data: ForecastResponse['list'] extends Array<infer A> ? A : never): Forecast {
        return {
            main: data.weather[0].main,
            description: data.weather[0].description,
            dayIcon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            nightIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            date: new Date(data.dt * 1000),
            clouds: data.clouds.all,
            windSpeed: (data.wind.speed / 1000) * 3600,
            windDegrees: data.wind.deg,
            visibility:data.visibility,
            feelsLike: data.main.feels_like,
            temperature: data.main.temp,
            minTemperature: data.main.temp_min,
            maxTemperature: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            rain: data.rain ? data.rain[Object.keys(data.rain)[0]] : undefined,
            snow: data.snow ? data.snow[Object.keys(data.snow)[0]] : undefined,
            seaLevel: data.main.sea_level
        }
    }
}

@ObjectType()
export class City {
    @Field()
    id: number
    @Field()
    name: string
    @Field()
    latitude: number
    @Field()
    longitude: number
    @Field()
    country: string
    @Field(() => Int)
    sunrise: number
    @Field(() => Int)
    sunset: number
    @Field(() => Int)
    timezone: number
}


@ObjectType()
export class ForecastWeatherDTO {
    @Field(() => Int)
    count: number

    @Field(() => City)
    city: City

    @Field(() => [Forecast],{nullable: 'items'})
    results: Forecast[]

    static toDTO(forecast: ForecastResponse): ForecastWeatherDTO {
        return {
            count: forecast.cnt,
            city: {
                id: forecast.city.id,
                latitude: forecast.city.coord.lat,
                longitude: forecast.city.coord.lon,
                country: forecast.city.country,
                name: forecast.city.name,
                sunrise: forecast.city.sunrise,
                sunset: forecast.city.sunset,
                timezone: forecast.city.timezone,
            },
            results: forecast.list.map(l => Forecast.toDTO(l))
        }
    }
}

@ArgsType()
export class ForecastWeatherArgs {
    @Field(() => Int,{nullable: true})
    @IsInt()
    @Min(0)
    @Max(40)
    limit?: number

    @Field(() => WeatherInputDTO)
    input: WeatherInputDTO

    @Field(() => PreferencesInputDTO,{nullable: true})
    pref?: PreferencesInputDTO
}