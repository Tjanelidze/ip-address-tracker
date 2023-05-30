import React from 'react';
import { locationInterface } from '../interface/locationInterface';

interface UserInfoInterface {
  userLocation: locationInterface;
}

export default function UserInfocomponent(props: UserInfoInterface) {
  const { userLocation } = props;
  return (
    <>
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
    </>
  );
}
