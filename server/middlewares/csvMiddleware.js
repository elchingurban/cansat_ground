const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs");

const csvFolderPath = "./csv";
const csvFilePath = `${csvFolderPath}/data.csv`;

if (!fs.existsSync(csvFolderPath)) {
  fs.mkdirSync(csvFolderPath);
}

if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, "", "utf8");
}

const csvWriter = createCsvWriter({
  path: csvFilePath,
  header: [
    { id: "time", title: "Time" },
    { id: "lat", title: "Latitude" },
    { id: "lon", title: "Longitude" },
    { id: "altitude", title: "Altitude" },
    { id: "status", title: "Status" },
  ],
  append: true,
});

const writeToCsv = (data) => {
  if (data.lat && data.lon && data.altitude) {
    const time = new Date();

    const record = {
      time,
      lat: data.lat,
      lon: data.lon,
      altitude: data.altitude,
      status: data.status,
    };

    csvWriter
      .writeRecords([record])
      .then(() => {
        console.log("Message written to CSV:", record);
      })
      .catch((error) => {
        console.error("Error writing to CSV:", error);
      });
  }
};

module.exports = { writeToCsv };
