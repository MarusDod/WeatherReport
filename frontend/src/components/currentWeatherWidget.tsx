import { useQuery } from "@apollo/client"
import { Coordinates, Region } from "../lib/types"
import styles from "../styles/weatherWidget.module.scss"
import { currentWeatherByLocationQuery,  } from "../lib/queries"
import { CurrentWeatherByLocationQueryQuery } from "../gql/graphql"
import ReactLoading from 'react-loading';
import { RegionWeatherDto } from "../gql/graphql"
import moment from "moment"
import { kelvinToCelsius } from "../lib/helper"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootReducer } from "../lib/store"

const CurrentWeatherWidget: React.FC<{location: Region}> = ({location}) => {
    const navigate = useNavigate()

    const user = useSelector((state: RootReducer) => state.user)

    const {loading,error,data} = useQuery<CurrentWeatherByLocationQueryQuery>(currentWeatherByLocationQuery,{variables: {
        lat: location.lat,
        long: location.long,
    }})

    const navigateToForecast = () => {
        if(!(user.email && user.username)){
            toast("Sign Up first",{
                type: 'warning'
            })

            return 
        }

        navigate({
            pathname: "/forecast",
            search: `${createSearchParams({
                latitude: location.lat!.toString(),
                longitude: location.long!.toString(),
            })}`,
        })
    }


    useEffect(() => {
        if(!error)
            return

        toast(error.networkError?.message,{
            position: 'top-center',
        })
    },[error])

    if(loading){
        return (
            <ReactLoading 
                type="spin" 
                color="red" 
                height={"10%"} 
                width={"10%"} 
                />
        )
    }

    return data ?
        (<div className={styles.weathercard}>
            <div className={styles.area}>
                {data.currentWeather.city}
            </div>
            <div className={styles.time}>
                {moment(new Date(data.currentWeather.date)).format('LT')}
            </div>
            <div className={styles.icon}>
                <img 
                    src={data.currentWeather.nightIcon}
                    alt={data.currentWeather.description}
                    style={{objectFit: "cover"}}
                />
                <div>
                    {kelvinToCelsius(data.currentWeather.temperature)} ºC
                </div>
            </div>
            <div className={styles.description}>
                {data.currentWeather.main}
            </div>
            <div  className={styles.details}>
                <button onClick={navigateToForecast}>
                    See forecast &rarr;
                </button>
            </div>
        </div>) : (<></>)
}

export default CurrentWeatherWidget