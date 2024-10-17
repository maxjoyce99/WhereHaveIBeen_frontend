import { useLocationsContext } from "../hooks/useLocationsContext";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; //alert css. can make custom one eventually
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const LocationDetails = ({location}) => {
    const { dispatch } = useLocationsContext();
    const {token, setToken} = useToken();

    const handleDeleteClick = async () => {
        confirmAlert({
        title: 'Confirm Location Deletion',
        message: 'Are you sure you want to delete this location? It will also delete all the pictures along with it.',
        buttons: [
          {
            label: 'Delete Location',
            onClick: handleDelete,
          },
          {
            label: 'Cancel',
            onClick: () => console.log("Clicked No")
          }
        ]
      });
    }

    const handleDelete = async () => {
            const response = await fetch('/api/locations/' + location._id, {
                method: 'DELETE'
            });

            const json = await response.json();

            if(response.ok){
                dispatch({type: 'DELETE_LOCATION', payload: json});
            }

            const picResponse = await fetch('/api/pictures/' + token._id + "/" + location._id, {
                method: 'DELETE'
            });

            const picJson = await response;

            if(picResponse.ok){
                console.log("Deleting Folder");
            }

            if(!picResponse.ok){
                console.log(picJson.err);
            }
    }

    const navigate = useNavigate();

    const handleModifyClick = async () => {
        console.log("Modify button clicked");
        
        navigate("/modify", {state: {id: location._id, name: location.name, place: location.place}});

    }

    const formatTime = () => {
        const created_date = new Date(location.createdAt);
        var year = created_date.getFullYear();
        var month = created_date.getMonth();
        var date = created_date.getDate();
        var hour = created_date.getHours();

        if(hour>12){
            hour = hour-12
        }

        var min = created_date.getMinutes();

        if(min<10) {
            min = '0' + min;
        }
        var sec = created_date.getSeconds();
        var formattedTime = month + '/'  + date + '/' + year + ' ' + hour + ':' + min ;

        return formattedTime;

    }

    const formattedTime = formatTime(location.createdAt);

    return(
        <div className="location-details">
            <p key="name"><strong> Name : </strong>{location.name}</p>
            <p key="place"><strong> Coordinates : </strong>[{Number(location.place[0]).toFixed(2)}, {Number(location.place[1]).toFixed(2)}]</p>
            <p key="timeCreated"><strong> Created On: </strong>{formattedTime}</p>
            
            <div className="buttonClass">
            <button className="deletelocation" onClick={handleDeleteClick}>Delete</button>
            <button className="modifylocation" onClick={handleModifyClick}>Modify</button>
            </div>
        </div>
             
    )
}

export default LocationDetails;