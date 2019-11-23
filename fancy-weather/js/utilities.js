export class ConvertTime {
  constructor(timeStamp, locale) {
    this.date = new Date(timeStamp);
    this.locale = locale;
  }

  getDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'short' }); }

  getFullDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'long' }); }

  getDate() { return this.date.getDate(); }

  getMonth() { return this.date.toLocaleDateString(this.locale, { month: 'long' }); }

  getTime() { return this.date.toLocaleDateString({ hourCycle: 'h24', hour: '2-digit', minute: '2-digit' }).slice(-5); }
}
