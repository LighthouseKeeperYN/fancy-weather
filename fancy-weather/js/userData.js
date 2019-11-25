import * as GLOBALS from './globals';
import { getIPInfo } from './fetch';

class UserData {
  constructor() {
    this.language = GLOBALS.languages.english;
    this.units = GLOBALS.units.si;
    this.location = 'Brest Belarus';
  }

  async downloadUserData() {
    try {
      this.localStorageData = JSON.parse(localStorage.getItem('fancy-weather-lhk'));
      this.ipData = await getIPInfo(GLOBALS.apiKeys.ip);

      this.language = this.localStorageData.language || GLOBALS.languages.english;
      this.units = this.localStorageData.units || GLOBALS.units.si;
      this.location = `${this.ipData.city || ''} ${this.ipData.country || this.ipData.region}`;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadUserData() {
    this.localStorageData = {
      language: this.language,
      units: this.units,
    };

    localStorage.setItem('fancy-weather-lhk', JSON.stringify(this.localStorageData));
  }
}

export const settings = new UserData();
