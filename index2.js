const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = (passTimes) => {
  for (let passes of passTimes) {
    console.log(
      `Next pass at ${passes.risetime} for ${passes.duration} seconds!`
    );
  }
};

nextISSTimesForMyLocation().then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work:", error.message);
});

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => {console.log(body)});