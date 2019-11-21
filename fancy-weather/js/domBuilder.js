import { updateButton } from './updateButton';

const buttonCluster = document.createElement('div');
buttonCluster.classList.add('button-cluster')
buttonCluster.appendChild(updateButton);

document.body.appendChild(buttonCluster);