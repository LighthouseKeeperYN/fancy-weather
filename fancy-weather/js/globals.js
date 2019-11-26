import * as utilities from './utilities';

export const apiKeys = {
  weather: '43ca44b17c4017837e555b7a2fddd02d',
  location: 'dfcea8096a95496ba653f501109c66bf',
  map: 'AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE',
  ip: 'd4c758d211e7c9',
  image: utilities.imageApiKeySwitcher,
};

export const languages = {
  english: 'en',
  russian: 'ru',
  belarus: 'be',
};

export const units = {
  si: 'si',
  imperial: 'us',
};

export const dictionary = {
  latitude: {
    en: 'Latitude',
    ru: 'Широта',
    be: 'Шырата',
  },
  longitude: {
    en: 'Longitude',
    ru: 'Долгота',
    be: 'Даўгата',
  },
  feelsLike: {
    en: 'Feels Like',
    ru: 'Ощущается как',
    be: 'Адчуваецца як',
  },
  wind: {
    en: 'Wind',
    ru: 'Ветер',
    be: 'Вецер',
  },
  humidity: {
    en: 'Humidity',
    ru: 'Влажность',
    be: 'Вільготнасць',
  },
  search: {
    en: 'Search',
    ru: 'Поиск',
    be: 'Пошук',
  },
  searchPlaceholder: {
    en: 'Search city or ZIP',
    ru: 'Найти город или индекс',
    be: 'Знайсці горад ці індэкс',
  },
  voiceSearchPlaceholder: {
    en: 'What place do you want to find?',
    ru: 'Какое место вы хотите найти?',
    be: 'Якое месца вы хочаце знайсці?',
  },
  searchError: {
    en: 'Incorrect data',
    ru: 'Неверные данные',
    by: 'Няслушныя дадзеныя',
  }
};
