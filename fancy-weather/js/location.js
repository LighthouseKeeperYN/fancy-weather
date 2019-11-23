// import { apiKeys, settings } from './globals';

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


export async function getGeoData(place, apiKey) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${apiKey}&pretty=1&no_annotations=1`);
  const responseData = await response.json();

  return {
    latitude: responseData.results[0].geometry.lat,
    longitude: responseData.results[0].geometry.lng,
  };
}


// export class GeoData {
//   constructor(place) {
//     this.apiKey = 'dfcea8096a95496ba653f501109c66bf';
//     this.place = place;
//   }

//   async getData() {
//     const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.place}&key=${this.apiKey}&pretty=1&no_annotations=1`);

//     const responseData = await response.json();
//     console.log(responseData.results[0]);
//     return {
//       latitude: responseData.results[0].geometry.lat,
//       longitude: responseData.results[0].geometry.lng
//     }
//   }
// }

// const getGeoData = new GeoData(224020);
// getGeoData.getData().then( data => console.log(data));
