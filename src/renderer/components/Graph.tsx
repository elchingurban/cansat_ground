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
} from 'recharts';
import { io } from 'socket.io-client';

export const Graph: React.FC = () => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('altitude', (altitude) => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        altitude,
      };
      setData((prevData) => [...prevData, newData]);
    });
  }, [socket]);
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="altitude"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default Graph;
