const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  return ip;
});

fetchCoordsByIP("66.130.18.49", (error, object) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  return object;
});

fetchISSFlyOverTimes(
  { latitude: 45.5332, longitude: -73.6091 },
  (error, passTimes) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    return passTimes;
  }
);

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchCoordsByIP(ip, (error, object) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      fetchISSFlyOverTimes(object, (error) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
      });
    });
  });
  for (let passes of passTimes) {
    console.log(
      `Next pass at ${passes.risetime} for ${passes.duration} seconds!`
    );
  }
});
