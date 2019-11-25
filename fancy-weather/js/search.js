import { dictionary } from './globals';
import { display } from './display';
import { settings } from './userData';

// export function processSearchQuery() {
//   settings.location = searchInput.value;
//   display.drawEverything();
//   searchInput.value = '';
//   searchInput.blur();
// }

// export const searchInput = document.createElement('input');
// searchInput.classList.add('search-input');
// searchInput.type = 'search';
// searchInput.name = 'search-city';
// searchInput.required = true;
// searchInput.placeholder = dictionary.searchPlaceholder[settings.language];
// searchInput.addEventListener('keyup', (e) => {
//   if (e.key === 'Enter') processSearchQuery();
// });

// const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
// console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWW')
// export const recognition = new SpeechRecognition();
// recognition.interimResults = true;
// recognition.lang = settings.language;

// let transcript;

// recognition.addEventListener('result', function getTranscript(e) {
//   transcript = Array.from(e.results)
//     .map(result => result[0])
//     .map(result => result.transcript)
//     .join('');
//   console.log(transcript);
// });

// recognition.addEventListener('end', function inputToSearchField() {
//   searchInput.value = transcript;
//   processSearchQuery();
// });

class Search {
  constructor() {
    this.field = document.createElement('input');
    this.field.classList.add('search-input');
    this.field.type = 'search';
    this.field.name = 'search-city';
    this.field.required = true;
    this.field.placeholder = dictionary.searchPlaceholder[settings.language];

    this.button = document.createElement('button');
    this.button.classList.add('button', 'search-input__button');
    this.button.innerText = dictionary.search[settings.language];

    this.field.addEventListener('keyup', this.triggerSearchWithEnter);
    this.button.addEventListener('click', this.triggerSearchWithButton);


    // this.recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
    // this.recognition.interimResults = true;
    // this.recognition.lang = settings.language;
    // this.recognition.addEventListener('result', this.getTranscript);
    // this.recognition.addEventListener('end', this.fieldToSearchField);

    // this.transcript = '';
  }

  triggerSearchWithButton = () => {
    if (this.field.value.length !== 0) this.processSearchQuery();
  }

  triggerSearchWithEnter = (e) => {
    if (e.key === 'Enter' && this.field.value.length !== 0) this.processSearchQuery();
  }

  getTranscript = (e) => {
    this.transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    console.log(this.transcript);
  }

  inputToSearchField = () => {
    this.input.value = this.transcript;
    this.processSearchQuery();
  }

  processSearchQuery = () => {
    settings.location = this.field.value;
    display.drawEverything();
    this.field.value = '';
    this.field.blur();
  }
}

export const search = new Search();
