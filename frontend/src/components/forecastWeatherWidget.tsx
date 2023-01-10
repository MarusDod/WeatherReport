import styles from '../styles/forecast.module.scss'
import { useQuery } from "@apollo/client"
import { Coordinates } from "../lib/types"
import ReactLoading from 'react-loading';
import { ForecastByCoordinatesQueryQuery, Forecast } from "../gql/graphql"
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { forecastByCoordinatesQuery } from '../lib/queries';
import moment from 'moment';
import { groupBy, kelvinToCelsius } from '../lib/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimePicker, {TimePickerValue} from 'react-time-picker';
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';
import classNames from 'classnames';


const ForecastWeatherWidget: React.FC<{forecast: Forecast}> = ({forecast}) => {
    
    const [fade,setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    },[])

    return (
        <div className={styles.forecastcard} style={{opacity: fade ? 1 : 0}}>
            <div className={styles.row}>
                {moment(forecast.date).format('LT')}
            </div>
            <div className={styles.row}>
                <img src={forecast.nightIcon} alt={forecast.description} style={{width:"100%"}} />
                <div className={styles.temp}>{kelvinToCelsius(forecast.temperature)}ºC</div>
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"wind"} />
                Wind {forecast.windSpeed}km/h
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"wind"} />
                Pressure {forecast.pressure}hPa
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"droplet"} />
                Humidity {forecast.humidity}%
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"eye"} />
                Visibility {forecast.visibility}m
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"cloud"} />
                Cloudiness {forecast.clouds}%
            </div>
            <div className={styles.stat}>
                <FontAwesomeIcon icon={"water"} />
                Sea Level {forecast.seaLevel}hPa
            </div>
        </div>)
}

const ForecastEntry: React.FC<{day: string | number, forecasts: Forecast[]}> = ({day,forecasts}) => {
    const [show,setShow] = useState(false)

    const [pickerHour,setPickerHour] = useState<number>(new Date(forecasts[0].date).getHours())

    const pickedForecast = useMemo<Forecast | undefined>(() => 
        forecasts.find((f,index,arr) => {
            const fhour = new Date(f.date).getHours()

            return fhour <= pickerHour && pickerHour - fhour < 3
        })
        ,[day,pickerHour])
    
    return (
        <React.Fragment>
                <div className={styles.pagination} onClick={() => setShow(!show)}>
                    {moment(forecasts[0]!.date).format('dddd, MMMM Do')}
                    <div>{show ? <>&#8963;</> : <>&#8964;</>}</div>
                </div>
                
                {show && (<>
                    <TimePicker 
                        maxDetail={'hour'} 
                        disableClock={true}
                        className={styles.clockpicker}
                        onChange={val => setPickerHour(parseInt(val.toString().split(':')[0]))} 
                        value={`${pickerHour}:00`} />
                    <Clock value={`${pickerHour}:00`} />
                    {pickedForecast && <ForecastWeatherWidget key={pickedForecast.date} forecast={pickedForecast} />}
                    </>)}
        </React.Fragment>
    )
}

const ForecastWeatherQuery: React.FC<{location: Coordinates}> = ({location}) => {
    const {error,data,loading} = useQuery<ForecastByCoordinatesQueryQuery>(forecastByCoordinatesQuery,{
        variables: {
            lat: location.lat,
            long: location.long,
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

        toast(error.networkError?.message)
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
            <ForecastEntry key={day} day={day} forecasts={fs as Forecast[]} />
        ))}
    </>)
}

export default ForecastWeatherQuery