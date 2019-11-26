import * as GLOBALS from './globals';
import * as utilities from './utilities';
import { settings } from './userData';

class Ticker {
  constructor() {
    this.tickerWrapper = document.createElement('div');
    this.tickerWrapper.classList.add('ticker-wrapper');

    this.ticker = document.createElement('div');
    this.ticker.classList.add('ticker');

    this.tickerWrapper.appendChild(this.ticker);

    this.itemCollection = [];
  }

  createTickerItem = (content) => {
    const tickerItem = document.createElement('p');
    tickerItem.classList.add('ticker__item');
    tickerItem.innerText = content;

    this.itemCollection.push(tickerItem);
  }

  createItemSet = (dayData) => {
    const dayTime = new utilities.TimeFormatter(
      dayData.time * 1000, settings.language,
    );
    let fullDay = dayTime.getFullDay();
    fullDay = fullDay[0].toUpperCase() + fullDay.slice(1);

    this.createTickerItem('');
    this.createTickerItem(`${fullDay} :`);
    this.createTickerItem(`${Math.round(dayData.temperatureLow)}° - ${Math.round(dayData.temperatureHigh)}°`);
    this.createTickerItem(dayData.summary.slice(0, -1));
    this.createTickerItem(
      `${GLOBALS.dictionary.wind[settings.language]}: ${Math.round(dayData.windSpeed)} ${settings.units === 'si' ? GLOBALS.dictionary.speed.si[settings.language] : GLOBALS.dictionary.speed.us[settings.language]}`
    );
    this.createTickerItem(
      `${GLOBALS.dictionary.humidity[settings.language]}: ${Math.round(dayData.humidity * 100)}%`
    );
    this.createTickerItem('');
  }

  createTickerContent = (weekData) => {
    for (let i = 1; i < 8; i++) {
      this.createItemSet(weekData[i]);
    }
  }

  drawTicker = (weatherData) => {
    this.ticker.innerHTML = ''

    this.createTickerContent(weatherData.daily.data);
    this.itemCollection.forEach(item => this.ticker.appendChild(item));
    this.itemCollection = [];

  }
}

export const ticker = new Ticker();
