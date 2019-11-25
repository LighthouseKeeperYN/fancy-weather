import { languageMenu } from './menuLanguage';
import {
  fahrenheitButton, celsiusButton, updateButton,
} from './buttons';
import { countryAndCity, map, coordinates } from './location';
import { search } from './search';
import {
  dateTime, temperatureToday, weatherIcon, weatherDataList, forecast,
} from './weatherTime';
import { display } from './display';
import { settings } from './userData';

async function buildDom() {
  await settings.downloadUserData();

  const leftSubCluster = document.createElement('div');
  leftSubCluster.classList.add('button-cluster__left-sub-cluster');
  leftSubCluster.appendChild(updateButton);
  leftSubCluster.appendChild(languageMenu);
  leftSubCluster.appendChild(fahrenheitButton);
  leftSubCluster.appendChild(celsiusButton);

  const rightSubCluster = document.createElement('div');
  rightSubCluster.classList.add('button-cluster__right-sub-cluster');
  rightSubCluster.appendChild(search.field);
  rightSubCluster.appendChild(search.button);
  rightSubCluster.appendChild(search.recognitionButton);

  const buttonCluster = document.createElement('div');
  buttonCluster.classList.add('button-cluster');
  buttonCluster.appendChild(leftSubCluster);
  buttonCluster.appendChild(rightSubCluster);

  const weatherDataCluster = document.createElement('div');
  weatherDataCluster.classList.add('weather-data-cluster');
  weatherDataCluster.appendChild(countryAndCity);
  weatherDataCluster.appendChild(dateTime);
  weatherDataCluster.appendChild(temperatureToday);
  weatherDataCluster.appendChild(weatherIcon);
  weatherDataCluster.appendChild(weatherDataList);
  weatherDataCluster.appendChild(forecast.collection[0]);
  weatherDataCluster.appendChild(forecast.collection[1]);
  weatherDataCluster.appendChild(forecast.collection[2]);

  const mapCluster = document.createElement('div');
  mapCluster.classList.add('map-cluster');
  mapCluster.appendChild(map);
  mapCluster.appendChild(coordinates);

  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('main-wrapper');
  mainWrapper.appendChild(weatherDataCluster);
  mainWrapper.appendChild(mapCluster);

  document.body.appendChild(buttonCluster);
  document.body.appendChild(mainWrapper);

  display.drawEverything();
  display.initTimeUpdater();

  window.addEventListener('beforeunload', async () => {
    await settings.uploadUserData();
  });
}

buildDom();
