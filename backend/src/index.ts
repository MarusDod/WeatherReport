import "reflect-metadata"

import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import { graphql } from 'graphql'
import { buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'
import { WeatherResolver } from './resolvers/weather.resolver';
import OpenWeatherFetcher from './openweather';

import { AuthResolver } from "./resolvers/auth.resolver"


const app = express();

(async () => {
    app.get('/hello',(req,res) => {
        res.send('hello!')
    })

    //test
    app.get('/weather',async (req,res) => {
        return res.json(await new OpenWeatherFetcher().fetchCityWeather({type: 'city',name: ['Lisbon']}))
    })

    app.use(
        '/graphql',
        graphqlHTTP({
            graphiql: true,
            schema: await buildSchema({
                emitSchemaFile: true,
                resolvers: [WeatherResolver,AuthResolver],
                validate: true,
            }),
            customFormatErrorFn: error => {
                console.log(error)
                return ({
                name: error.name,
                message: error.message,
                stack: error.stack,
                locations: error.locations,
                source: error.source,
                path: error.path,
                positions: error.positions,
                extensions: error.extensions,
                originalError: error.originalError,
            })
        }
        })
    )

    app.listen(9200,() => console.log('ready...'))
})()