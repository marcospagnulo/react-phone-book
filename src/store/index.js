import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from '../sagas';

import createHistory from 'history/createHashHistory';

const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(
            rootReducer,
            window.devToolsExtension && true ? window.devToolsExtension() : f => f,
            applyMiddleware(sagaMiddleware),
        ),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};

// Create an enhanced history that syncs navigation events with the store
export const history = createHistory();// syncHistoryWithStore(browserHistory, configureStore());

export const store = configureStore();