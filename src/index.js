import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './lib/store-create';
import history from './lib/history.js';
import { Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/base.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
