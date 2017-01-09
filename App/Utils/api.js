export const fetchWeather = (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=cab31f034f0675f935e00160676b809b`;

  return fetch(url).then((response) => response.json());
};

export const fetchWeatherByGeoLocation = (lat, lng) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=cab31f034f0675f935e00160676b809b`;

  return fetch(url).then((response) => response.json());
};