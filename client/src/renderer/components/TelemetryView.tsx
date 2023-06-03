import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { TelemetryDTOType } from 'renderer/types';

export const TelemetryView: React.FC<TelemetryDTOType> = () => {
  const [telemetry, setTelemetry] = useState<TelemetryDTOType | null>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <Loading />;
  return (
    <div className="flex flex-wrap justify-center">
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-blue-500 text-center text-white">
        <div>Time: {time}</div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-green-500 text-center text-white">
        <div>Latitude: {telemetry.lat}</div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-red-500 text-center text-white">
        <div>Longitude: {telemetry.lon}</div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-yellow-500 text-center text-white">
        <div>Altitude: {telemetry.altitude}</div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-purple-500 text-center text-white">
        <div>Status: {telemetry.status}</div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-500 text-center text-white">
        <div>Power: {telemetry.power}</div>
      </div>
    </div>
  );
};

export default TelemetryView;
