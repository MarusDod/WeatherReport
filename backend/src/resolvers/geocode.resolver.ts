import { Arg, Query, Resolver } from "type-graphql";
import { GeoCodeDTO, GeoCodeInput } from "../schemas/geo.schema";
import OpenWeatherFetcher, { GeoCodeResponse } from "../openweather";
import { handleAPIErrorCode } from "./weather.resolver";
import { GraphQLError } from "graphql";
import client from "../redis";

@Resolver()
export class GeoCodeResolver {

    @Query(() => [GeoCodeDTO])
    async geoCode(@Arg('input') input: GeoCodeInput,@Arg('limit',{nullable: true}) limit: number): Promise<GeoCodeDTO[]>{
        const keys = Object.values(input)

        const cacheKey = keys.join(':')

        let cacheRes = await client.get(`geo:${cacheKey}`)

        let data: GeoCodeResponse

        if(!cacheRes){
            data = await new OpenWeatherFetcher().fetchGeoData(keys,limit)
            await client.set(`geo:${cacheKey}`,JSON.stringify(data))
        }
        else {
            data = JSON.parse(cacheRes)
        }


        if(!data || data.length < 1){
            throw new GraphQLError("internal error")
        }

        return data.map(d =>  ({
            country: d.country,
            lat: d.lat,
            lon: d.lon,
            name: d.name
        }))
    }
}