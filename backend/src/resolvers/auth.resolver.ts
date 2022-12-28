import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { LoginInput, SignUpInput, User } from "../schemas/user.schema";

@Resolver(() => User)
export class AuthResolver {
    @Mutation(() => User)
    signUp(@Arg('input') input: SignUpInput){

    }

    @Mutation(() => User)
    login(@Arg('input') input: LoginInput){
        
    }
}