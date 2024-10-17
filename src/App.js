import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

//pages and componenets
import SignIn from './pages/SignIn'
import Navbar from './components/Navbar'
import Edit from './pages/Edit'
import Map from './pages/Map'
import Pictures from './pages/Pictures'
import Modify from './pages/Modify'
import Login from './components/LoginForm';
import MapList from './pages/MapList';
import Home from './pages/Home';

function App() {
  
  return (
    <div className="App" >
      <Router>
      <Navbar />
        <div className="pages">
            <Routes>
              <Route  
                path="/"
                element={<Home />}
              />

              <Route  
                path="/edit"
                element={<Edit />}
              />

              <Route  
                path="/map"
                element={<Map />}
              />

              <Route  
                path="/pictures"
                element={<Pictures />}
              />

              <Route  
                path="/modify"
                element={<Modify />}
              />

              <Route  
                path="/maplist"
                element={<MapList />}
              />

              <Route  
                path="/signIn"
                element={<SignIn />}
              />
            </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
