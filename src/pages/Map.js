
import { useLocationsContext } from '../hooks/useLocationsContext';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-leaflet';
import {useLocation} from 'react-router-dom';
import { useMap } from 'react-leaflet/hooks';
import { useMapEvents } from 'react-leaflet/hooks';
import { useMapEvent } from 'react-leaflet/hooks';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

//components
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import LocationMarker from  '../components/LocationMarker';
import useToken from '../hooks/useToken';

 
const Map = () => {
  const {locations, dispatch} = useLocationsContext();
  const [ loading, setLoading ] = useState(true);
  var startingCenterPosition = [ 0, 0];
  var bounds = [[-90,-180], [90,180]]

  const {token, setToken} = useToken();
  const [newLocation, setNewLocation] = useState();
  const [ownership, setOwnership] = useState(false); 
  const markerRef = useRef(null);
  const mapRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();


    useEffect(() => {

        console.log(token?._id)
        console.log(location.state?.userId);

        if(token?._id === location.state?.userId){
            setOwnership(true);
        }
        else {
            setOwnership(false);
        }

        const fetchLocations = async () => {
            var mapId = '';
            if(location.state?.userId === 'NOUSER'){
                mapId = token._id;
            }
            else{
                mapId = location.state.userId
            }
            const response = await fetch('/api/locations/getall/' + mapId);
            const json = await response.json();


            if(response.ok) {
                dispatch({type: 'SET_LOCATIONS', payload: json})
                setLoading(false);
                
            }
            else{
                console.log("Locations could not be found.");
            }


           
        }

        
        

        fetchLocations();
        
        

    },[]);

    function AddLocationComponent() {
        
        
        

          const mapEvent = useMapEvent('click', (e) => {
            console.log(ownership);
            if(ownership){
                console.log( e.latlng.lat + ", " + e.latlng.lng);
                const newLatLong = [e.latlng.lat, e.latlng.lng]
                setNewLocation(newLatLong);
                console.log(newLocation);
                const marker = markerRef.current;
                if (marker) {
                    console.log("opening popup");
                    marker.openPopup()
                    //marker.popup.popupclose(console.log("popup closed"))
                }
            }
                
      })

    }
    

    function GetCurrentLocation() {
    
    //get current location // CONSOLE SHOULD READ SAME POINT
                const map = useMapEvent('mouseup', function(e) {
                    var centerPos = map.getCenter();
                    sessionStorage.setItem('centerPosition', JSON.stringify(centerPos));
                })

                const map2 = useMapEvent('zoom' , function(e) {
                    var currentZoom = map2.getZoom();
                    console.log(currentZoom);
                    sessionStorage.setItem('currentZoom', JSON.stringify(currentZoom));
                })      
    }

    //console.log(locations);

    const newLocationClicked = (props) => {
        console.log("New Location Clicked : " + newLocation);
        
        navigate("/edit", {state: {newLocation: newLocation}});
    }

    const backToMap = (props) => {
        console.log("Back To Map");
        setNewLocation();
    }


    function ChangeView() {
        const map = useMap();

        var oldCenterTokenString = sessionStorage.getItem('centerPosition');
        //console.log( "Changing view to " + oldCenterTokenString);
        var oldZoomTokenString = sessionStorage.getItem('currentZoom');

        if(oldCenterTokenString !== "undefined" && oldCenterTokenString !== null){
            var oldCenter = JSON.parse(oldCenterTokenString);
            var oldZoom = JSON.parse(oldZoomTokenString);
            //console.log(oldZoom);
            map.setView(oldCenter,oldZoom);
        }
    }
    
    return (
        <div key ="wholeMapDiv" className="map">

            <MapContainer ref={mapRef} key="mapContainer" className="map" center={startingCenterPosition} zoom={3.5} scrollWheelZoom={true} minZoom={2} maxBounds={bounds} >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    key="openMapsLayer"
                />
                
                {locations && locations.map((location) => (
                    <LocationMarker key={"marker" + location._id} id={location._id} coord={location.place} name={location.name} userId={location.user}/>))
                }
                
                {
                    
                    newLocation && newLocation.map((location, idx) => (
                        <Marker ref={markerRef} id="newLocationMarker" key={`marker-${idx}`} coord={newLocation} position={newLocation} >
                            <Popup width= "100%" openOn="map"id="newLocationPopup" visible='true'>
                            <div class="popup-btn-group">
                                <button className="formButtons"onClick={newLocationClicked}>Add New Place Here</button>
                                <button margin="0 auto" top="50%" left="50%"position="absolute" className="formButtons" onClick={backToMap}>Cancel</button>
                            </div>
                            </Popup>
                        </Marker>))
                    

                }

                <AddLocationComponent />
                <GetCurrentLocation />
                <ChangeView />
                
                
            </MapContainer>

        </div>
    )

}

export default Map;
