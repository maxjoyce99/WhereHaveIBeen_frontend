import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';
import useToken from '../hooks/useToken';
import PendingUser from '../components/PendingUser';
import { useFriendsContext } from '../hooks/useFriendsContext';
import AddFriendForm from '../components/AddFriendForm';

const MapList = (props) => {
    const {friends, pending, dispatchFriend} = useFriendsContext();
    const {token, setToken} = useToken();
    const [userName, setUserName] = useState();
    const [friendResponse, setFriendResponse] = useState();
    //console.log("Map List Page");

    useEffect(() => {
        
        const fetchFriends = async () => {
            const routePath = '/api/users/friendslist/' + token._id;

            const response = await fetch(routePath);
            
            const json = await response.json();
            
            if(response.ok) { 
                dispatchFriend({type: 'SET_FRIENDS', payload: json});
                console.log(friends);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        const fetchPending = async () => {
            const routePath = '/api/users/pendinglist/' + token._id;

            const response = await fetch(routePath);
            
            const json = await response.json();
            
            if(response.ok) {
                
                dispatchFriend({type: 'SET_PENDING', payload: json})
                console.log(pending);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        if(token._id !== 'NOUSER'){

        fetchFriends();
        fetchPending();
        console.log(friends);
        }

        

    },[]);

    if(token._id !== 'NOUSER'){

        return (
            <div className='friendsAndPendingPage'>

                <AddFriendForm></AddFriendForm>
                <h3 className="pendingTitle">Pending Requests</h3>
                <div className = "pendinglist">
                
            
                {pending && pending.map((user)=> (

                <PendingUser key={user.username} username={user.username} id={user.id}></PendingUser>

                ))}
                </div>
                <h3 className = "friendsTitle"> Friends List</h3>        
                <div className = "friendslist">
                

                {friends && friends.map((user)=> (

                <UserDetails key={user.username} username={user.username} id={user.id}></UserDetails>

                )) }
                </div>


            </div>


            
        )
    }
    else{
        return (
            <p>Make an account or log in to add friends!</p>
        )
    }


}

export default MapList;