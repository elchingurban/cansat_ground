const WebSocket = require("ws");

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});

const handleUpgrade = (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
};

module.exports = { handleUpgrade, wss };
