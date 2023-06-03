const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token =
  "myeFgK-NR2sbtVqcUcYt0e4zcOnA9BTQeoPYHu533BEs3lBKsHKbI8mNlpQ7jnXKc7uqWvG7oSXfeSN8TLAsUg==";
const url = "http://localhost:8086";
const org = `Cansat 1.0`;
const bucket = `cansat_telemetry`;

const influx = new InfluxDB({ url, token });
const writeClient = influx.getWriteApi(org, bucket, "ns");

const writeToInflux = (data) => {
  if (data.lat && data.lon && data.altitude) {
    try {
      const point = new Point("telemetry")
        .tag("device_id", "A")
        .floatField("lat", parseFloat(data.lat))
        .floatField("lon", parseFloat(data.lon))
        .floatField("altitude", parseFloat(data.altitude.split(" ")[0]))
        .booleanField("status", data.status)
        .floatField("power", parseFloat(data.power));

      writeClient.writePoint(point);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { writeToInflux };
