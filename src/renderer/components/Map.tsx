import React, { useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { MAPBOX_TOKEN } from '../constants/index';

export const MapComponent: React.FC = () => {
  const [lng, setLng] = useState(49.85047);
  const [lat, setLat] = useState(40.3758);
  const [marker, setMarker] = useState({
    longitude: 49.85047,
    latitude: 40.3758,
  });
  console.log(marker);

  const onClickMap = (event: any) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
      setMarker({ longitude, latitude });
    }
  };

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 14,
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={onClickMap}
    >
      <Marker {...marker} anchor="bottom"></Marker>
    </Map>
  );
};

export default MapComponent;
