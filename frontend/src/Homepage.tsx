import React, { useEffect, useState } from 'react'
import { Coordinates } from './lib/types'
import CurrentWeatherWidget from './components/currentWeatherWidget'
import Layout from './Layout'

const Homepage: React.FC = ({}) => {

    const [coords,setCoords] = useState<Coordinates | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setCoords({
                lat: pos.coords.latitude,
                long: pos.coords.longitude,
            })
        })
    },[])

    return <Layout>
        {coords ?
            (<CurrentWeatherWidget location={coords} />)
            : (<div>oops</div>)}
    </Layout>
        
}

export default Homepage