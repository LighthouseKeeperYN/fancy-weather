import { apiKeys, settings } from './globals';
import { getGeoData } from './location';
import { ConvertTime } from './utilities';

export const dateTime = document.createElement('p');
dateTime.classList.add('weather-data-cluster__date-time');
dateTime.innerText = 'Mon 28 October \xa0 17:23';

export const temperatureToday = document.createElement('p');
temperatureToday.classList.add('weather-data-cluster__temperature-today');

export const weatherIcon = document.createElement('img');
weatherIcon.classList.add('weather-data-cluster__weather-icon');
weatherIcon.alt = 'Weather Icon';

export const weatherDataList = document.createElement('div');
weatherDataList.classList.add('weather-data-cluster__weather-data');

class Forecast {
  constructor() {
    this.collection = [];
  }

  createNode() {
    const nodeWrapper = document.createElement('div');
    nodeWrapper.classList.add('forecast');

    const dayElement = document.createElement('p');
    dayElement.classList.add('forecast__day');

    const temperatureElement = document.createElement('p');
    temperatureElement.classList.add('forecast__temperature');

    const weatherIconElement = document.createElement('img');
    weatherIconElement.classList.add('forecast__icon');
    weatherIconElement.alt = 'Weather Icon';

    nodeWrapper.appendChild(dayElement);
    nodeWrapper.appendChild(temperatureElement);
    nodeWrapper.appendChild(weatherIconElement);

    this.collection.push(nodeWrapper);
  }

  insertWeatherData(weatherData) {
    const data = {};

    for (let i = 1; i < 4; i++) {
      const dayTime = new ConvertTime(weatherData.daily.data[i].time * 1000);
      data.day = dayTime.getFullDay();
      data.temperature = Math.round(weatherData.daily.data[i].temperatureHigh);
      data.icon = weatherData.daily.data[i].icon;

      this.updateNode(i - 1, data);
    }
  }

  updateNode(nodeIndex, data) {
    const node = this.collection[nodeIndex];

    node.children[0].innerText = data.day;
    node.children[1].innerText = `${data.temperature}°`;
    node.children[2].src = require(`../assets/weather-icons/${data.icon}.png`);
    node.children[2].alt = data.icon;
  }
}

export const forecast = new Forecast();
forecast.createNode();
forecast.createNode();
forecast.createNode();

class Weather {
  constructor(apiKey, { latitude, longitude }, units, language) {
    this.apiKey = apiKey;
    this.latitude = latitude;
    this.longitude = longitude;
    this.units = units;
    this.language = language;
  }

  async getWeatherData() {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this.apiKey}/${this.latitude},${this.longitude}?lang=${this.language}&units=${this.units}`);
    const responseData = await response.json();

    return responseData;
  }

  changeLocation({ latitude, longitude }) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

async function insertDataToUI() {
  const coordinates = await getGeoData(settings.location, apiKeys.location);

  const weather = new Weather(apiKeys.weather, coordinates, settings.units, settings.language);
  const weatherData = await weather.getWeatherData();

  temperatureToday.innerText = Math.round(weatherData.currently.temperature);
  weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
  weatherIcon.alt = weatherData.currently.icon;

  weatherDataList.innerHTML = `<p>${weatherData.currently.summary}</p>
    <p>Feels Like: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
    <p>Wind: ${Math.round(weatherData.currently.windSpeed)} m/s</p>
    <p>Humidity: ${weatherData.currently.humidity * 100}%</p>`;

  forecast.insertWeatherData(weatherData);
}
insertDataToUI();
