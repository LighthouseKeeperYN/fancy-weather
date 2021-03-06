import * as GLOBALS from './globals';
import * as fetchers from './fetchers';

class UserData {
  constructor() {
    this.language = GLOBALS.languages.english;
    this.units = GLOBALS.units.si;
    this.location = 'Belarus';
    this.timeZone = '';
  }

  async downloadUserData() {
    try {
      this.localStorageData = JSON.parse(localStorage.getItem('fancy-weather-lhk'));
      this.ipData = await fetchers.getIPInfo(GLOBALS.apiKeys.ip);

      this.language = this.localStorageData.language || GLOBALS.languages.english;
      this.units = this.localStorageData.units || GLOBALS.units.si;
      this.location = `${this.ipData.city || ''} ${this.ipData.country || this.ipData.region}`;
    } catch (error) {
      console.log('downloadUserData:', error);
    }
  }

  uploadUserData() {
    this.localStorageData = {
      language: this.language,
      units: this.units,
    };

    localStorage.setItem('fancy-weather-lhk', JSON.stringify(this.localStorageData));
  }
}

export const settings = new UserData();
