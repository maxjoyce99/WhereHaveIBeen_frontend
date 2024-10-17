import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useFriendsContext } from "../hooks/useFriendsContext";

const UserDetails = (props) => {
    const {friends, pending, dispatchFriend} = useFriendsContext();
    const navigate = useNavigate();
    const {token, setToken } = useToken();


    const handleMapClick = () => {
        console.log("Going to Map:" + props.id);
        navigate("/map", {state: {userId: props.id}});
    }

    const handleUnfriend = async(e) => {
    
        const fetchUrl = '/api/users/unfriend/';
        console.log(fetchUrl);
                const response = await fetch(fetchUrl, {
                    method: 'PATCH',
                    body: JSON.stringify({'friendToDelete': props.username,
                                          'currentUserId': token._id  }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                

        });

        const json = await response.json();

            if(!response.ok){
                console.log(json.error);
                
            }

            if(response.ok){
                console.log(json)
                dispatchFriend({type: 'DELETE_FRIEND', payload: json})
                console.log("Deleted that friend");

            }

    }

    return (
    <div className="user-details">
        <p>{props.username}</p>
        <button  className ="formButtons" onClick={handleMapClick} >See their map!</button>
        <button className="formButtons" onClick={handleUnfriend} > Remove this friend</button>
    </div>
    
)

}

export default UserDetails;