import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import Auth from "./store/reducers/authReducer";
import Survey from "./store/reducers/surveysreducer";

import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    authReducer: Auth,
    surveysReducer: Survey
});


// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
/* redux-thunk adds middleware to a project to make your action creators to not
 return the action itself but to return a function which will eventually dispatch an action
 and this is useful for asynchronous code */


ReactDOM.render(
  <BrowserRouter>
        <Provider store={store}>
       		 <App />
        </Provider>
    </BrowserRouter>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
