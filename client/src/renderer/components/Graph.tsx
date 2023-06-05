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
import { AltitudeDataType } from 'renderer/types';

export const Graph: React.FC<{ altitudeData: AltitudeDataType[] }> = ({
  altitudeData,
}) => {
  const formattedData = altitudeData.map((item) => ({
    ...item,
    time: Date.parse(item.time),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={400} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          domain={['auto', 'auto']}
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          }
        />
        <YAxis />
        <Line
          type="monotone"
          dataKey="altitude"
          isAnimationActive={false}
          stroke="#e52020"
        />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
