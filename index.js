const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  //console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('72.141.14.4', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  //console.log("Coordinates are: ", data);
});

fetchISSFlyOverTimes({ latitude: '43.6644', longitude: '-79.4195' }, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  //console.log("Fly over times are: ", data);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});