import "reflect-metadata"

import dotenv from 'dotenv'

dotenv.config({path: `.env.${process.env['NODE_ENV']}`})

import express from 'express'
import { graphql } from 'graphql'
import { buildSchema } from 'type-graphql'
import { graphqlHTTP } from 'express-graphql'
import { WeatherResolver } from './resolvers/weather.resolver';
import OpenWeatherFetcher from './openweather';
import connectRedis from 'connect-redis'
import session, { Cookie } from 'express-session'
import cors from 'cors'

import { AuthResolver } from "./resolvers/auth.resolver"
import client, { sessionClient } from "./redis"
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "redis"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import { RedisUser } from "./schemas/user.schema"
import { GeoCodeResolver } from "./resolvers/geocode.resolver"


const app = express();

const RedisStore = connectRedis(session);

(async () => {
    app.get('/hello',(req,res) => {
        res.send('hello!')
    })

    app.use('/graphql',session({
        name: 'sid',
        secret: process.env['SESSION_SECRET'] ?? '',
        store: new RedisStore({
            client: sessionClient
        }),
        resave: false,
        saveUninitialized: false,
        genid: req => uuidv4(),
        proxy: process.env['NODE_ENV'] === 'production',
        cookie: {
            maxAge: 2 * 3600 * 1000,
            httpOnly: true,
            secure: process.env['NODE_ENV'] === 'production',
            sameSite: "none"
        }
    }))

    app.use(cookieParser())
    app.use(cors({
        origin: [
            "http://localhost:9200/graphql",
            "http://localhost:3000",
            "https://wreport.onrender.com",
        ],
        credentials: true,
    }))

    app.use(
        '/graphql', graphqlHTTP(async (req,res) => ({
                graphiql: true,
                context: {req,res},
                schema: await buildSchema({
                    emitSchemaFile: true,
                    resolvers: [WeatherResolver,AuthResolver,GeoCodeResolver],
                    authChecker: async ({root,args,context,info}) => {
                        const user: RedisUser | undefined = context.req.session.user

                        if(!user)
                            return false

                        const sess = JSON.parse((await client.get(`sess:${req['sessionID']}`))!!)['user']

                        return !!sess && sess['id'] === user.id
                    },
                    validate: true,
                }),
                customFormatErrorFn: error => ({
                        name: error.name,
                        message: error.message,
                        positions: error.positions,
                        extensions: error.extensions,
                        originalError: error.originalError,
                    })
            })))

    app.listen(9200,() => console.log('ready...'))
})()
