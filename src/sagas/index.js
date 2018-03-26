import { fork } from 'redux-saga/effects';
import * as watcherProfileSaga from './watcher/watcherProfileSaga';
import * as watcherContactSaga from './watcher/watcherContactSaga';
import * as watcherMessageSaga from './watcher/watcherMessageSaga';
import * as watcherEventSaga from './watcher/watcherEventSaga';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
    yield fork(watcherProfileSaga.watchLogin);
    yield fork(watcherProfileSaga.watchGetProfile);
    yield fork(watcherProfileSaga.watchSubmitProfile);
    yield fork(watcherContactSaga.watchGetContacts);
    yield fork(watcherContactSaga.watchSubmitContact);
    yield fork(watcherContactSaga.watchDeleteContacts);
    yield fork(watcherMessageSaga.watchGetMessages);
    yield fork(watcherMessageSaga.watchSendMessage);
    yield fork(watcherMessageSaga.watchReadMessage);
    yield fork(watcherMessageSaga.watchDeleteMessage);
    yield fork(watcherEventSaga.watchGetEvents);
    yield fork(watcherEventSaga.watchSubmitEvent);
    yield fork(watcherEventSaga.watchDeleteEvent);
}