import React, { useEffect, useState } from 'react';

import './App.css';

import Graph from './components/Graph';
import MapComponent from './components/Map';

interface TelemetryDTOType {
  time: string;
  lat: string;
  lon: string;
  altitude: string;
  status: string;
  power: string;
}

export interface AltitudeDataType {
  altitude: string;
  time: Date;
}

export const App: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryDTOType | null>(null);
  const [altitudeData, setAltitudeData] = useState<AltitudeDataType[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTelemetry(data);
      setAltitudeData(altitudeData => [...altitudeData, {altitude: data.altitude, time: new Date}])
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

  if(!telemetry) return <>Loading..</>

  return (
    <div className="flex h-screen flex-wrap border">
      <div className="h-1/2 w-full border border-red-500 sm:h-screen sm:w-1/2">
        <div className="h-1/2 border border-green-500">
          <Graph altitudeData={altitudeData} />
        </div>
        <div className="h-1/2 border border-blue-500">
          <MapComponent />
        </div>
      </div>
      <div className="h-1/2 w-full border border-yellow-500 sm:h-screen sm:w-1/2">
        <div className="h-3/5 border border-purple-500">Camera</div>
        <div className="h-2/5 border border-pink-500">
          <div>
            Altitude {telemetry.altitude}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;