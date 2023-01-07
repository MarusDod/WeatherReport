import React, { useEffect, useState } from 'react'
import styles from './styles/weatherWidget.module.scss'
import { Coordinates } from './lib/types'
import CloudImage from './assets/backgroundClouds.webp'
import CurrentWeatherWidget from './components/currentWeatherWidget'
import Layout from './Layout'
import { useSearchParams } from 'react-router-dom'
import ForecastWeatherQuery from './components/forecastWeatherWidget'
import GMap from './components/GMap'

const Homepage: React.FC = ({}) => {

    const [coords,setCoords] = useState<Coordinates | null>(null)
    const [searchParams,setSearchParams] = useSearchParams()

    useEffect(() => {
        if(searchParams.get('latitude') && searchParams.get('longitude')){
            setCoords({
                lat: parseFloat(searchParams.get('latitude')!),
                long: parseFloat(searchParams.get('longitude')!),
            })
        }
        else {
            navigator.geolocation.getCurrentPosition(pos => {
                setCoords({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                })
            })
        }
    },[searchParams])

    return <Layout> {!coords ? (<div></div>) : 
        (<>
            <div className={styles.weathercontainer} >
                <CurrentWeatherWidget location={coords} />
                <GMap coordinates={coords} />
            </div>
            <ForecastWeatherQuery location={coords} />
        </>)}
    </Layout>
        
}

export default Homepage