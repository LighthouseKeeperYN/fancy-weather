export const temperatureToday = document.createElement('p');
temperatureToday.classList.add('weather-data-cluster__temperature-today');
temperatureToday.innerText = '10';

export const weatherIcon = document.createElement('img');
weatherIcon.classList.add('weather-data-cluster__weather-icon');
weatherIcon.alt = 'Weather Icon';
weatherIcon.src = require('../assets/weather-icons/cloudy.png');

let weatherType = 'Overcast';
let feelsLike = 'FeelsLike: 7°';
let wind = 'Wind: 2 m/s';
let humidity = 'Humidity: 83%';

export const weatherData = document.createElement('div');
weatherData.classList.add('weather-data-cluster__weather-data')
weatherData.innerHTML =
  `<p>${weatherType}</p>
   <p>${feelsLike}</p>
   <p>${wind}</p>
   <p>${humidity}</p>`;

function createForecastNode(day, temperature, weather) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('forecast');

  const dayElement = document.createElement('p');
  dayElement.classList.add('forecast__day');
  dayElement.innerText = day;

  const temperatureElement = document.createElement('p');
  temperatureElement.classList.add('forecast__temperature');
  temperatureElement.innerText = temperature;

  const weatherIconElement = document.createElement('img');
  weatherIconElement.classList.add('forecast__icon');
  weatherIconElement.alt = 'Weather Icon';
  weatherIconElement.src = require('../assets/weather-icons/cloudy.png');

  wrapper.appendChild(dayElement);
  wrapper.appendChild(temperatureElement);
  wrapper.appendChild(weatherIconElement);

  return wrapper;
}

export const forecast = [
  createForecastNode('Tuesday', '7°', 'whatever'),
  createForecastNode('Tuesday', '7°', 'whatever'),
  createForecastNode('Tuesday', '7°', 'whatever')
];


