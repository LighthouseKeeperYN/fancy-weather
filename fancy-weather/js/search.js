import { display } from './display';
import * as GLOBALS from './globals';
import { settings } from './userData';

class Search {
  constructor() {
    this.field = document.createElement('input');
    this.field.classList.add('search-input');
    this.field.type = 'search';
    this.field.name = 'search-city';
    this.field.required = true;
    this.field.placeholder = GLOBALS.dictionary.searchPlaceholder[settings.language];

    this.button = document.createElement('button');
    this.button.classList.add('button', 'search-input__button');
    this.button.innerText = GLOBALS.dictionary.search[settings.language];

    this.recognitionButton = document.createElement('button');
    this.recognitionButton.classList.add('search-input__voice-button');

    this.recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
    this.recognition.interimResults = true;

    this.field.addEventListener('keyup', this.processSearchWithEnter);
    this.button.addEventListener('click', this.processSearchWithButton);
    this.recognitionButton.addEventListener('click', this.triggerVoiceSearch);
    this.recognition.addEventListener('result', this.getTranscript);
    this.recognition.addEventListener('end', this.processVoiceSearch);

    this.transcript = '';
  }

  triggerVoiceSearch = () => {
    this.field.value = '';
    this.field.classList.remove('search-field-error');
    this.field.disabled = true;
    this.button.disabled = true;

    this.recognition.lang = settings.language;
    this.recognition.start();
    this.recognitionButton.style.display = 'none';

    this.field.placeholder = GLOBALS.dictionary.voiceSearchPlaceholder[settings.language];
  }

  processSearchWithButton = () => {
    if ((this.field.value.length > 1) && /^[\p{Letter}\d]+$/u.test(this.field.value)) {
      this.processSearchQuery();
    } else this.throwError();
  }

  processSearchWithEnter = (e) => {
    if (e.key === 'Enter' && this.field.value.length !== 0) this.processSearchQuery();
  }

  getTranscript = (e) => {
    this.transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
  }

  processVoiceSearch = () => {
    if ((this.transcript.length > 1) && /^[\p{Letter}\d]+$/u.test(this.transcript)) {
      this.field.value = this.transcript;
      this.processSearchQuery();
    } else {
      if (this.transcript.length === 0) {
        this.field.placeholder = GLOBALS.dictionary.searchPlaceholder[settings.language];
      } else {
        this.throwError();
      }
    }

    this.recognitionButton.style.display = 'block';
    this.field.disabled = false;
    this.button.disabled = false;
  }

  throwError = () => {
    this.field.classList.add('search-field-error');
    this.field.placeholder = GLOBALS.dictionary.searchError[settings.language];
    this.field.value = '';
    this.field.blur();
  }

  processSearchQuery = () => {
    this.field.classList.remove('search-field-error');
    settings.location = this.field.value;
    display.drawEverything();
    this.field.value = '';
    this.field.placeholder = '';
    this.field.blur();
  }
}

export const search = new Search();
