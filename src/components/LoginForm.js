import PropTypes from 'prop-types';
import { useState } from 'react';
import NewUser from '../components/NewUserForm';

const Login = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error,setError] = useState(null);
    const [newUser, setNewUser] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        console.log(token);
        setToken(token);
        window.location.reload();
    }

    const loginUser = async(credentials) => {
        const response = await fetch('/api/users/existing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        const json = await response.json();

        if(!response.ok){
          setError(json.error);
          setPassword('');
      }
      if(response.ok){

        return json;
      }
    }

    const handleNewUser = () => {
      setNewUser(!newUser);
    }
    if(newUser) {
      return (
      <NewUser></NewUser>
      )
    }
  else {

    return(
      
      <div className="login-wrapper">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input required = {true} type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input required = {true} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value = {password || ""} />
          </label>

          {error && <span className="submitError">{error}</span>}

          <div>
            <button className="formButtons" type="submit"> Login </button>
            
          </div>
          <button className="formButtons" onClick={handleNewUser}> Create an Account</button>
        </form>
      </div>
    )

    }

  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  export default Login;