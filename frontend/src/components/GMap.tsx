import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { Coordinates } from "../lib/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useCallback } from "react"
import Avatar from '../assets/avatar.png'
import styles from '../styles/gmap.module.scss'
import { toast } from "react-toastify"

const apiKey = "AIzaSyBXEGNNrSRQsXeNCPEinHyBwNiUDTPHbSs"

const GMap: React.FC<{coordinates: Coordinates,setCoordinates: React.Dispatch<React.SetStateAction<Coordinates | null>>,view?: string,loggedIn: boolean}> = ({coordinates,setCoordinates,view,loggedIn}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const onMoveMarker: (ev: google.maps.MapMouseEvent) => void = useCallback(ev => {
        setCoordinates({
            lat: ev.latLng!.lat(),
            long: ev.latLng!.lng(),
        })
    },[coordinates])

    const onMoveMap: () => void = useCallback(() => {
        if(!loggedIn){
            toast('Sign In to drag marker on the map',{
                type: 'warning'
            })
        }
    },[loggedIn])

    return isLoaded ? (
        <GoogleMap onDragEnd={onMoveMap} zoom={8} mapContainerClassName={styles.gmap}  center={{lat: coordinates.lat,lng: coordinates.long}} >
            <Marker 
                draggable={loggedIn}
                icon={{
                    url: view ?? "",
                    scaledSize: new google.maps.Size(80,80),
                }}
                position={{lat: coordinates.lat,lng: coordinates.long}} 
                onDragEnd={onMoveMarker} >
            </Marker>
        </GoogleMap>)
        : <div></div>
}

export default GMap