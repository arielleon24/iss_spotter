const request = require("request-promise-native");

const fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = (body) => {
  let ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  let latitude = JSON.parse(body).lat;
  let longitude = JSON.parse(body).lon;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
