import { IsEmail, MinLength } from 'class-validator'
import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
export class User {
    @Field()
    username: string

    @Field()
    email: string
}

@ObjectType()
export class LogoutInfo {
    @Field(() => Boolean)
    success: boolean
}

export class RedisUser {
    id: string
    username: string
    email: string
    hashedPassword: string
}

export type Session = Omit<RedisUser,"hashedPassword">

@InputType()
export class SignUpInput {
    @Field()
    username: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @MinLength(6)
    password: string

    @Field()
    confirmationPassword: string
}

@InputType()
export class LoginInput {
    @Field()
    @IsEmail()
    email: string

    @Field()
    password: string
}
