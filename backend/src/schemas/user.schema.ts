import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
export class User {
    @Field()
    username: string

    @Field()
    mail: string
}

@InputType()
export class SignUpInput {
    @Field()
    username: string

    @Field()
    mail: string

    @Field()
    password: string

    @Field()
    confirmationPassword: string
}

@InputType()
export class LoginInput {
    @Field()
    mail: string

    @Field()
    password: string
}