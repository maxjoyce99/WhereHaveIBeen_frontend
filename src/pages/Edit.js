import { useEffect} from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';
import useToken from "../hooks/useToken";
import { useState } from 'react';

//components
import LocationDetails from '../components/LocationDetails';
import LocationForm from '../components/LocationForm';
import ImageUpload from '../components/ImageUpload';


const Edit = () => {
    const {token, setToken } = useToken();
    const {locations, dispatch} = useLocationsContext();
    const [batchUpload,setBatchUpload] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/locations/getall/' + token._id );
            const json = await response.json();


            if(response.ok) {
                dispatch({type: 'SET_LOCATIONS', payload: json})
            }
            else{
                console.log("Locations could not be found.");
            }
        }

        if(token){
        fetchLocations();
        }


    },[]);

    const batchUploadClicked = () => {
        console.log("Batch Upload")
        setBatchUpload(!batchUpload);
    }

    //console.log(locations);
    if(token){
    return (
            <div className="edit">
                <div className="locations">
                    {locations && locations.map((location) => (
                        <LocationDetails key={"details" + location._id} location={location} />))
                    }
                </div>
            
                <LocationForm />
                { batchUpload && <ImageUpload display="false"></ImageUpload>}
                <button className='formButtons batchUploadToggle' onClick={batchUploadClicked}>Batch Upload</button>
            </div>
        )
    }
    else {
        return(
            <p> You must be logged in to edit a Map.</p>
        )
    }

}

export default Edit;