import { PassThrough, prototype } from 'form-data';
import { useEffect, useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';
import useToken from "../hooks/useToken";

const ModifyLocation = (props) => {
    const { dispatch } = useLocationsContext();
    const [name,setName] = useState('');
    const [error,setError] = useState(null);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [files, setFiles] = useState();
    const [fileError, setFileError] = useState(null);
    const [submitted,setSubmitted] = useState(false);
    const[lastFocused,setLastFocused] = useState(null);
    const [newName,setNewName] = useState('');
    const [newLat, setNewLat] = useState('');
    const [newLong, setNewLong] = useState('');
    const {token, setToken } = useToken();

    const fileSubmittedHandler = async (e) => {
        e.preventDefault();
        
        console.log(files);
        console.log(token._id);
        const formData = new FormData();
        if(files){
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }
            console.log(formData);
        }

        const routePath = '/api/pictures/' + token._id + "/" + props.id; //adds id to the route path
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
            props.updateImage();
            setFileError(null);
            console.log("New Picture(s) Added", json);
        }
        
    }

    useEffect(() => {
        setName(props.name);
        setLat(props.place[0]);
        setLong(props.place[1]);
    },[]);
    

    const handleFocus = (e) => {
        setLastFocused(e.target.className);
    }

    const changeLocation = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        console.log(newName);
        console.log(newLat);
        console.log(newLong);

        if(newName.length > 0){
            console.log("Changing Location Name to: " + newName);
            
            const newLocation = {
                "name": newName,
            }

            const fetchUrl = '/api/locations/' + props.id;
            const response = await fetch(fetchUrl, {
                method: 'PATCH',
                body: JSON.stringify(newLocation),
                headers: {
                    'Content-Type': 'application/json'
                }
                

            });

            const json = await response.json();

            if(!response.ok){
                setError(json.error);
            }

            if(response.ok){
                setName(newName);
                props.updateName(newName);
                console.log("Changed Location Name to: " + newName);
            }
        }

        if(newLat.length > 0){
            console.log("Changing Location Lat to: " + newLat);
            var newLocation = {};
            if(newLong.length > 0){
                //setLong(newLong);
                console.log(long);
                newLocation = {
                    "place" : [newLat,newLong]
                }
            }
            else {
                newLocation = {
                    "place" : [newLat,long]
                }
            }
    
            const fetchUrl = '/api/locations/' + props.id;
            const response = await fetch(fetchUrl, {
                method: 'PATCH',
                body: JSON.stringify(newLocation),
                headers: {
                    'Content-Type': 'application/json'
                }
                
    
            });

            const json = await response.json();

            if(!response.ok){
                setError(json.error);
            }

            if(response.ok){
                setLat(newLat);
                console.log("Changed Location Latitude to: " + newLat);
            }
        }

        

        if(newLong.length > 0){
            //console.log("Changed Location Longitude to: " + newLong);
            var newLocation = {};
            if(newLat.length > 0){
                //setLat(newLat);
                console.log(lat);
                newLocation = {
                    "place" : [newLat,newLong]
                }
            }
            else {
                newLocation = {
                    "place" : [lat,newLong]
                }
            }

            console.log("New Location: [" + lat + "," + newLong + "]");

            
    
            const fetchUrl = '/api/locations/' + props.id;
            const response = await fetch(fetchUrl, {
                method: 'PATCH',
                body: JSON.stringify(newLocation),
                headers: {
                    'Content-Type': 'application/json'
                }
                
    
            });

            const json = await response.json();

            if(!response.ok){
                setError(json.error);
            }

            if(response.ok){
                setLong(newLong);
                console.log("Changed Location Longitude to: " + newLong);
            }
        }

        

        
    }

    return(
        <>
        <div className="create">
        <h3 className='new_location_title'>Modify this location: </h3>
        <div className="old_location_name">
            <p>Current Name: {name} </p>
            <p>Current Coordinates: [{Number(lat).toFixed(2)},{Number(long)}] </p>
        </div>
        
        <form className="createForm" onSubmit={changeLocation}>
            
        
       
            <label>New Location Name:</label>
            <input
                className="nameInput"
                type="text"
                onChange={((e) => setNewName(e.target.value))}
                value={newName || ''}
                placeholder="Name"
                pattern = "^[A-Za-z0-9]{1,30}$"
                onBlur = {handleFocus}
                lastfocused={lastFocused}
            />

            <span className="nameErrorSpan">Name should be 1-30 characters with no special characters.</span>
            {error && <span className="submitError">{error}</span>}
        
            <label>New Location Latitude: </label>
            <input
                className="latInput"
                type="number"
                onChange={((e) => setNewLat(e.target.value))}
                value={newLat|| ''}
                placeholder="Latitude"
                onBlur = {handleFocus}
                lastfocused={lastFocused}
                min = "-90"
                max = "90"
            />

            <span className="latErrorSpan">Latitude must be a number between -90 and 90. Do not use N or S designation.</span>
        
            <label>New Location Longitude: </label>
            <input
                className="longInput"
                type="number"
                onChange={((e) => setNewLong(e.target.value))}
                value={newLong|| ''}
                placeholder="Longitude"
                onBlur = {handleFocus}
                lastfocused={lastFocused}
                min = "-180"
                max = "180"
            />
            
            <span className="longErrorSpan">Longitude must be a number between -180 and 180. Do not use E or W designation.</span>

            <button className="formButtons">Change Location</button>
        </form>

        </div>

            <div className="imageUpload">
                <h3>Add more pictures </h3>
                <form className='imageUploadForm' onSubmit={fileSubmittedHandler}>        
                
                
                    <input
                    type="file"
                    onChange={((e) => setFiles(e.target.files))}
                    name="images"
                    multiple="yes"
                    className="formButtons"
                    accept=".png, .jpg, .jpeg, .gif"
                    />
                <button className="formButtons">Add Pictures</button>

                
                </form>
            </div>
        
        

        
        </>
    )
}

export default ModifyLocation;