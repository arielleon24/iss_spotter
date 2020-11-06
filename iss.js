const request = require("request");
const coordinates = {};

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(
        Error(`status code ${response.statusCode} when fetching IP: ${body}`),
        null
      );
      return;
    }
    if (body) {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      callback(error, null, null);
      return;
    }
    if (data.status === "fail") {
      const msg = `status ${data.status} when fetching COORDINATES with IP: ${data.query}`;
      callback(msg, null);
      return;
    }
    if (body) {
      coordinates.latitude = JSON.parse(body).lat;
      coordinates.longitude = JSON.parse(body).lon;
      callback(null, coordinates);
    }
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      const data = JSON.parse(body);
      if (error) {
        callback(error, null, null);
        return;
      }
      if (data.message !== "success") {
        const msg = `status ${data.message} when fetching flytimes with LAT:${coords.latitude} & LON${coords.longitude}`;
        callback(msg, null);
        return;
      }
      if (body) {
        callback(null, data.response);
      }
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
