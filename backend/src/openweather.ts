export type Unit = 'imperial' | 'metric' | 'internal'

interface Coordinate {
    lat: number,
    lon: number,
}

export type Region = {
    type: 'cityid',
    id: number,
} | {
    type: 'coordinate',
    coord: Coordinate
} | {
    type: 'city',
    name: string[],
}

export interface WeatherHttpStatus {
    cod: number
}

export interface CurrentWeather {
    coord: Coordinate,
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: string,
    }>,
    main: {
        feels_like: number
        temp: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
    },
    rain?: Record<string,number>
    snow?: Record<string,number>
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number,
    },
    clouds: {
        all: number
    },
    dt: number,
    timezone: number,
    id: string,
    name: string,
}

export interface OpenWeatherOptions {
    unit?: Unit,
    lang?: string,
    cnt?: number,
}

export type CurrentWeatherResponse = CurrentWeather & WeatherHttpStatus

export type ForecastResponse = WeatherHttpStatus & {
    cnt: number,
    city: {
        coord: Coordinate,
        id: number
        name: string
        country: string,
        sunrise: number,
        sunset: number,
        timezone: number,
    },
    list: Array<{
        weather: Array<{
            id: number,
            main: string,
            description: string,
            icon: string,
        }>,
        main: {
            feels_like: number,
            temp: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            sea_level: number,
            humidity: number,
        },
        visibility: number,
        wind: {
            speed: number,
            deg: number,
        },
        rain?: Record<string,number>
        snow?: Record<string,number>
        clouds: {
            all: number
        },
        dt: number,
    }>
}

export default class OpenWeatherFetcher{
    static baseURL = "https://api.openweathermap.org/data/2.5"

    private apiKey: string | undefined
    private options: OpenWeatherOptions

    /**
     * wrapper of OpenWeather free API
     */
    constructor(options?: OpenWeatherOptions){
        this.apiKey = process.env['OPENWEATHER_API'] ?? undefined

        this.options = options ?? {}
    }

    useApiKey(apiKey: string) {
        this.apiKey = apiKey

        return this
    }

    withOptions(options: Partial<OpenWeatherOptions>) {
        let openweather = new OpenWeatherFetcher(this.options)

        openweather.options.lang = options.lang ?? openweather.options.lang
        openweather.options.unit = options.unit ?? openweather.options.unit

        return openweather
    }

    private fetchCityData(endpoint: string,region: Region): Promise<any> {
        let req = `${OpenWeatherFetcher.baseURL}/${endpoint}?`
        
        req += `${region.type === 'cityid' ? `id=${region.id}` : region.type === 'city' ? `q=${region.name.join(',')}` : region.type === 'coordinate' ? `lat=${region.coord.lat}&lon=${region.coord.lon}`: ""}`

        req += this.options.unit ? `&unit=${this.options.unit}` : ''
        req += this.options.lang ? `&lang=${this.options.lang}` : ''
        req += this.options.cnt ? `&cnt=${this.options.cnt}` : ''
        req += `&mode=json`
        req += `&appid=${this.apiKey}`

        return fetch(req).then(res => res.json())
    }

    fetchCityWeather(region: Region): Promise<CurrentWeatherResponse> {
        return this.fetchCityData('weather',region)
    }

    fetchCityForecast(region: Region): Promise<ForecastResponse> {
        return this.fetchCityData('forecast',region)
    }
}
