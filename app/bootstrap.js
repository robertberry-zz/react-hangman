import React from 'react';
import ReactDOM from 'react-dom';
import {Hangman} from './components.jsx!';

const containerElement = document.getElementById('container');

ReactDOM.render(
  React.createElement(Hangman, {
    word: "banana"
  }),
  containerElement
);
