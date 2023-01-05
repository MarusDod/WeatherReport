import { ApolloError, GraphQLErrors } from "@apollo/client/errors"
import { GraphQLError, GraphQLErrorOptions, GraphQLFormattedError } from "graphql"
import { toast } from "react-toastify"

export const kelvinToCelsius = 
    (k: number): number => Math.round((k - 273.15) * 100) / 100

export const groupBy = <T>(arr: Array<T>,grouper: (x: T) => string): Record<string,Array<T>> => {
    const res: Record<string,Array<T>> = {}

    arr.forEach(a => {
        const key = grouper(a)

        if(res[key]){
            res[key].push(a)
        }
        else{
            res[key] = [a]
        }
    })

    return res
}

export const handleGraphqlErrors = (errors: any): void => {
    errors.networkError.result.errors.forEach((e: GraphQLError) => {
        if(e.message){
            toast(e.message)
        }
        (e.originalError as any).validationErrors?.forEach((v: Record<string,string>) => {
            Object.values(v.constraints).forEach(c => {
                toast(c,{
                    type:  "warning",
                })
            })
        })
    })
}