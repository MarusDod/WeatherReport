import { useQuery } from "@apollo/client"
import { Coordinates, Region } from "../lib/types"
import styles from "../styles/weatherWidget.module.scss"
import { currentWeatherByLocationQuery,  } from "../lib/queries"
import { CurrentWeatherByLocationQueryQuery } from "../gql/graphql"
import { RegionWeatherDto } from "../gql/graphql"
import moment from "moment"
import { kelvinToCelsius } from "../lib/helper"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootReducer } from "../lib/store"

const CurrentWeatherWidget: React.FC<{data: CurrentWeatherByLocationQueryQuery}> = ({data}) => {
    const navigate = useNavigate()


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
                    style={{width:"100%",height:"100%",objectFit:"contain"}}
                />
                <div style={{whiteSpace: 'nowrap'}}>
                    {kelvinToCelsius(data.currentWeather.temperature)} ºC
                </div>
            </div>
            <div className={styles.description}>
                {data.currentWeather.main}
            </div>
        </div>) : (<></>)
}

export default CurrentWeatherWidget