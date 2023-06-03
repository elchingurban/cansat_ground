const express = require("express");
const router = express.Router();

router.get("/telemetry", function (req, res) {
  const wss = req.wss;
  res.json({ message: "Telemetry endpoint" });
});

module.exports = router;
