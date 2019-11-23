export const countryAndCity = document.createElement('p');
countryAndCity.classList.add('weather-data-cluster__location');
countryAndCity.innerText = 'Minsk, Belarus';

export const map = document.createElement('div');
map.classList.add('map-cluster__map');

export const coordinates = document.createElement('div');
coordinates.classList.add('map-cluster__coordinates');
const latitude = document.createElement('p');
const longitude = document.createElement('p');
latitude.innerText = 'Latitude: 53°54\'';
longitude.innerText = 'Longitude: 27°34\'';
coordinates.appendChild(latitude);
coordinates.appendChild(longitude);