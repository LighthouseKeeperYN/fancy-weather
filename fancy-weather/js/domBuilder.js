import { languageButton } from './buttonLanguage';
import { fahrenheitButton, celsiusButton } from './buttonTemperature';
import { updateButton } from './buttonUpdate';
import { dateTime } from './dateTime';
import { countryAndCity, map, coordinates } from './location';
import { searchInput, searchInputButton } from './searchInput';
import { temperatureToday, weatherIcon, weatherData, forecast } from './weather';

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
weatherDataCluster.appendChild(weatherData);
weatherDataCluster.appendChild(forecast[0]);
weatherDataCluster.appendChild(forecast[1]);
weatherDataCluster.appendChild(forecast[2]);

const mapCluster = document.createElement('div');
mapCluster.classList.add('map-cluster');
mapCluster.appendChild(map);
mapCluster.appendChild(coordinates);

document.body.appendChild(buttonCluster);
document.body.appendChild(weatherDataCluster);
document.body.appendChild(mapCluster);
