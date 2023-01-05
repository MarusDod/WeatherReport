import React, { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import Layout from "./Layout"
import { Coordinates } from "./lib/types"
import ForecastWeatherQuery from "./components/forecastWeatherWidget"


const ForecastPage: React.FC = () => {

    const [searchParams,setSearchParams] = useSearchParams()

    const coords = useMemo<Coordinates | null>(() => {
        const latitude = searchParams.get('latitude')
        const longitude = searchParams.get('longitude')

        if(!latitude || !longitude){
            return null
        }

        return {
            lat: parseFloat(searchParams.get('latitude')!),
            long: parseFloat(searchParams.get('longitude')!),
        }
    },[searchParams])

    return <Layout>
        {!!coords ? 
            <ForecastWeatherQuery coordinates={coords} />
            : <></>
        }
    </Layout>
}

export default ForecastPage