import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";
import NewUser from '../components/NewUserForm';
import { useState } from 'react';

const SignIn = () => {
    const {token, setToken } = useToken();
    const [newUser, setNewUser] = useState(false);

    const handleNewUser = () => {
        setNewUser(!newUser);
    }

    if(token._id === 'NOUSER') {
        if(newUser) {
            return (
                <>
            <NewUser></NewUser>
            <button className="formButtons" onClick={handleNewUser}> Go Back to Login Page</button>
            </>
            )
        }
        else {
        return (
        <Login setToken={setToken} />
        )
        }
    }
    else{

        return (
            <div className="signIn">

                  <p> Successfully logged in as user {token.username}.</p>  
            </div>
        )
    }

}

export default SignIn;