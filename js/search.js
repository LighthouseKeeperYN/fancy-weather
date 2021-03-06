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

    this.field.addEventListener('keyup', this.cancelWithEsc);
    this.field.addEventListener('keyup', this.processSearchWithEnter);
    this.button.addEventListener('click', this.processSearchWithButton);
    this.recognitionButton.addEventListener('click', this.triggerVoiceSearch);
    this.recognition.addEventListener('result', this.getTranscript);
    this.recognition.addEventListener('end', this.processVoiceSearch);

    this.transcript = '';
  }

  cleanSearchField = () => {
    this.field.value = '';
    this.field.blur();
    this.field.classList.remove('search-field-error');
    this.recognition.stop();
    this.field.placeholder = GLOBALS.dictionary.searchPlaceholder[settings.language];
  }

  cancelWithEsc = (e) => {
    if (e.key === 'Escape') {
      this.cleanSearchField();
    }
  }

  cancelWithClick = (e) => {
    if (e.target !== this.field && e.target !== this.recognitionButton) {
      this.cleanSearchField();
    }
  }

  throwError = () => {
    this.cleanSearchField();
    this.field.classList.add('search-field-error');
    this.field.placeholder = GLOBALS.dictionary.searchError[settings.language];
  }

  triggerVoiceSearch = () => {
    window.addEventListener('keyup', this.cancelWithEsc);
    window.addEventListener('click', this.cancelWithClick);

    this.button.classList.add('disabled');
    this.recognitionButton.style.display = 'none';
    this.button.disabled = true;
    this.cleanSearchField();
    this.field.placeholder = GLOBALS.dictionary.voiceSearchPlaceholder[settings.language];
    this.field.disabled = true;

    this.recognition.lang = settings.language;
    this.recognition.start();
  }

  getTranscript = (e) => {
    this.transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
  }

  processVoiceSearch = () => {
    if ((this.transcript.length > 1) && /^[\p{Letter}\d]+$/u.test(this.transcript)) {
      this.processSearchQuery(this.transcript);
    } else if (this.transcript.length === 0) {
      this.field.placeholder = GLOBALS.dictionary.searchPlaceholder[settings.language];
    } else this.throwError();

    window.removeEventListener('keyup', this.cancelWithEsc);
    window.removeEventListener('click', this.cancelWithClick);

    this.button.classList.remove('disabled');
    this.recognitionButton.style.display = 'block';
    this.button.disabled = false;
    this.field.disabled = false;
  }

  processSearchQuery = (query) => {
    this.cleanSearchField();
    settings.location = query;

    display.drawEverything();
  }

  processSearchWithButton = () => {
    if ((this.field.value.length > 1) && /^[\p{Letter}\d]+$/u.test(this.field.value)) {
      this.processSearchQuery(this.field.value);
    } else this.throwError();
  }

  processSearchWithEnter = (e) => {
    if (e.key === 'Enter' && this.field.value.length !== 0) {
      this.processSearchQuery(this.field.value);
    }
  }
}

export const search = new Search();
