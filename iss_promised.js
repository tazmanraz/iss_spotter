const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)["ip"];
  return request('https://freegeoip.app/json/' + ip);
};

const fetchISSFlyOverTimes = function(body) {
  const coord = {
    latitude: JSON.parse(body)["latitude"],
    longitude: JSON.parse(body)["longitude"]
  };

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coord["latitude"]}&lon=${coord["longitude"]}`;
  return request(url);

}

const nextISSTimesForMyLocation = function() {
  return (
    fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => JSON.parse(data)["response"])
  )
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }
