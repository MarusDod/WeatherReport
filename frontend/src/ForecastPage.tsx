import React, { useMemo } from "react"
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"
import Layout from "./Layout"
import { Coordinates } from "./lib/types"
import ForecastWeatherQuery from "./components/forecastWeatherWidget"
import { useSelector } from "react-redux"
import { RootReducer } from "./lib/store"


const ForecastPage: React.FC = () => {

    const [searchParams,setSearchParams] = useSearchParams()
    const user = useSelector((state: RootReducer) => state.user)
    const navigate = useNavigate()

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

    if(!user.email || !user.username){
        navigate('/')
    }

    return <Layout>
        {!!coords ? 
            <ForecastWeatherQuery coordinates={coords} />
            : <></>
        }
    </Layout>
}

export default ForecastPage