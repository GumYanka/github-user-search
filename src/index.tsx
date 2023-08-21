import React from 'react';
import ReactDOM from 'react-dom';
import { GitHubProvider } from './context/GitHubContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <GitHubProvider>
    <App />
  </GitHubProvider>,
  document.getElementById('root')
);

reportWebVitals();