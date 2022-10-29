import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

//get the area that we'll be modifying
const main = document.querySelector('#main');
main.innerHTML = '';

//spinner element for loading documents
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// editor instance from our Editor class
const editor = new Editor();

// editor checking for CodeMirror 
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
