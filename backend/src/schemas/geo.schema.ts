import { IsEmail, MinLength } from 'class-validator'
import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
export class GeoCodeDTO {
    @Field()
    name: string

    @Field()
    lat: number

    @Field()
    lon: number

    @Field()
    country: string
}

@InputType()
export class GeoCodeInput {
    @Field()
    city: string

    @Field({nullable: true})
    state?: string

    @Field({nullable: true})
    country?: string
}