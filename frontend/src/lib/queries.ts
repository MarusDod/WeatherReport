import gql from 'graphql-tag'
 
export const loginMutation = gql`
    mutation Login($email: String!,$password: String!) {
        login(input: {email: $email,password: $password}) {
                username
                email
        }
    }
`

export const signupMutation = gql`
    mutation Signup($username: String!,$email: String!, $password: String!,$confirmationPassword: String!) {
        signUp(input: {username: $username,email: $email,password: $password,confirmationPassword: $confirmationPassword}) {
                username
                email
        }
    }
`

export const currentWeatherByLocationQuery = gql`
    query CurrentWeatherByLocationQuery($lat: Float,$long: Float){
        currentWeather(input: {lat: $lat,long: $long}){
            main
            description
            dayIcon
            nightIcon
            date
            timezone
            latitude
            longitude
            city
            country
            sunrise
            sunset
            clouds
            windSpeed
            windDegrees
            visibility
            feelsLike
            temperature
            minTemperature
            maxTemperature
            pressure
            humidity
            rain
            snow
        }
    }
`;

export const forecastFragment = gql`
    fragment ForecastFragment on Forecast {
        windDegrees
        temperature
        maxTemperature
        minTemperature
        feelsLike
        pressure
        seaLevel
        snow
        rain
        clouds
        description
        date
        clouds
        dayIcon
        nightIcon
        feelsLike
        humidity
        main
        visibility
        windDegrees
        windSpeed
    }
`

export const cityFragment = gql`
    fragment CityFragment on City {
        id
        latitude
        longitude
        name
        country
        sunrise
        sunset
    }
`

export const forecastByCityNameQuery = gql`
    query ForecastByCityNameQuery($limit: Int,$city: String!) {
        forecastWeather (limit: $limit,input: {city: $city}) {
            results {
                ...ForecastFragment
            }
        }
    }
`

export const forecastByCityIdQuery = gql`
    query ForecastByCityIdQuery($limit: Int,$cityid: Int!) {
        forecastWeather (limit: $limit,input: {id: $cityid}) {
            results {
                ...ForecastFragment
            }
        }
    }
`

export const forecastByCoordinatesQuery = gql`
    query ForecastByCoordinatesQuery($limit: Int,$lat: Float!,$long: Float!) {
        forecastWeather (limit: $limit,input: {lat: $lat,long: $long}) {
            results {
                ...ForecastFragment
            }
        }
    }
`

export const cityInfoByIdQuery = gql`
    query CityInfoByIdQuery($id: Int!) {
        forecastWeather (limit: 0,input: {id: $id}) {
            city {
                ...CityFragment
            }
        }
    }
`

export const cityInfoByNameQuery = gql`
    query CityInfoByNameQuery($name: String!) {
        forecastWeather (limit: 0,input: {city: $name}) {
            city {
                ...CityFragment
            }
        }
    }
`
export const cityInfoByCoordinatesQuery = gql`
    query CityInfoByCoordinatesQuery($lat: Float!,$long: Float!) {
        forecastWeather (limit: 0,input: {lat: $lat,long: $long}) {
            city {
                ...CityFragment
            }
        }
    }
`