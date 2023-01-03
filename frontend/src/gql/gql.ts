/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    mutation Login($email: String!,$password: String!) {\n        login(input: {email: $email,password: $password}) {\n                username\n                email\n        }\n    }\n": types.LoginDocument,
    "\n    mutation Signup($username: String!,$email: String!, $password: String!,$confirmationPassword: String!) {\n        signUp(input: {username: $username,email: $email,password: $password,confirmationPassword: $confirmationPassword}) {\n                username\n                email\n        }\n    }\n": types.SignupDocument,
    "\n    query CurrentWeatherByLocationQuery($lat: Float,$long: Float){\n        currentWeather(input: {lat: $lat,long: $long}){\n            main\n            description\n            dayIcon\n            nightIcon\n            date\n            timezone\n            latitude\n            longitude\n            city\n            country\n            sunrise\n            sunset\n            clouds\n            windSpeed\n            windDegrees\n            visibility\n            feelsLike\n            temperature\n            minTemperature\n            maxTemperature\n            pressure\n            humidity\n            rain\n            snow\n        }\n    }\n": types.CurrentWeatherByLocationQueryDocument,
    "\n    fragment ForecastFragment on Forecast {\n        windDegrees\n        temperature\n        maxTemperature\n        minTemperature\n        feelsLike\n        pressure\n        seaLevel\n        snow\n        rain\n        clouds\n        description\n        date\n        clouds\n        dayIcon\n        nightIcon\n        feelsLike\n        humidity\n        main\n        visibility\n        windDegrees\n        windSpeed\n    }\n": types.ForecastFragmentFragmentDoc,
    "\n    fragment CityFragment on City {\n        id\n        latitude\n        longitude\n        name\n        country\n        sunrise\n        sunset\n    }\n": types.CityFragmentFragmentDoc,
    "\n    query ForecastByCityNameQuery($limit: Int,$city: String!) {\n        forecastWeather (limit: $limit,input: {city: $city}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n": types.ForecastByCityNameQueryDocument,
    "\n    query ForecastByCityIdQuery($limit: Int,$cityid: Int!) {\n        forecastWeather (limit: $limit,input: {id: $cityid}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n": types.ForecastByCityIdQueryDocument,
    "\n    query ForecastByCoordinatesQuery($limit: Int,$lat: Float!,$long: Float!) {\n        forecastWeather (limit: $limit,input: {lat: $lat,long: $long}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n": types.ForecastByCoordinatesQueryDocument,
    "\n    query CityInfoByIdQuery($id: Int!) {\n        forecastWeather (limit: 0,input: {id: $id}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n": types.CityInfoByIdQueryDocument,
    "\n    query CityInfoByNameQuery($name: String!) {\n        forecastWeather (limit: 0,input: {city: $name}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n": types.CityInfoByNameQueryDocument,
    "\n    query CityInfoByCoordinatesQuery($lat: Float!,$long: Float!) {\n        forecastWeather (limit: 0,input: {lat: $lat,long: $long}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n": types.CityInfoByCoordinatesQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($email: String!,$password: String!) {\n        login(input: {email: $email,password: $password}) {\n                username\n                email\n        }\n    }\n"): (typeof documents)["\n    mutation Login($email: String!,$password: String!) {\n        login(input: {email: $email,password: $password}) {\n                username\n                email\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Signup($username: String!,$email: String!, $password: String!,$confirmationPassword: String!) {\n        signUp(input: {username: $username,email: $email,password: $password,confirmationPassword: $confirmationPassword}) {\n                username\n                email\n        }\n    }\n"): (typeof documents)["\n    mutation Signup($username: String!,$email: String!, $password: String!,$confirmationPassword: String!) {\n        signUp(input: {username: $username,email: $email,password: $password,confirmationPassword: $confirmationPassword}) {\n                username\n                email\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CurrentWeatherByLocationQuery($lat: Float,$long: Float){\n        currentWeather(input: {lat: $lat,long: $long}){\n            main\n            description\n            dayIcon\n            nightIcon\n            date\n            timezone\n            latitude\n            longitude\n            city\n            country\n            sunrise\n            sunset\n            clouds\n            windSpeed\n            windDegrees\n            visibility\n            feelsLike\n            temperature\n            minTemperature\n            maxTemperature\n            pressure\n            humidity\n            rain\n            snow\n        }\n    }\n"): (typeof documents)["\n    query CurrentWeatherByLocationQuery($lat: Float,$long: Float){\n        currentWeather(input: {lat: $lat,long: $long}){\n            main\n            description\n            dayIcon\n            nightIcon\n            date\n            timezone\n            latitude\n            longitude\n            city\n            country\n            sunrise\n            sunset\n            clouds\n            windSpeed\n            windDegrees\n            visibility\n            feelsLike\n            temperature\n            minTemperature\n            maxTemperature\n            pressure\n            humidity\n            rain\n            snow\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ForecastFragment on Forecast {\n        windDegrees\n        temperature\n        maxTemperature\n        minTemperature\n        feelsLike\n        pressure\n        seaLevel\n        snow\n        rain\n        clouds\n        description\n        date\n        clouds\n        dayIcon\n        nightIcon\n        feelsLike\n        humidity\n        main\n        visibility\n        windDegrees\n        windSpeed\n    }\n"): (typeof documents)["\n    fragment ForecastFragment on Forecast {\n        windDegrees\n        temperature\n        maxTemperature\n        minTemperature\n        feelsLike\n        pressure\n        seaLevel\n        snow\n        rain\n        clouds\n        description\n        date\n        clouds\n        dayIcon\n        nightIcon\n        feelsLike\n        humidity\n        main\n        visibility\n        windDegrees\n        windSpeed\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CityFragment on City {\n        id\n        latitude\n        longitude\n        name\n        country\n        sunrise\n        sunset\n    }\n"): (typeof documents)["\n    fragment CityFragment on City {\n        id\n        latitude\n        longitude\n        name\n        country\n        sunrise\n        sunset\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ForecastByCityNameQuery($limit: Int,$city: String!) {\n        forecastWeather (limit: $limit,input: {city: $city}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query ForecastByCityNameQuery($limit: Int,$city: String!) {\n        forecastWeather (limit: $limit,input: {city: $city}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ForecastByCityIdQuery($limit: Int,$cityid: Int!) {\n        forecastWeather (limit: $limit,input: {id: $cityid}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query ForecastByCityIdQuery($limit: Int,$cityid: Int!) {\n        forecastWeather (limit: $limit,input: {id: $cityid}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ForecastByCoordinatesQuery($limit: Int,$lat: Float!,$long: Float!) {\n        forecastWeather (limit: $limit,input: {lat: $lat,long: $long}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query ForecastByCoordinatesQuery($limit: Int,$lat: Float!,$long: Float!) {\n        forecastWeather (limit: $limit,input: {lat: $lat,long: $long}) {\n            results {\n                ...ForecastFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CityInfoByIdQuery($id: Int!) {\n        forecastWeather (limit: 0,input: {id: $id}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query CityInfoByIdQuery($id: Int!) {\n        forecastWeather (limit: 0,input: {id: $id}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CityInfoByNameQuery($name: String!) {\n        forecastWeather (limit: 0,input: {city: $name}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query CityInfoByNameQuery($name: String!) {\n        forecastWeather (limit: 0,input: {city: $name}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CityInfoByCoordinatesQuery($lat: Float!,$long: Float!) {\n        forecastWeather (limit: 0,input: {lat: $lat,long: $long}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query CityInfoByCoordinatesQuery($lat: Float!,$long: Float!) {\n        forecastWeather (limit: 0,input: {lat: $lat,long: $long}) {\n            city {\n                ...CityFragment\n            }\n        }\n    }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;