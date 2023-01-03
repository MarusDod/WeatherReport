import React, { useEffect, useState } from 'react'
import { Coordinates } from './lib/types'
import CurrentWeatherWidget from './components/currentWeatherWidget'

const Homepage: React.FC = ({}) => {

    const [coords,setCoords] = useState<Coordinates | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
        })
    },[])

    return coords ?
        (<CurrentWeatherWidget location={coords} />)
        : (<div>oops</div>)
        
}

export default Homepage