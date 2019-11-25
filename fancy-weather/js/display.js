import { getWeatherData, getGeoData, getImageURL } from './fetch';
import {
  apiKeys, dictionary, languages,
} from './globals';
import {
  TimeFormatter, decimalToDegrees, bgImageTemplate, generateKeywords,
} from './utilities';
import {
  dateTime, temperatureToday, weatherIcon, weatherDataList, forecast,
} from './weatherTime';
import {
  countryAndCity, latitude, longitude, mapIframe,
} from './location';
import { searchInput, searchInputButton } from './searchInput';
import { settings } from './userData';

class Display {
  constructor(getWeatherDataFn, getGeoDataFn, getImageURLFn, bgImageTemplateFn) {
    this.getWeatherData = getWeatherDataFn;
    this.getGeoData = getGeoDataFn;
    this.getImageURL = getImageURLFn;
    this.bgImageTemplate = bgImageTemplateFn;
  }

  updateTime() {
    this.currentTime = new TimeFormatter(new Date(), settings.language);
    dateTime.innerText = `${this.currentTime.getDay()} ${this.currentTime.getDate()} ${this.currentTime.getMonth()} \xa0 ${this.currentTime.getTime()}`;
  }

  initTimeUpdater() {
    setInterval(() => { this.updateTime(); }, (1000 * 60));
  }

  insertDataToWeatherCluster(locationData, weatherData) {
    countryAndCity.innerText = `${locationData.city}${locationData.city ? ', ' : ''}${locationData.country}`;

    this.updateTime();

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

  insertBGToBody(imageURL) {
    document.body.style.background = this.bgImageTemplate.getString(imageURL);
    document.body.style.backgroundSize = 'cover';
  }

  async getData(language) {
    const locationData = await this.getGeoData(
      settings.location,
      apiKeys.location,
      language,
    );

    const weatherData = await this.getWeatherData(
      apiKeys.weather,
      locationData,
      settings.units,
      language,
    );

    return { locationData, weatherData };
  }

  drawSearchInput() {
    searchInput.placeholder = dictionary.searchPlaceholder[settings.language];
    searchInputButton.innerText = dictionary.search[settings.language];
  }

  async drawWeather() {
    const data = await this.getData(settings.language);
    this.insertDataToWeatherCluster(data.locationData, data.weatherData);
  }

  async drawMap() {
    const data = await this.getData(settings.language);
    this.insertDataToMapCluster(data.locationData);
  }

  async drawBG() {
    const dataEn = await this.getData(languages.english);
    const keywords = generateKeywords();
    keywords.push(dataEn.weatherData.currently.summary);
    const imageURL = await this.getImageURL(keywords, apiKeys.image);

    this.insertBGToBody(imageURL);
  }

  async drawEverything() {
    const data = await this.getData(settings.language);

    this.drawSearchInput();
    this.insertDataToWeatherCluster(data.locationData, data.weatherData);
    this.insertDataToMapCluster(data.locationData, data.weatherData);
    this.drawBG();
  }
}
export const display = new Display(getWeatherData, getGeoData, getImageURL, bgImageTemplate);
