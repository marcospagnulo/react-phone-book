import React from 'react';
import ReactDOM from 'react-dom';
import { store, history } from './store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './layout/containers/app';
import './style/main.scss'

// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    <Provider store={store}>
        <Router history={history} >
            <App />
        </Router>
    </Provider>,

    document.getElementById('root')
);