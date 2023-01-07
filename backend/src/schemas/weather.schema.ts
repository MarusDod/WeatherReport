import { IsLatitude, IsLongitude, IsNumber, Validate, ValidateNested } from 'class-validator';
import { ObjectType, InputType, Field, Int } from 'type-graphql'
import { CurrentWeather } from '../openweather';

@ObjectType()
export class RegionWeatherDTO {
    @Field()
    main: string

    @Field()
    description: string

    @Field()
    dayIcon: string
    @Field()
    nightIcon: string

    @Field()
    timezone: number;

    @Field()
    date: Date;

    @Field()
    latitude: number
    @Field()
    longitude: number

    @Field({nullable:true})
    rain?: number
    @Field({nullable:true})
    snow?: number

    @Field()
    city: string
    @Field()
    country: string

    @Field(() => Int)
    sunrise: number
    @Field(() => Int)
    sunset: number

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

    static toDTO(data: CurrentWeather): RegionWeatherDTO {
        return {
            main: data.weather[0].main,
            description: data.weather[0].description,
            dayIcon: `http://openweathermap.org/img/w/${data.weather[0].icon}@4x.png`,
            nightIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            date: new Date(data.dt * 1000),
            timezone: data.timezone,
            latitude: data.coord.lat,
            longitude: data.coord.lon,
            city: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            clouds: data.clouds.all,
            windSpeed: Math.floor((data.wind.speed / 1000) * 3600),
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
        }
    }
}

@InputType()
export class WeatherInputDTO {
    @Field(() => String,{nullable: true,})
    city?: string

    @Field(() => Int,{nullable: true,})
    id?: number

    @Field({nullable: true})
    @IsLatitude()
    lat?: number
    @Field({nullable: true})
    @IsLongitude()
    long?: number
}

@InputType()
export class PreferencesInputDTO {
    @Field({nullable: true})
    unit?: string

    @Field({nullable: true})
    lang?: string
}