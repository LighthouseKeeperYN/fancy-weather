class TimeFormatter {
  constructor(timeStamp, locale, timeZone) {
    this.date = new Date(timeStamp);
    this.locale = locale;
    this.timeZone = timeZone;
  }

  getDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'short', timeZone: this.timeZone }); }

  getFullDay() { return this.date.toLocaleDateString(this.locale, { weekday: 'long', timeZone: this.timeZone }); }

  getDate() { return this.date.toLocaleDateString(this.locale, { day: 'numeric', timeZone: this.timeZone }); }

  getMonth() { return this.date.toLocaleDateString(this.locale, { month: 'long', timeZone: this.timeZone }); }

  getTime() {
    return this.date.toLocaleDateString(this.locale, {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: this.timeZone
    })
    .split(' ')[1];
  }

  getHours() {
    return this.getTime().split(':')[0];
  }
}

timeFormatter = new TimeFormatter(new Date(), 'ru', 'Europe/Paris');

console.log(timeFormatter.getTime())

function generateKeywords(timezone) {
  const timeFormatter = new TimeFormatter(new Date(), 'ru', timezone);

  const month = timeFormatter.getMonth();
  const hours = timeFormatter.getHours();

  let timeOfTheDay;
  let timeOfTheYear;

  console.log(hours)

  if (month <= 2 || month === 11) timeOfTheYear = 'winter';
  else if (month > 2 && month <= 5) timeOfTheYear = 'spring';
  else if (month > 5 && month <= 8) timeOfTheYear = 'summer';
  else timeOfTheYear = 'autumn';

  if (hours > 4 && hours <= 10) timeOfTheDay = 'morning';
  else if (hours > 10 && hours <= 16) timeOfTheDay = 'day';
  else if (hours > 15 && hours <= 21) timeOfTheDay = 'evening';
  else timeOfTheDay = 'night';

  return [timeOfTheDay, timeOfTheYear];
}
let test = generateKeywords('Europe/Paris')

console.log(test)