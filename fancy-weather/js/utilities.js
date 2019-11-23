export class FormatTime {
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
