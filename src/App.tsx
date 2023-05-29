import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import icon from './icon';
import API_KEY from './config';

import './App.css';
import { LatLngExpression } from 'leaflet';

interface locationInterface {
  as: as;
  ip: string;
  isp: string;
  location: location;
}

interface as {
  asn: number;
  domain: string;
  name: string;
  route: string;
  type: string;
}

interface location {
  city: string;
  counrty: string;
  geonameId: number;
  lat: number;
  lng: number;
  postalCode: string;
  region: string;
  timezone: string;
}

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [userInput, setUserInput] = useState('');
  const [userLocation, setUserLocation] = useState<locationInterface | null>(
    null
  );

  console.log(userAddress);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserInput('');
    setUserAddress(userInput);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event?.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${userAddress}`
      );
      const data = await res.json();
      setUserLocation(data);
    };
    console.log('hi');
    getData();
  }, [userAddress]);

  return (
    <>
      <header className="header">
        <h1 className="headingPrimary">IP Address Tracker</h1>
        <div className="inputBox">
          <form onSubmit={handleSubmit}>
            <input
              className="locationInput"
              type="text"
              placeholder="Search for any IP address or domain"
              value={userInput}
              onChange={handleInput}
            />
            <button className="btn">
              <img src="./images/icon-arrow.svg" alt="arrow icon" />
            </button>
          </form>
        </div>

        <div className="userInfo">
          <div className="infoBox ip">
            <p>IP Address</p>
            <p>{userLocation ? userLocation.ip : '192.212.174.101'}</p>
          </div>
          <div className="infoBox location">
            <p>Location</p>
            <p>
              {userLocation ? userLocation.location.city : 'Brooklyn, NY 10001'}
            </p>
          </div>
          <div className="infoBox timezone">
            <p>Timezone</p>
            <p>
              {userLocation
                ? `UTC ${userLocation.location.timezone}`
                : 'UTC -05:00'}
            </p>
          </div>
          <div className="infoBox isp">
            <p>ISP</p>
            <p>{userLocation ? userLocation.as.name : 'SpaceX Starlink'}</p>
          </div>
        </div>
      </header>

      <main>
        {userLocation ? (
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
            <Marker
              icon={icon}
              position={[
                userLocation?.location.lat,
                userLocation?.location.lng,
              ]}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        ) : null}
      </main>
    </>
  );
}

export default App;
