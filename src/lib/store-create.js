import reducers from '../reducers';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';
import { createStore, applyMiddleware } from 'redux';

export default createStore(reducers, applyMiddleware(thunk, reporter));
