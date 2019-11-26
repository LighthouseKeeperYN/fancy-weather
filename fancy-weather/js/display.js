import { fahrenheitButton, celsiusButton } from './buttons';
import * as fetchers from './fetchers';
import * as GLOBALS from './globals';
import {
  countryAndCity,
  latitude,
  longitude,
  mapIframe,
} from './location';
import * as menuLanguage from './menuLanguage';
import { search } from './search';
import { settings } from './userData';
import * as utilities from './utilities';
import {
  dateTime,
  temperatureToday,
  weatherIcon,
  weatherDataList,
  forecast,
} from './weatherTime';
import { ticker } from './ticker';

class Display {
  constructor(getWeatherDataFn, getGeoDataFn, getImageURLFn, bgImageTemplateFn, tickerFn) {
    this.getWeatherData = getWeatherDataFn;
    this.getGeoData = getGeoDataFn;
    this.getImageURL = getImageURLFn;
    this.bgImageTemplate = bgImageTemplateFn;
    this.search = search;
    this.menuLanguage = menuLanguage;
    this.ticker = tickerFn;
  }

  updateTime(weatherData) {
    this.currentTime = new utilities.TimeFormatter(
      new Date(),
      settings.language,
      weatherData.timezone,
    );
    dateTime.innerText = `${this.currentTime.getDay()} ${this.currentTime.getDate()} ${this.currentTime.getMonth()} \xa0 ${this.currentTime.getTime()}`;
  }

  initTimeUpdater = (weatherData) => {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => { this.updateTime(weatherData); }, (1000 * 60));
  }

  insertDataToWeatherCluster(locationData, weatherData) {
    countryAndCity.innerText = `${locationData.city}${locationData.city ? ', ' : ''}${locationData.country}`;

    this.updateTime(weatherData);

    temperatureToday.innerText = Math.round(weatherData.currently.temperature);

    weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
    weatherIcon.alt = weatherData.currently.icon;

    weatherDataList.innerHTML = `<p>${weatherData.currently.summary}</p>
      <p>${GLOBALS.dictionary.feelsLike[settings.language]}: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
      <p>${GLOBALS.dictionary.wind[settings.language]}: ${Math.round(weatherData.currently.windSpeed)} ${settings.units === 'si' ? 'm/s' : 'mph'}</p>
      <p>${GLOBALS.dictionary.humidity[settings.language]}: ${Math.round(weatherData.currently.humidity * 100)}%</p>`;

    forecast.insertWeatherData(weatherData);
  }

  insertDataToMapCluster(locationData) {
    mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${locationData.latitude},${locationData.longitude}&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=${settings.language}`;

    this.latDegrees = utilities.decimalToDegrees(locationData.latitude);
    this.lngDegrees = utilities.decimalToDegrees(locationData.longitude);
    latitude.innerText = `${GLOBALS.dictionary.latitude[settings.language]}: ${this.latDegrees.degrees}°${(this.latDegrees.minutes).slice(0, 2)}'`;
    longitude.innerText = `${GLOBALS.dictionary.longitude[settings.language]}: ${this.lngDegrees.degrees}°${(this.lngDegrees.minutes).slice(0, 2)}'`;
  }

  insertBGToBody(imageURL) {
    document.body.style.background = this.bgImageTemplate.getString(imageURL);
    document.body.style.backgroundSize = 'cover';
  }

  async getData(language) {
    const locationData = await this.getGeoData(
      settings.location,
      GLOBALS.apiKeys.location,
      language,
    );

    if (!locationData) return false;

    const weatherData = await this.getWeatherData(
      GLOBALS.apiKeys.weather,
      locationData,
      settings.units,
      language,
    );

    return { locationData, weatherData };
  }

  drawSearchInput() {
    this.search.field.placeholder = GLOBALS.dictionary.searchPlaceholder[settings.language];
    this.search.button.innerText = GLOBALS.dictionary.search[settings.language];
  }

  async drawButtons() {
    this.menuLanguage.languageButtonText.innerText = settings.language;
    this.menuLanguage.menuItems[settings.language].classList.remove('inactive');

    if (settings.units === GLOBALS.units.si) fahrenheitButton.classList.add('inactive');
    else celsiusButton.classList.add('inactive');
  }

  async drawWeather() {
    const data = await this.getData(settings.language);
    this.insertDataToWeatherCluster(data.locationData, data.weatherData);
  }

  async drawMap() {
    const data = await this.getData(settings.language);
    this.insertDataToMapCluster(data.locationData);
  }

  async drawBG(data) {
    const dataEn = data || await this.getData(GLOBALS.languages.english);

    const timeFormatter = new utilities.TimeFormatter(new Date(), 'ru', dataEn.weatherData.timezone);
    const month = timeFormatter.getMonth();
    const hours = timeFormatter.getHours();

    const keywords = utilities.generateKeywords(month, hours);
    keywords.push(dataEn.weatherData.currently.summary);
    console.log('bg image keywords:', keywords);
    const imageURL = await this.getImageURL(keywords, GLOBALS.apiKeys.image);

    this.insertBGToBody(imageURL);
  }

  async drawEverything() {
    const data = await this.getData(settings.language);

    if (!data) search.throwError();
    else {
      this.drawButtons();
      this.drawSearchInput();
      this.insertDataToWeatherCluster(data.locationData, data.weatherData);
      this.insertDataToMapCluster(data.locationData, data.weatherData);
      this.drawBG(settings.language === GLOBALS.languages.english ? data : false);
      this.ticker.drawTicker(data.weatherData);
      this.initTimeUpdater(data.weatherData);
    }
  }
}
export const display = new Display(
  fetchers.getWeatherData,
  fetchers.getGeoData,
  fetchers.getImageURL,
  utilities.bgImageTemplate,
  ticker
);
