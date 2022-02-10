const lat = 58.7984;
const lng = 17.8081;
const params = 'windSpeed';

fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
  headers: {
    'Authorization': 'fb7dec0e-8a86-11ec-a9b2-0242ac130002-fb7dec7c-8a86-11ec-a9b2-0242ac130002'
  }
}).then((response) => response.json()).then((jsonData) => {
  // Do something with response data.
});