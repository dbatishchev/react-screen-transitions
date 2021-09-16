import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import SpotifyAPI from './services/SpotifyAPI';
import App from './components/App/App';

let token = localStorage.getItem('token');

if (!token || token === 'null') {
  const hash = window.location.hash.substring(1);
  const params = {};

  hash.split('&').forEach((hk) => {
    const [k, v] = hk.split('=');
    params[k] = v;
  });

  token = params.access_token;

  if (token) {
    localStorage.setItem('token', token);
  }

  if (!token) {
    SpotifyAPI.redirectToAuthPage();
  }
}

ReactDOM.render((
  <Router>
    <App token={token} />
  </Router>
), document.getElementById('root'));
