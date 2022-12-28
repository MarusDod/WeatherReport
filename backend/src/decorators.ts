import { createMethodDecorator, createParamDecorator } from "type-graphql";
import { WeatherInputDTO } from "./schemas/weather.schema";
import { GraphQLError } from "graphql";

export const validateWeatherInput = (field?: string) => createMethodDecorator(async ({args},next) => {
    let input: WeatherInputDTO = args['input']

    if([!!input.city,!!input.id,!! (input.lat && input.long)].filter(i => i === true).length !== 1){
        throw new GraphQLError('must specify one of: city | id | {lat,long}')
    }

    return next()
})

export const RegionParam = (field?: string) => createParamDecorator(({args}) => {
    const input: WeatherInputDTO = args['input']

    return input.id !== undefined ?
        {
            type: 'cityid',
            id: input.id!
        } : input.city !== undefined ? 
        {
            type: 'city',
            name: [input.city!]
        } : {
            type: 'coordinate',
            coord: {
                lat: input.lat!,
                lon: input.long!,
            }
        }
})