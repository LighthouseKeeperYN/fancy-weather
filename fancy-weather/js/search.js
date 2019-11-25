import { dictionary } from './globals';
import { display } from './display';
import { settings } from './userData';

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

    this.recognitionButton = document.createElement('button');
    this.recognitionButton.classList.add('search-input__voice-button');
    this.recognitionButton.addEventListener('click', this.triggerVoiceSearchWithButton);

    this.recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
    this.recognition.interimResults = true;
    this.recognition.addEventListener('result', this.getTranscript);
    this.recognition.addEventListener('end', this.voiceInputToSearchField);

    this.transcript = '';
  }

  triggerVoiceSearchWithButton = () => {
    this.recognition.lang = settings.language;
    this.recognition.start();
    this.recognitionButton.style.display = 'none';
    this.field.placeholder = dictionary.voiceSearchPlaceholder[settings.language];
    this.field.disabled = true;
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
  }

  voiceInputToSearchField = () => {
    if (this.transcript.length) {
      this.field.value = this.transcript;
      this.processSearchQuery();
      this.field.placeholder = dictionary.searchPlaceholder[settings.language];
      this.recognitionButton.style.display = 'block';
      this.field.disabled = false;
    }
  }

  processSearchQuery = () => {
    settings.location = this.field.value;
    display.drawEverything();
    this.field.value = '';
    this.field.blur();
  }
}

export const search = new Search();
