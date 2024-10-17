import { useNavigate } from "react-router-dom";
import { Marker, Popup } from 'react-leaflet';
import { Tooltip } from "react-leaflet";
import { useMap } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//gets proper icons and shadows (from stackoverflow)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});




const LocationMarker = (props) => {
    const navigate = useNavigate();

    function markerClicked(marker,id){
      
      console.log("Marker was clicked at: [" + marker + "] with ID: " + id);
    }

    return(
    <Marker position={props.coord} eventHandlers={{
        click: (e) => {
          markerClicked(props.coord, props.id);
          navigate("/pictures", {state: {id: props.id, name:props.name, place: props.coord, userId: props.userId}});
        },
    }}
    >
      <Tooltip direction="top">
        {props.name}
      </Tooltip>
        
    </Marker>
    )
}

export default LocationMarker;