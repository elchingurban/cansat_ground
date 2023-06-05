import React, { useEffect, useState } from 'react';

import './App.css';

import Graph from './components/Graph';
import MapComponent from './components/Map';
import TelemetryView from './components/TelemetryView';
import { AltitudeDataType, TelemetryDTOType } from './types';
import Loading from './components/Loading';

export const App: React.FC = () => {
  const [altitudeData, setAltitudeData] = useState<AltitudeDataType[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryDTOType | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTelemetry(data);
      setAltitudeData((altitudeData) => {
        if(altitudeData.length > 50) altitudeData.shift();
        return [
          ...altitudeData,
          { altitude: data.altitude, time: (new Date()).toString() },
        ]
      });
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
        <div className="h-1/2 border border-white flex items-center justify-center pr-12">
          <Graph altitudeData={altitudeData} />
        </div>
        <div className="h-1/2 border border-white">
          <MapComponent />
        </div>
      </div>
      <div className="h-1/2 w-full border border-white  sm:h-screen sm:w-1/2">
        <div className="h-3/5 border border-white">Camera</div>
        <div className="h-2/5 border border-white">
          <TelemetryView
            telemetry={telemetry}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
