const express = require("express");
const router = express.Router();
const fs = require("fs");

const csvFolderPath = "./csv";
const csvFilePath = `${csvFolderPath}/data.csv`;

router.get("/telemetry", function (req, res) {
  const wss = req.wss;
  res.json({ message: "Telemetry endpoint" });
});

router.post("/save-team-record", function (req, res) {
  const fileName = req.body.file_name;

  if (!fileName) {
    return res.status(400).json({ message: "No file name provided" });
  }

  fs.readFile(csvFilePath, "utf8", function (err, data) {
    if (err) {
      return res.status(500).json({ message: "Error reading data.csv" });
    }

    fs.writeFile(`${fileName}.csv`, data, function (err) {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }

      fs.writeFileSync(csvFilePath, "");

      res.json({ message: "File content moved successfully" });
    });
  });
});

module.exports = router;
