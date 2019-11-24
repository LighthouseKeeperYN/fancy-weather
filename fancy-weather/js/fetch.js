export async function getWeatherData(apiKey, { latitude, longitude }, units, language) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?lang=${language}&units=${units}`);
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export async function getGeoData(place, apiKey, language) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${apiKey}&pretty=1&no_annotations=1&language=${language}`);

  const responseData = await response.json();
  console.log(responseData);
  return {
    latitude: responseData.results[0].geometry.lat,
    longitude: responseData.results[0].geometry.lng,
    country: responseData.results[0].components.country || 'Unknown',
    city: responseData.results[0].components.city
      || responseData.results[0].components.county
      || responseData.results[0].components.state
      || responseData.results[0].components.region
      || '',
  };
}
