import React, { useEffect, useMemo } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import icon from '../icon';
import { locationInterface } from '../interface/locationInterface';
import { LatLngExpression } from 'leaflet';

interface MarkerPositionInterface {
  address: locationInterface;
}

export default function MarkerPosition(props: MarkerPositionInterface) {
  const position: LatLngExpression = useMemo(() => {
    return [props.address.location.lat, props.address.location.lng];
  }, [props.address.location.lat, props.address.location.lng]);

  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <>
      <Marker icon={icon} position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  );
}
