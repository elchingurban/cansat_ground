import React, { useEffect, useState } from 'react';

import Graph from './components/Graph';
import MapComponent from './components/Map';
import TelemetryView from './components/TelemetryView';
import { AltitudeDataType, TelemetryDTOType } from './types';
import Loading from './components/Loader/Loading';
import VideoRecorder from './components/VideoRecorder';

import './App.css';

export const App: React.FC = () => {
  const [altitudeData, setAltitudeData] = useState<AltitudeDataType[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryDTOType | null>(null);
  const [marker, setMarker] = useState({
    longitude: 49.85047,
    latitude: 40.3758,
  });

  useEffect(() => {
    setTelemetry({
      telemetry: {
        lat: 40.34522,
        lon: 49.85047,
        altitude: '200',
      }
    });
  }, [])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if(data) {
          setTelemetry(data);
          setAltitudeData((altitudeData) => {
            if (altitudeData.length > 50) altitudeData.shift();
            return [
              ...altitudeData,
              { altitude: data.altitude, time: new Date().toString() },
            ];
          });
          setMarker({latitude: data.lat, longitude: data.lon});
        }
      } catch(err) {
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!telemetry) return <Loading />;

  return (
    <div className="flex h-screen flex-wrap">
      <div className="h-1/2 w-full border border-white  sm:h-screen sm:w-1/2">
        <div className="flex h-1/2 items-center justify-center border border-white pr-12">
          <Graph altitudeData={altitudeData} />
        </div>
        <div className="h-1/2 border border-white">
          <MapComponent marker={marker} />
        </div>
      </div>
      <div className="h-1/2 w-full border border-white  sm:h-screen sm:w-1/2">
        <div className="h-3/5 border border-white">
          <VideoRecorder />
        </div>
        <div className="h-2/5 border border-white">
          <TelemetryView telemetry={telemetry} />
        </div>
      </div>
    </div>
  );
};

export default App;
