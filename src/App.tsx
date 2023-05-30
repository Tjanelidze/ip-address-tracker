import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

import API_KEY from './config';
import { locationInterface } from './interface/locationInterface';
import MarkerPosition from './components/MarkerPosition';

import './App.css';
import SearchBarComponent from './components/SearchBarComponent';
import UserInfocomponent from './components/UserInfocomponent';

function App() {
  const [userAddress, setUserAddress] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [userLocation, setUserLocation] = useState<locationInterface | null>(
    null
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserInput('');
    setUserAddress(userInput);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event?.target.value);
  };

  useEffect(() => {
    try {
      const checkIpAddress =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
      const checkDomain =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

      const getData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${
            checkIpAddress.test(userAddress)
              ? `ipAddress=${userAddress}`
              : checkDomain.test(userAddress)
              ? `domain=${userAddress}`
              : ''
          }`
        );
        const data = await res.json();
        setUserLocation(data);
      };
      getData();
    } catch (error) {
      console.trace(error);
    }
  }, [userAddress]);

  return (
    <>
      <header className="header">
        <h1 className="headingPrimary">IP Address Tracker</h1>
        <div className="inputBox">
          <SearchBarComponent
            handleSubmit={handleSubmit}
            userInput={userInput}
            handleInput={handleInput}
          />
        </div>

        {userLocation && <UserInfocomponent userLocation={userLocation} />}
      </header>

      <main>
        {userLocation && (
          <MapContainer
            center={[userLocation?.location.lat, userLocation?.location.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100wh' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerPosition address={userLocation} />
          </MapContainer>
        )}
      </main>
    </>
  );
}

export default App;
