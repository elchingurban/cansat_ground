import React, { useState } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import { MAPBOX_TOKEN, MAPBOX_STYLE_SATELLITE } from '../core/constants';

export const MapComponent: React.FC<{marker: {longitude: number, latitude: number}}> = ({marker}) => {
  const [lng, setLng] = useState(49.85047);
  const [lat, setLat] = useState(40.3758);

  // const onClickMap = (event: any) => {
  //   const longitude = event.lngLat.lng;
  //   const latitude = event.lngLat.lat;
  //   if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
  //     setMarker({ longitude, latitude });
  //   }
  // };

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
      mapStyle={MAPBOX_STYLE_SATELLITE}
      // onClick={onClickMap}
    >
      <Marker {...marker} anchor="bottom"></Marker>
    </Map>
  );
};

export default MapComponent;
