export class TimeFormatter {
  constructor(timeStamp = new Date(), locale = 'en', timeZone) {
    this.date = new Date(timeStamp);
    this.locale = locale;
    this.timeZone = timeZone;
    this.weekBe = {
      short: {
        mon: 'пн',
        tue: 'аў',
        wed: 'ср',
        thu: 'чц',
        fri: 'пт',
        sat: 'сб',
        sun: 'нз',
      },
      full: {
        monday: 'панядзелак',
        tuesday: 'аўторак',
        wednesday: 'серада',
        thursday: 'чацвер',
        friday: 'пятніца',
        saturday: 'субота',
        sunday: 'нядзеля',
      },
    };
  }

  getDay() {
    if (this.locale.toLowerCase() === 'be') {
      const enDay = this.date.toLocaleDateString('en', { weekday: 'short', timeZone: this.timeZone });
      return this.weekBe.short[enDay.toLowerCase()];
    }

    return this.date.toLocaleDateString(this.locale, { weekday: 'short', timeZone: this.timeZone });
  }

  getFullDay() {
    if (this.locale.toLowerCase() === 'be') {
      const enFullDay = this.date.toLocaleDateString('en', { weekday: 'long', timeZone: this.timeZone });
      return this.weekBe.full[enFullDay.toLowerCase()];
    }

    return this.date.toLocaleDateString(this.locale, { weekday: 'long', timeZone: this.timeZone });
  }

  getDate() { return this.date.toLocaleDateString(this.locale, { day: 'numeric', timeZone: this.timeZone }); }

  getMonth() { return this.date.toLocaleDateString(this.locale, { month: 'long', timeZone: this.timeZone }); }

  getTime() {
    return this.date.toLocaleDateString('ru', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: this.timeZone,
    })
      .split(' ')[1];
  }

  getHours() {
    return this.getTime().split(':')[0];
  }
}

class ImageApiKeySwitcher {
  constructor() {
    this.counter = 0;
    this.keys = [
      '9ffe44f80e9a5ea908c596de07f24b01145a79018daa172974cc961a79583a87',
      '83dfa940e6a660199c7e7b4bf33902c1f04fc8e958272bd4308dcec97db1bfc3',
      'b51e5fc2fbb6592944435068a0affe25e1ed28d747e8eaa81aac6f4c1edbf958',
      'fb054b49efafb4854192d38db3d87f1b4211c2567587b8e3307614e8efda79ea',
      'be9086c1bfd0184c596f85c05a39b58ada493c74d450982fcac8e0a158e3e139',
      'c39f7b7054728fbe1182c24abe50486c3b6e09c849fca3ecbb0b3800739af880',
      'ca999b90665246999a446def90692123897b8dbf2be71b2f6792a2d2222de873',
      '265194590fc47c0b078386361fe497ea5c31d56d34ccf9bd1e0330fa4383df91',
    ];
    this.currentKey = this.keys[0];
  }

  updateKey() {
    this.counter++;
    this.currentKey = this.keys[this.counter % this.keys.length];

    return this.currentKey;
  }

  getKey() {
    return this.currentKey;
  }
}
export const imageApiKeySwitcher = new ImageApiKeySwitcher();

export function decimalToDegrees(decimal) {
  const splitted = decimal.toString().split('.');
  const result = { degrees: splitted[0] };
  result.minutes = splitted[1] === undefined ? '0'
    : Math.round(Math.abs((decimal - Number(splitted[0]))) * 60).toString();
  return result;
}

export const bgImageTemplate = {
  template:
    ['linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center fixed, url(',
      ') no-repeat center center fixed',
    ],

  getString(url) {
    return this.template[0] + url + this.template[1];
  },
};

export function generateKeywords(month, hours) {
  let timeOfTheDay;
  let timeOfTheYear;

  if (month <= 2 || month === 11) timeOfTheYear = 'winter';
  else if (month > 2 && month <= 5) timeOfTheYear = 'spring';
  else if (month > 5 && month <= 8) timeOfTheYear = 'summer';
  else timeOfTheYear = 'autumn';

  if (hours > 4 && hours <= 10) timeOfTheDay = 'morning';
  else if (hours > 10 && hours <= 16) timeOfTheDay = 'day';
  else if (hours > 15 && hours <= 21) timeOfTheDay = 'evening';
  else timeOfTheDay = 'night';

  return [timeOfTheYear, timeOfTheDay];
}

export function triggerAnimation(el) {
  el.style.animation = 'none';
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight;
  el.style.animation = null;
}
