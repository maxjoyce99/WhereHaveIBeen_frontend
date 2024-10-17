import { useEffect, useState } from 'react';
import  EXIF  from 'exif-js';
import useToken from "../hooks/useToken";
import { useLocationsContext } from '../hooks/useLocationsContext';
import { Tooltip } from 'react-tooltip'





const ImageUpload = () => {
    const {token, setToken } = useToken();
    const [files, setFiles] = useState();
    const [error,setError] = useState(null);
    const [fileError, setFileError] = useState(null);
    const { dispatch } = useLocationsContext();

    function degToDec(degrees, minutes, seconds, direction) {
    
        var dd = degrees + (minutes/60) + (seconds/3600);
        
        if (direction == "S" || direction == "W") {
            dd = dd * -1; 
        }
        
        return dd;
    }

    const createLocation = async (newLat,newLong,i) => {
        console.log("Create new location");
        const user = token._id;
        const tempName = files[i].name;
        var place = [newLat,newLong];

        const name = tempName.split('.').slice(0, -1).join('.'); //removes after first '.'

        const location = { name, place, user};

        console.log(location);

        const response = await fetch('/api/locations', {
            method: 'POST',
            body: JSON.stringify(location),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            place =[];
            console.log("New Location Added", json);
            //makes it appear right away
            dispatch({type: 'CREATE_LOCATION', payload: json});
            fileSubmittedHandler(json._id,i);
            //dispatch({type: 'CREATE_LOCATION', payload: json});
        }
    }

    const fileSubmittedHandler = async (id,i) => {
        console.log(files);
        console.log(token._id);
        const formData = new FormData();
        if(files){
            formData.append("images", files[i]);
            console.log(formData);
        }

        const routePath = '/api/pictures/' + token._id + "/" + id; //adds id to the route path
        const response = await fetch(routePath, {
            method: 'POST',
            body: formData,
        })

        const json = await response.json();

        if(!response.ok){
            setFileError(json.err);
            setFiles(null);
            console.log(json.err);
        }
        if(response.ok){
            setFileError(null);
            console.log("New Picture(s) Added", json);
            
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files) {
            for (let i = 0; i < files.length; i++) {
                EXIF.getData(files[i], function() {
                var exifData = EXIF.pretty(this);
                    
                    if (exifData) {
                    console.log(exifData);
                    var GPSLatitude = EXIF.getTag(this, "GPSLatitude");
                    var GPSLongitude = EXIF.getTag(this, "GPSLongitude");

                    var latRef = EXIF.getTag(this, "GPSLatitudeRef");
                    var longRef = EXIF.getTag(this, "GPSLongitudeRef");
                    var latDeg = GPSLatitude[0].numerator;
                    var latMin = GPSLatitude[1].numerator;
                    var latSec = GPSLatitude[2].numerator/ GPSLatitude[2].denominator;

                    var longDeg = GPSLongitude[0].numerator;
                    var longMin = GPSLongitude[1].numerator;
                    var longSec = GPSLongitude[2].numerator/ GPSLongitude[2].denominator;
                    
                    var newLatDec = degToDec(latDeg, latMin, latSec, latRef);
                    var newLongDec = degToDec(longDeg, longMin, longSec, longRef);
                    
                    
                    console.log(GPSLongitude);
                    console.log(GPSLatitude);
                    
                    
                    //only create location if there is valid GPS data
                    if(GPSLongitude && GPSLatitude){createLocation(newLatDec,newLongDec,i); }
                    
                    } else {
                    console.log("No EXIF data found in image '" + files.name + "'.");
                    }
                    
                });
            }
        }

    }


    return (
        <div className='imageUpload'> 

        <Tooltip place='bottom' className='location_tooltip' id="my-tooltip-multiline" />

            
        <a className='tooltip_button' data-tooltip-id="my-tooltip-multiline" data-tooltip-html="This section will add all of your pictures if they have location data attached to them, with the name of the location being the file name. Unfortunately for many pictures this is not the case. Accepted file extensions include png, jpg, jpeg, and gif.">?</a>
        
        <h3>Add Picture Batch</h3>
        <form className='imageUploadForm' onSubmit={handleSubmit}>
        <input
                type="file"
                onChange={((e) => setFiles(e.target.files))}
                name="images"
                multiple="yes"
                className="formButtons"
                accept=".png, .jpg, .jpeg, .gif"
                />
                
        <button className="formButtons batchUpload">Add Pictures</button>
        </form>
        </div>
    )



}

export default ImageUpload;