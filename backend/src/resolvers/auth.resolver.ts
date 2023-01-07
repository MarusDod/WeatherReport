import { Query, Resolver, Mutation, Arg, Ctx, ID, Authorized } from "type-graphql"
import { LoginInput, LogoutInfo, RedisUser, SignUpInput, User } from "../schemas/user.schema";
import { GraphQLError } from "graphql";
import client from "../redis";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function saltPassword(password: string): Promise<string>{
    const saltRounds = 10

    return new Promise((res,rej) => bcrypt.genSalt(saltRounds, (saltError, salt) => {
        if (saltError) {
            rej(saltError)
        } else {
        bcrypt.hash(password, salt, (hashError, hash) => {
            if (hashError) {
                return rej(hashError)
            }

            res(hash)
        })
        }
    }))
}

@Resolver(() => User)
export class AuthResolver {
    @Mutation(() => User)
    async signUp(@Ctx() ctx,@Arg('input') input: SignUpInput): Promise<User> {
        if(input.confirmationPassword !== input.password){
            throw new GraphQLError('passwords don\'t match')
        }

        if(!!await client.get(`email:${input.email}`)){
            throw new GraphQLError('user already exists')
        }

        let user: RedisUser = {
            id: uuidv4(),
            username: input.username,
            email: input.email,
            hashedPassword: await saltPassword(input.password),
        }

        await client
            .multi()
            .hSet(`user:${user.id}`,Object.entries(user))
            .set(`email:${user.email}`,user.id)
            .exec()

        ctx.req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        return {
            username: user.username,
            email: user.email,
        }
    }

    @Mutation(() => User)
    async login(@Ctx() context,@Arg('input') input: LoginInput): Promise<User> {
        const userid = await client.get(`email:${input.email}`)
        
        if(!userid){
            throw new GraphQLError('no such email')
        }
        
        let user = await client.hGetAll(`user:${userid}`) as unknown as RedisUser | undefined

        if(!user){
            throw new GraphQLError('user might\'ve been deleted')
        }

        if(!bcrypt.compareSync(input.password,user.hashedPassword)){
            throw new GraphQLError('invalid password. try again')
        }

        context.req.session.user = user

        return {
            username: user.username,
            email: user.email
        }
    }

    @Authorized()
    @Query(() => User)
    profile (@Ctx() ctx): User {
        return ctx.req.session.user
    }

    @Authorized()
    @Mutation(() => LogoutInfo)
    async logout(@Ctx() ctx): Promise<LogoutInfo>{
        const user = ctx.req.session.user

        if(!user){
            return {success: false}
        }

        try {
            await ctx.req.session.destroy()
        }
        catch(_){
            return {success: false}
        }

        return {success: true}
    }
}