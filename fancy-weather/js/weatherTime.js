import { settings } from './userData';
import { TimeFormatter } from './utilities';

export const dateTime = document.createElement('p');
dateTime.classList.add('weather-data-cluster__date-time');

export const temperatureToday = document.createElement('p');
temperatureToday.classList.add('weather-data-cluster__temperature-today');

export const weatherIcon = document.createElement('img');
weatherIcon.classList.add('weather-data-cluster__weather-icon');
weatherIcon.alt = '\xa0';

export const weatherDataList = document.createElement('div');
weatherDataList.classList.add('weather-data-cluster__weather-data');

class Forecast {
  constructor() {
    this.collection = [];
  }

  createNode(amount = 1) {
    for (let i = 0; i < amount; i++) {
      const nodeWrapper = document.createElement('div');
      nodeWrapper.classList.add('forecast');

      const dayElement = document.createElement('p');
      dayElement.classList.add('forecast__day');

      const temperatureElement = document.createElement('p');
      temperatureElement.classList.add('forecast__temperature');

      const weatherIconElement = document.createElement('img');
      weatherIconElement.classList.add('forecast__icon');
      weatherIconElement.alt = '\xa0';

      nodeWrapper.appendChild(dayElement);
      nodeWrapper.appendChild(temperatureElement);
      nodeWrapper.appendChild(weatherIconElement);

      this.collection.push(nodeWrapper);
    }
  }

  insertWeatherData(weatherData) {
    const data = {};

    for (let i = 1; i <= this.collection.length; i++) {
      const dayTime = new TimeFormatter(weatherData.daily.data[i].time * 1000, settings.language);
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

forecast.createNode(3)
