import { fork } from 'redux-saga/effects';
import * as watcherSaga from './watcher';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
    yield fork(watcherSaga.watchGetProfile);
    yield fork(watcherSaga.watchSubmitProfile);
    yield fork(watcherSaga.watchGetContacts);
    yield fork(watcherSaga.watchSubmitContact);
    yield fork(watcherSaga.watchDeleteContacts);
}