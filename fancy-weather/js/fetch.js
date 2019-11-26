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

export async function getIPInfo(key) {
  // https://cors-anywhere.herokuapp.com/
  let response;
  let responseData;
  try {
    response = await fetch(`https://cors-anywhere.herokuapp.com/https://ipinfo.io/json?token=${key}`);
    responseData = await response.json();
  } catch (error) {
    console.log('IPINFO', error);
  }
  console.log(responseData);
  return responseData;
}

export async function getImageURL(keywords, apiKeys) {
  let key = apiKeys.getKey();
  let response;
  let responseData;

  try {
    response = await fetch(`https://api.unsplash.com/photos/random?query=${keywords[0]},${keywords[1]},${keywords[2]}&client_id=${key}&orientation=landscape`);

    for (let i = 0; response.status === 403 && i < apiKeys.keys.length; i++) {
      key = apiKeys.updateKey();
      // eslint-disable-next-line no-await-in-loop
      response = await fetch(`https://api.unsplash.com/photos/random?query=${keywords[0]},${keywords[1]},${keywords[2]}&client_id=${key}&orientation=landscape`);
    }
  } catch (error) {
    console.log('UNSPLASH-1: ', error);
  }

  try {
    responseData = await response.json();
  } catch (error) {
    console.log('UNSPLASH-2: ', error);
  }

  console.log(responseData);
  return responseData.urls.regular;
}
