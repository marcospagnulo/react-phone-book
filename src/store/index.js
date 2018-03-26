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

export const history = createHistory();

export const store = configureStore();