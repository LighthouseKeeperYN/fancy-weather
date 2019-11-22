export const languageButton = document.createElement('button');
languageButton.classList.add('button', 'button--language');
languageButton.innerText = 'EN';

const arrowDown = document.createElement('span');
arrowDown.classList.add('arrow-down');

languageButton.appendChild(arrowDown);