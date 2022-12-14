// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    //set the main element to our code editor object
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    
    // future functionality for multiple files
    let textID = localStorage.getItem('id');

    // need to adjust below code for multiple files functionality
    if (textID != 1){
      textID = 1;
    }
    console.log('Text ID: '+ textID);

    //get the stored document and display it to editor.
    getDb(textID).then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // store the document in local storage during editing
    this.editor.on('change', () => {
      localStorage.setItem('id', 1);
      localStorage.setItem('content', this.editor.getValue());
    });


    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(parseInt(localStorage.getItem('id')), localStorage.getItem('content'));
    });
  }
}
