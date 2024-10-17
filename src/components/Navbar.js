import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import logoImage from '../images/website_logo.jpeg'

const Navbar = () => {
    const {token, setToken} = useToken();
    const [loggedIn,setLoggedIn] = useState(false);
    const [loginButtonText, setLoginButtonText] = useState("Login");
    const navigate = useNavigate();


    useEffect(() => {

        console.log("Token: " + token?._id);

        if(token._id !== 'NOUSER'){
            setLoggedIn(true);
            console.log("Logged in")
            setLoginButtonText("Sign Out");
        }
        else{
            setLoggedIn(false);
            setLoginButtonText("Sign In");
            console.log("Logged Out");
        }

    },[token]);

    const printToken = () => {
        console.log(token?._id)
    }

    const setState = () => {
        if(token._id){

        }
    }

    const handleSignInOut = (e) => {
        if(loggedIn){
        navigate('/');
        sessionStorage.clear();
        window.location.reload();
        }
    }

    //<img className='logo' src={logoImage}></img>
    return (
        <header>

            <div className="navbar">

                <img className='logo' src={logoImage}></img>
                

                <Link className="nav-element" to="/">
                    <h1>Home</h1>

                </Link>

                <Link className="nav-element" to="/maplist">
                    <h1>Friends</h1>

                </Link>

                <Link className="nav-element" to="/map" onClick= {printToken} state={{userId: token._id}}>
                    <h1>My Map</h1>

                </Link>

                <Link className="nav-element" to="/edit">
                    <h1>My Points</h1>

                </Link>

                <Link className="nav-element" onClick={handleSignInOut} to="/signIn">
                    <h1>{loginButtonText}</h1>
                
                </Link>
            </div>
            

        </header>
    )
}

export default Navbar;