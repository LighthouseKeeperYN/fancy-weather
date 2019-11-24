export class TimeFormater {
  constructor(timeStamp, locale) {
    this.date = new Date(timeStamp);
    this.locale = locale;
  }

  getDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'short' }); }

  getFullDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'long' }); }

  getDate() { return this.date.getDate(); }

  getMonth() { return this.date.toLocaleDateString(this.locale, { month: 'long' }); }

  getTime() { return this.date.toTimeString().split(' ')[0].slice(0, 5); }
}

class ImageApiKeySwitcher {
  constructor() {
    this.counter = 4;
    this.keys = [
      'be9086c1bfd0184c596f85c05a39b58ada493c74d450982fcac8e0a158e3e139',
      'c39f7b7054728fbe1182c24abe50486c3b6e09c849fca3ecbb0b3800739af880',
      'ca999b90665246999a446def90692123897b8dbf2be71b2f6792a2d2222de873',
      '265194590fc47c0b078386361fe497ea5c31d56d34ccf9bd1e0330fa4383df91',
    ];
    this.currentKey = this.keys[0];
  }

  updateKey() {
    this.counter++;
    this.currentKey = this.keys[this.counter % 4];

    return this.currentKey;
  }

  getKey() {
    return this.currentKey;
  }
}
export const imageApiKeySwitcher = new ImageApiKeySwitcher();

export function decimalToDegrees(decimal) {
  const splitted = decimal.toString().split('.');
  return {
    degrees: splitted[0],
    minutes: (splitted[1] / 60).toString(),
  };
}

export const bgImageTemplate = {
  template: ['linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url(',
    ') no-repeat center center fixed',
  ],

  getString(url) {
    return this.template[0] + url + this.template[1];
  },
};
