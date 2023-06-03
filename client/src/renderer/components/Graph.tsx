import { Socket } from 'dgram';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AltitudeDataType } from 'renderer/App';

export const Graph: React.FC<{altitudeData: AltitudeDataType[]}> = ({altitudeData}) => {

  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart width={600} height={400} data={altitudeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="altitude" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
