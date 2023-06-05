import React, { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((oldPercent) => {
        if (oldPercent >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldPercent + 1;
      });
    }, 100); // Adjust this value to change the speed of loading
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-bar" style={{ width: `${percent}%` }}></div>
      <div className="loading-text">{percent}%</div>
    </div>
  );
};

export default Loading;
