import { fork } from 'redux-saga/effects';
import * as watcherSaga from './watcher';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
    yield fork(watcherSaga.watchLogin);
    yield fork(watcherSaga.watchGetProfile);
    yield fork(watcherSaga.watchSubmitProfile);
    yield fork(watcherSaga.watchGetContacts);
    yield fork(watcherSaga.watchSubmitContact);
    yield fork(watcherSaga.watchDeleteContacts);
    yield fork(watcherSaga.watchGetMessages);
    yield fork(watcherSaga.watchSendMessage);
    yield fork(watcherSaga.watchReadMessage);
    yield fork(watcherSaga.watchDeleteMessage);
}