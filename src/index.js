import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.countRender = 0;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, document.getElementById('root'));