import { useState } from "react";
import useToken from '../hooks/useToken';
import { useFriendsContext } from '../hooks/useFriendsContext';
import PendingUser from '../components/PendingUser';


const AddFriendForm = () => {
    const {token, setToken} = useToken();
    const [userName, setUserName] = useState();
    const [friendResponse, setFriendResponse] = useState();

    const nameSubmitted = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/users/requestuser', {
        method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username": userName,
        "userId": token._id})
        });

        const json = await response.json();

        if(response.ok){
            console.log("Found the user");
            setFriendResponse("Requesting " + json.username + " to add you as a friend!");
        }
        else{
            console.log("No user found");
            setFriendResponse("The user " + userName + " was not found.");
        }
    }



    return (
        <div className="newFriendForm">
        <form  onSubmit={nameSubmitted}>
        <h3> Add a friend</h3>
        <label>Username</label>
        <input placeholder='Username' onChange={e => setUserName(e.target.value)}/>
        <button className = "formButtons">Add a Friend </button>
        </form>
        {friendResponse && <span className="userfoundSpan">{friendResponse}</span>}
        </div>
    )
}

export default AddFriendForm;