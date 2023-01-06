import styles from '../styles/forecast.module.scss'
import { useQuery } from "@apollo/client"
import { Coordinates } from "../lib/types"
import ReactLoading from 'react-loading';
import { ForecastByCoordinatesQueryQuery, Forecast } from "../gql/graphql"
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { forecastByCoordinatesQuery } from '../lib/queries';
import moment from 'moment';
import classNames from 'classnames';
import { groupBy, kelvinToCelsius } from '../lib/helper';


const ForecastWeatherWidget: React.FC<{forecast: Forecast}> = ({forecast}) => {
    

    return (<div className={styles.forecastcard}>
        <div className={styles.row}>
            {moment(forecast.date).format('LT')}
        </div>
        <div className={styles.row}>
            <img src={forecast.nightIcon} alt={forecast.description} style={{width:"100%"}} />
            <div className={styles.temp}>{kelvinToCelsius(forecast.temperature)}ºC</div>
        </div>
        <div className={styles.stat}>
            <span>Wind</span> <span>{forecast.windSpeed} km/h</span>
        </div>
        <div className={styles.stat}>
            Pressure {forecast.pressure}hPa
        </div>
        <div className={styles.stat}>
            Humidity {forecast.humidity}%
        </div>
        <div className={styles.stat}>
            Visibility {forecast.visibility}m
        </div>
        <div className={styles.stat}>
            Cloudiness {forecast.clouds}%
        </div>
        <div className={styles.stat}>
            Sea Level {forecast.seaLevel} hPa
        </div>

    </div>)
}

const ForecastEntry: React.FC<{day: string | number, forecasts: Forecast[]}> = ({day,forecasts}) => {
    const [show,setShow] = useState(false)

    return (
        <React.Fragment key={day}>
                <div className={styles.pagination} onClick={() => setShow(!show)}>
                    {moment(forecasts[0]!.date).format('dddd, MMMM Do')}
                    <div>{show ? <>&#8963;</> : <>&#8964;</>}</div>

                </div>
                {show && forecasts.map(f => 
                    <ForecastWeatherWidget forecast={f!!} />
                )}
        </React.Fragment>
    )
}

const ForecastWeatherQuery: React.FC<{coordinates: Coordinates}> = ({coordinates}) => {
    const {error,data,loading} = useQuery<ForecastByCoordinatesQueryQuery>(forecastByCoordinatesQuery,{
        variables: {
            lat: coordinates.lat,
            long: coordinates.long,
        }
    })

    const dataByDay = useMemo(() => {
        if(!data)
            return []

        return groupBy(data.forecastWeather.results,f => new Date(f!.date).getDate().toString())
    },
    [data])

    useEffect(() => {
        if(!error)
            return

        toast(error.networkError?.message,{
            position: 'top-center',
        })
    },[error])

    if(loading){
        return (<ReactLoading 
                type="spin" 
                color="red" 
                height={"10%"} 
                width={"10%"} 
                />)
    }

    if(error || !data){
        return <></>
    }

    return (<>
        {Object.entries(dataByDay).map(([day,fs]) => (
            <ForecastEntry day={day} forecasts={fs as Forecast[]} />
        ))}
    </>)
}

export default ForecastWeatherQuery