import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LocationsContextProvider } from './context/LocationContext';

import 'leaflet/dist/leaflet.css';
import { ImageContextProvider } from './context/ImageContext';
import { FriendsContextProvider } from './context/FriendsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LocationsContextProvider>
      <ImageContextProvider>
        <FriendsContextProvider>
          <App />
        </FriendsContextProvider>
      </ImageContextProvider>
    </LocationsContextProvider>
  </React.StrictMode>
);
