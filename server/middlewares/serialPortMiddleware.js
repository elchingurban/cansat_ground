const { SerialPort, ReadlineParser } = require("serialport");
require("dotenv").config();

const portPath = process.env.TELEMETRY_SERIAL_PORT;

const serialPort = new SerialPort({
  path: portPath,
  baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

const onDataReceived = (callback) => {
  parser.on("data", (data) => {
    const arr = data.split(",");
    const time = arr[0];
    const lat = arr[1];
    const lon = arr[2];
    const altitude = arr[3];
    const status = Boolean(arr[4]);
    const power = arr[5];
    const obj = {
      time,
      lat,
      lon,
      altitude,
      status,
      power,
    };
    callback(obj);
  });
};

module.exports = { onDataReceived };
