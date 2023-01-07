import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { Coordinates } from "../lib/types"

const apiKey = "AIzaSyBXEGNNrSRQsXeNCPEinHyBwNiUDTPHbSs"

const GMap: React.FC<{coordinates: Coordinates}> = ({coordinates}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    return isLoaded ? (
        <GoogleMap zoom={14} mapContainerStyle={{width: "600px",height:"inherit"}} center={{lat: coordinates.lat,lng: coordinates.long}} >
            <Marker position={{lat: coordinates.lat,lng: coordinates.long}} />
        </GoogleMap>)
        : <div></div>
}

export default GMap