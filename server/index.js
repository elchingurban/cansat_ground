const express = require("express");
const http = require("http");
const { handleUpgrade, wss } = require("./middlewares/websocketMiddleware");
const { onDataReceived } = require("./middlewares/serialPortMiddleware");
const { writeToInflux } = require("./middlewares/influxdbMiddleware");

const app = express();
const server = http.createServer(app);

app.use(express.json());

wss.on("connection", function connection(ws) {
  onDataReceived((data) => {
    if (data.altitude) {
      const telemetryObject = JSON.stringify({
        ...data,
        altitude: Number(data.altitude.split(" ")[0]),
      });

      ws.send(telemetryObject);
    }
    writeToInflux(data);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  req.wss = wss;
  next();
});

app.use("/api", require("./routes/api"));

server.on("upgrade", handleUpgrade);

server.listen(8080, function () {
  console.log("Server started on port 8080");
});
