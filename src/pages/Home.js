import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";
import NewUser from '../components/NewUserForm';
import  example_image1 from '../images/example_image1.jpg';
import  example_image2 from '../images/example_image2.jpg';
import  example_image3 from '../images/example_image3.jpg';
import  example_image4 from '../images/example_image4.jpg';
import  example_image5 from '../images/example_image5.jpg';
import  example_image6 from '../images/example_image6.jpg';
import  example_image7 from '../images/example_image7.jpg';
import  example_image8 from '../images/example_image8.jpg';
import  example_map from '../images/example_map.png';
import { useNavigate } from 'react-router';
import Map from './Map';
import { useLocationsContext } from '../hooks/useLocationsContext';


const Home = () => {

    const navigate = useNavigate();
    const {locations, dispatch} = useLocationsContext();
    const {token, setToken} = useToken();

    const myMapClicked = () => {
      console.log("MyMapClicked");
      navigate("/map", {state: {userId: "64e653532e7d4c3970cb3dd1"}});
    }

    const fetchLocations = async () => {
      const response = await fetch('/api/locations/getall/' + "64e653532e7d4c3970cb3dd1");
      const json = await response.json();


      if(response.ok) {
          console.log("Locations Found.");
          dispatch({type: 'SET_LOCATIONS', payload: json})  
      }
      else{
          console.log("Locations could not be found.");
      }
    }

    const makeOwnClicked = () => {
      console.log("MakeOwnClicked");
      if(token._id =="NOUSER"){
        navigate("/signin");
      }
      else{
        navigate("/edit")
      }
      
    }

    useEffect(() => {
      fetchLocations();
    },[]);

    return (
      <div className="home">
        <div className="home_map">
        <Map></Map>
        </div>

        <div className='home_buttons'>
          <button onClick={makeOwnClicked}>Make Your Own</button>
          <button onClick={myMapClicked}>Full Screen Map</button>
        </div>

        <div className='example_images'>
          <img src={example_image1} className="example_image" alt="icons" ></img>
          <img src={example_image2} className="example_image" alt="icons" ></img>
          <img src={example_image3} className="example_image" alt="icons" ></img>
          <img src={example_image4} className="example_image" alt="icons" ></img>
          <img src={example_image5} className="example_image" alt="icons" ></img>
          <img src={example_image6} className="example_image" alt="icons" ></img>
          <img src={example_image7} className="example_image" alt="icons" ></img>
          <img src={example_image8} className="example_image" alt="icons" ></img>
        </div>
        
      </div>
            
        )
    

}

export default Home;