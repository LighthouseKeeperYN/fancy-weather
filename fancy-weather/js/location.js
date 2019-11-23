export const countryAndCity = document.createElement('p');
countryAndCity.classList.add('weather-data-cluster__location');
countryAndCity.innerText = 'Minsk, Belarus';

export const map = document.createElement('div');
map.classList.add('map-cluster__map');

export const coordinates = document.createElement('div');
coordinates.classList.add('map-cluster__coordinates');
export const latitude = document.createElement('p');
export const longitude = document.createElement('p');
coordinates.appendChild(latitude);
coordinates.appendChild(longitude);