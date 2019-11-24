import { languageButton } from './buttonLanguage';
import { fahrenheitButton, celsiusButton } from './buttonUnits';
import { updateButton } from './buttonUpdate';
import { countryAndCity, map, coordinates } from './location';
import { searchInput, searchInputButton } from './searchInput';
import {
  dateTime, temperatureToday, weatherIcon, weatherDataList, forecast,
} from './weatherTime';
import { display } from './display';


const buttonCluster = document.createElement('div');
buttonCluster.classList.add('button-cluster');
buttonCluster.appendChild(updateButton);
buttonCluster.appendChild(languageButton);
buttonCluster.appendChild(fahrenheitButton);
buttonCluster.appendChild(celsiusButton);
buttonCluster.appendChild(searchInput);
buttonCluster.appendChild(searchInputButton);

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

document.body.appendChild(buttonCluster);
document.body.appendChild(weatherDataCluster);
document.body.appendChild(mapCluster);

display.drawEverything();
display.initTimeUpdater();
