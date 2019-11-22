import { apiKeys, settings } from './globals';
import { getGeoData } from './location';

export const temperatureToday = document.createElement('p');
temperatureToday.classList.add('weather-data-cluster__temperature-today');

export const weatherIcon = document.createElement('img');
weatherIcon.classList.add('weather-data-cluster__weather-icon');
weatherIcon.alt = 'Weather Icon';

export const weatherDataList = document.createElement('div');
weatherDataList.classList.add('weather-data-cluster__weather-data');

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
  createForecastNode('Tuesday', '7°', 'whatever'),
];

class Weather {
  constructor(apiKey, { latitude, longitude }, units, language) {
    this.apiKey = apiKey;
    this.latitude = latitude;
    this.longitude = longitude;
    this.units = units;
    this.language = language;
  }

  async getWeather() {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this.apiKey}/${this.latitude},${this.longitude}?lang=${this.language}&units=${this.units}`);
    const responseData = await response.json();

    return responseData
  }

  changeLocation({ latitude, longitude }) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

getGeoData(settings.location, apiKeys.location)
  .then(coordinates => {
    const weather = new Weather(apiKeys.weather, coordinates, settings.units, settings.language);
    
    weather.getWeather()
      .then(function paintUI(weatherData) {
        console.log(weatherData)
        temperatureToday.innerText = Math.round(weatherData.currently.temperature);
        weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
        weatherDataList.innerHTML =`<p>${weatherData.currently.summary}</p>
          <p>Feels Like: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
          <p>Wind: ${Math.round(weatherData.currently.windSpeed)} m/s</p>
          <p>Humidity: ${weatherData.currently.humidity * 100}%</p>
          `;

      });
  });

// const weather = new Weather({ latitude: 52.1031542, longitude: 23.7321087 });
// weather.getWeather()

// // 52.1031542,23.7321087