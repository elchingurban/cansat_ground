import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TelemetryDTOType } from 'renderer/types';

export const TelemetryView: React.FC<TelemetryDTOType> = ({telemetry}) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Time: <span className='block'>{time}</span></div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Latitude: <span className='block'>{telemetry.lat}</span></div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Longitude: <span className='block'>{telemetry.lon}</span></div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Altitude: <span className='block'>{telemetry.altitude}</span></div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Status: <span className={classNames({
          "block": true,
          "text-red-600": !telemetry.status,
          "text-green-500": telemetry.status
        })}>{telemetry.status ? 'Open' : 'Closed'}</span></div>
      </div>
      <div className="m-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-500 text-center text-white">
        <div>Power: <span className='block'>{telemetry.power}</span></div>
      </div>
    </div>
  );
};

export default TelemetryView;
