import PropTypes from 'prop-types';
import { useState } from 'react';
import { Popup } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import Login from './LoginForm';

const NewUser = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [error,setError] = useState(null);
    const [userCreated,setUserCreated] = useState();
    const [friends, setFriends] = useState([]);
    const [newUser, setNewUser] = useState(true);

    const handleNewUser = () => {
        setNewUser(!newUser);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const newUser = await registerUser({
          username,
          password,
          email,
        });
        
        if(newUser){
          setUserCreated(true);
        }
        
        console.log(newUser);
        
    }

    const registerUser = async(newUser) => {
        const response = await fetch('/api/users/new' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        const json = await response.json();

        if(!response.ok){
          setError(json.error);
      }
      if(response.ok){

        return json;
      }
    }

    const navigate = useNavigate();

    /*const handleRegisterClick = async () => {
      navigate("/");
    }*/


    if(newUser){
    return(
      <div className="registerForm">
        <h1>Please Create a New Account</h1>
        <form onSubmit={handleSubmit} >
          <label>
            <p>Username</p>
            <input 
            required="true" 
            type="text" 
            onChange={e => setUserName(e.target.value)} 
            pattern = "^.{1,30}$" 
            title="Please enter a username between 1 and 30 characters"
            placeholder='Username' />
          </label>

          
          
          <label>
            <p>Password</p>
            <input 
            required={true} 
            className="passInput" 
            type="password" 
            onChange={e => setPassword(e.target.value)} 
            pattern = "^.{6,100}$" 
            title="Please enter a password with more than 6 characters" 
            placeholder="Password"
            />
          </label>

          

          <label>
            <p>Email</p>
            <input 
            required={true} 
            type="text" 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email"
            />
          </label>

          {error && <span className="submitError">{error}</span>}
          {userCreated && <span className='userCreated'>User created successfully! Go back to the login page and login!</span>}
          
          <div>
            <button className='formButtons' type="submit"> Register </button>
            <button className="formButtons" onClick={handleNewUser}> Go Back to Login Page</button>
          </div>
        </form>
      </div>
    )
    }
    else{
      return(<Login></Login>)
    }
  }



  export default NewUser;