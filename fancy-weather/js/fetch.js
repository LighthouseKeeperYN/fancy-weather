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

export async function getImageURL(keywords, apiKeys) {
  // 'be9086c1bfd0184c596f85c05a39b58ada493c74d450982fcac8e0a158e3e139'
  // 'c39f7b7054728fbe1182c24abe50486c3b6e09c849fca3ecbb0b3800739af880'
  // 'ca999b90665246999a446def90692123897b8dbf2be71b2f6792a2d2222de873'
  // '265194590fc47c0b078386361fe497ea5c31d56d34ccf9bd1e0330fa4383df91'
  // '9ffe44f80e9a5ea908c596de07f24b01145a79018daa172974cc961a79583a87'
  // '83dfa940e6a660199c7e7b4bf33902c1f04fc8e958272bd4308dcec97db1bfc3'
  // 'b51e5fc2fbb6592944435068a0affe25e1ed28d747e8eaa81aac6f4c1edbf958'
  // 'fb054b49efafb4854192d38db3d87f1b4211c2567587b8e3307614e8efda79ea'

  // const key = 'fb054b49efafb4854192d38db3d87f1b4211c2567587b8e3307614e8efda79ea';
  let key = apiKeys.getKey();
  let queryUrl = `https://api.unsplash.com/photos/random?query=${keywords[0]},${keywords[1]},${keywords[2]}&client_id=${key}&orientation=landscape`;

  console.log(`https://api.unsplash.com/photos/random?query=${keywords[0]},${keywords[1]},${keywords[2]}&client_id=${key}&orientation=landscape`);

  async function returnData(res) {
    const responseData = await res.json();
    return responseData.urls.regular;
  }

  let response = await fetch(queryUrl);

  // if (response.status === 403) return false;
  
  for (let i = 0; response.status === 403 && i < 8; i++) {
    key = apiKeys.updateKey();
    queryUrl = `https://api.unsplash.com/photos/random?query=${keywords[0]},${keywords[1]},${keywords[2]}&client_id=${key}&orientation=landscape`;
    response = await fetch(queryUrl);
  }

  // console.log(response);

  return returnData(response);
}
