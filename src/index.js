import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppReducers from './reducers'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import './index.css';
import Home from './Container/Home';
import * as serviceWorker from './serviceWorker';

let middleware = [
    thunk,
];
let store = createStore(AppReducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)));


ReactDOM.render( <Provider store={store}>
    <Home />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
