import { getWeatherData, getGeoData } from './fetch';
import { apiKeys, settings, dictionary } from './globals';
import { TimeFormater, decimalToDegrees } from './utilities';
import {
  dateTime, temperatureToday, weatherIcon, weatherDataList, forecast,
} from './weatherTime';
import {
  countryAndCity, latitude, longitude, mapIframe,
} from './location';

class UI {
  constructor(getWeatherData, getGeoData) {
    this.getWeatherData = getWeatherData,
    this.getGeoData = getGeoData
  }

  insertToWeatherCluster(locationData, weatherData) {
    console.log(locationData.place)
    countryAndCity.innerText = `${locationData.city}${locationData.city ? ', ' : ''}${locationData.country}`;
  
    const currentTime = new TimeFormater(new Date(), settings.language);
    dateTime.innerText = `${currentTime.getDay()} ${currentTime.getDate()} ${currentTime.getMonth()} \xa0 ${currentTime.getTime()}`;
  
    temperatureToday.innerText = Math.round(weatherData.currently.temperature);
  
    weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
    weatherIcon.alt = weatherData.currently.icon;
  
    weatherDataList.innerHTML = `<p>${weatherData.currently.summary}</p>
      <p>${dictionary.feelsLike[settings.language]}: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
      <p>${dictionary.wind[settings.language]}: ${Math.round(weatherData.currently.windSpeed)} ${settings.units === 'si' ? 'm/s' : 'mph'}</p>
      <p>${dictionary.humidity[settings.language]}: ${Math.round(weatherData.currently.humidity * 100)}%</p>`;

    forecast.insertWeatherData(weatherData);
  }

  insertToMapCluster(locationData) {
    mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${locationData.latitude},${locationData.longitude}&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=${settings.language}`;
  
    const latDegrees = decimalToDegrees(locationData.latitude);
    const lngDegrees = decimalToDegrees(locationData.longitude);
    latitude.innerText = `${dictionary.latitude[settings.language]}: ${latDegrees.degrees}°${(latDegrees.minutes).slice(0, 2)}'`;
    longitude.innerText = `${dictionary.longitude[settings.language]}: ${lngDegrees.degrees}°${(lngDegrees.minutes).slice(0, 2)}'`;
  }

  async drawUI() {
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
  
    this.insertToWeatherCluster(locationData, weatherData);
    this.insertToMapCluster(locationData, weatherData);
  }
}
export const ui = new UI(getWeatherData, getGeoData);

// function insertToWeatherCluster(locationData, weatherData) {
//   countryAndCity.innerText = `${locationData.city}, ${locationData.country}`;

//   const currentTime = new TimeFormater(new Date(), settings.language);
//   dateTime.innerText = `${currentTime.getDay()} ${currentTime.getDate()} ${currentTime.getMonth()} \xa0 ${currentTime.getTime()}`;

//   temperatureToday.innerText = Math.round(weatherData.currently.temperature);

//   weatherIcon.src = require(`../assets/weather-icons/${weatherData.currently.icon}.png`);
//   weatherIcon.alt = weatherData.currently.icon;

//   weatherDataList.innerHTML = `<p>${weatherData.currently.summary}</p>
//     <p>${dictionary.feelsLike[settings.language]}: ${Math.round(weatherData.currently.apparentTemperature)}°</p>
//     <p>${dictionary.wind[settings.language]}: ${Math.round(weatherData.currently.windSpeed)} ${settings.units === 'si' ? 'm/s' : 'mph'}</p>
//     <p>${dictionary.humidity[settings.language]}: ${weatherData.currently.humidity * 100}%</p>`;

//   forecast.insertWeatherData(weatherData);
// }

// function insertToMapCluster(locationData) {
//   mapIframe.src = `https://www.google.com/maps/embed/v1/view?center=${locationData.latitude},${locationData.longitude}&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=${settings.language}`;

//   const latDegrees = decimalToDegrees(locationData.latitude);
//   const lngDegrees = decimalToDegrees(locationData.longitude);
//   latitude.innerText = `${dictionary.latitude[settings.language]}: ${latDegrees.degrees}°${(latDegrees.minutes).slice(0, 2)}'`;
//   longitude.innerText = `${dictionary.longitude[settings.language]}: ${lngDegrees.degrees}°${(lngDegrees.minutes).slice(0, 2)}'`;
// }

// async function insertDataToUI() {
//   const locationData = await getGeoData(
//     settings.location,
//     apiKeys.location,
//     settings.language,
//   );

//   const weatherData = await getWeatherData(
//     apiKeys.weather,
//     locationData,
//     settings.units,
//     settings.language,
//   );

//   insertToWeatherCluster(locationData, weatherData);
//   insertToMapCluster(locationData, weatherData);
// }
// insertDataToUI();
