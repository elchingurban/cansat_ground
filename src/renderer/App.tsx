import React, { useState } from 'react';

import './App.css';

import Graph from './components/Graph';
import MapComponent from './components/Map';

export const App: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState('Port 1');

  const ports = ['Port 1', 'Port 2', 'Port 3', 'Port 4'];
  return (
    <div className="flex h-screen flex-wrap border">
      <div className="h-1/2 w-full border border-red-500 sm:h-screen sm:w-1/2">
        <div className="h-1/2 border border-green-500">
          <Graph />
        </div>
        <div className="h-1/2 border border-blue-500">
          <MapComponent />
        </div>
      </div>
      <div className="h-1/2 w-full border border-yellow-500 sm:h-screen sm:w-1/2">
        <div className="h-3/5 border border-purple-500">Camera</div>
        <div className="h-2/5 border border-pink-500">Telemetry</div>
      </div>
    </div>
  );
};

export default App;
