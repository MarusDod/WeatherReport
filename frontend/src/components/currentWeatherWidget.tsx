import { useQuery } from "@apollo/client"
import { Coordinates, Region } from "../lib/types"
import styles from "../styles/weatherWidget.module.scss"
import { currentWeatherByLocationQuery,  } from "../lib/queries"
import { CurrentWeatherByLocationQueryQuery } from "../gql/graphql"
import Popup from "./popup"
import ReactLoading from 'react-loading';
import { RegionWeatherDto } from "../gql/graphql"
import moment from "moment"
import { kelvinToCelsius } from "../lib/helper"

const CurrentWeatherWidget: React.FC<{location: Region}> = ({location}) => {
    const {loading,error,data} = useQuery<CurrentWeatherByLocationQueryQuery>(currentWeatherByLocationQuery,{variables: {
        lat: location.lat,
        long: location.long,
    }})

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

    return (
        error !== undefined || !data ?
        <Popup message={error!!.message} color={"red"} enabled={!!error} />
        : 
        <div className={styles.weathercard}>
            <div className={styles.area}>
                {data.currentWeather.city}
            </div>
            <div className={styles.time}>
                {moment(new Date(data.currentWeather.date)).format('LT')}
            </div>
            <div className={styles.icon}>
                <img 
                    src={"https://openweathermap.org/img/wn/10d@2x.png"}
                    alt={"weather icon"}
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
                <button>
                    See details &rarr;
                </button>
            </div>
        </div>)
}

export default CurrentWeatherWidget