import { getWeatherData, getGeoData } from './fetch';
import { apiKeys, settings, dictionary } from './globals';
import { TimeFormater, decimalToDegrees } from './utilities';
import {
  dateTime, temperatureToday, weatherIcon, weatherDataList, forecast,
} from './weatherTime';
import {
  countryAndCity, latitude, longitude, mapIframe,
} from './location';

class Display {
  constructor(getWeatherDataFn, getGeoDataFn) {
    this.getWeatherData = getWeatherDataFn;
    this.getGeoData = getGeoDataFn;
  }

  insertDataToWeatherCluster(locationData, weatherData) {
    countryAndCity.innerText = `${locationData.city}${locationData.city ? ', ' : ''}${locationData.country}`;

    this.currentTime = new TimeFormater(new Date(), settings.language);
    dateTime.innerText = `${this.currentTime.getDay()} ${this.currentTime.getDate()} ${this.currentTime.getMonth()} \xa0 ${this.currentTime.getTime()}`;

    temperatureToday.innerText = Math.round(weatherData.currently.temperature);

    weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
    weatherIcon.alt = weatherData.currently.icon;

    weatherDataList.innerHTML = `<p>${weatherData.currently.summary}</p>
      <p>${dictionary.feelsLike[settings.language]}: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
      <p>${dictionary.wind[settings.language]}: ${Math.round(weatherData.currently.windSpeed)} ${settings.units === 'si' ? 'm/s' : 'mph'}</p>
      <p>${dictionary.humidity[settings.language]}: ${Math.round(weatherData.currently.humidity * 100)}%</p>`;

    forecast.insertWeatherData(weatherData);
  }

  insertDataToMapCluster(locationData) {
    mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${locationData.latitude},${locationData.longitude}&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=${settings.language}`;

    this.latDegrees = decimalToDegrees(locationData.latitude);
    this.lngDegrees = decimalToDegrees(locationData.longitude);
    latitude.innerText = `${dictionary.latitude[settings.language]}: ${this.latDegrees.degrees}°${(this.latDegrees.minutes).slice(0, 2)}'`;
    longitude.innerText = `${dictionary.longitude[settings.language]}: ${this.lngDegrees.degrees}°${(this.lngDegrees.minutes).slice(0, 2)}'`;
  }

  async getData() {
    const locationData = await this.getGeoData(
      settings.location,
      apiKeys.location,
      settings.language,
    );

    const weatherData = await this.getWeatherData(
      apiKeys.weather,
      locationData,
      settings.units,
      settings.language,
    );

    return { locationData, weatherData };
  }

  async drawWeather() {
    const data = await this.getData();

    this.insertDataToWeatherCluster(data.locationData, data.weatherData);
  }

  async drawMap() {
    const data = await this.getData();

    this.insertDataToMapCluster(data.locationData);
  }

  async drawEverything() {
    const data = await this.getData();

    this.insertDataToWeatherCluster(data.locationData, data.weatherData);
    this.insertDataToMapCluster(data.locationData, data.weatherData);
  }
}
export const display = new Display(getWeatherData, getGeoData);
