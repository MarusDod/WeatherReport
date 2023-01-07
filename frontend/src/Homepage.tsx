import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles/weatherWidget.module.scss'
import { Coordinates } from './lib/types'
import CloudImage from './assets/backgroundClouds.webp'
import CurrentWeatherWidget from './components/currentWeatherWidget'
import Layout from './Layout'
import { useSearchParams } from 'react-router-dom'
import ForecastWeatherQuery from './components/forecastWeatherWidget'
import GMap from './components/GMap'
import { useSelector } from 'react-redux'
import { ReduxUser, RootReducer } from './lib/store'
import { useQuery } from '@apollo/client'
import { CurrentWeatherByLocationQueryQuery } from './gql/graphql'
import { currentWeatherByLocationQuery } from './lib/queries'
import { toast } from 'react-toastify'
import ReactLoading from 'react-loading';

const Homepage: React.FC = ({}) => {

    const [coords,setCoords] = useState<Coordinates | null>(null)
    const [searchParams,setSearchParams] = useSearchParams()

    const loggedInUser = useSelector<RootReducer,ReduxUser>(state => state.user)
    const isLoggedIn = useMemo(() => !!loggedInUser.email && !!loggedInUser.username, [loggedInUser])

    const {loading,error,data} = useQuery<CurrentWeatherByLocationQueryQuery>(currentWeatherByLocationQuery,{
        variables: {
            lat: coords?.lat,
            long: coords?.long,
        },
        skip: !coords
    })

    useEffect(() => {
        if(!error)
            return

        toast(error.networkError?.message,{
            position: 'top-center',
        })
    },[error])


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

    if(loading){
            <ReactLoading
                type="spin" 
                color="red" 
                height={"10%"} 
                width={"10%"} 
                />
    }


    return <Layout> {!coords ? (<div></div>) : 
        (<>
            <div className={styles.weathercontainer} >
                {loading || 
                    (<>
                        {data && <CurrentWeatherWidget data={data} />}
                        <GMap coordinates={coords} setCoordinates={setCoords} view={data?.currentWeather.dayIcon} loggedIn={isLoggedIn} />
                    </>)}
            </div>
            {isLoggedIn ? 
            <ForecastWeatherQuery location={coords} />
            : <div className={styles.disclaimer}>Sign in to see 4 day forecast</div>}
        </>)}
    </Layout>
        
}

export default Homepage