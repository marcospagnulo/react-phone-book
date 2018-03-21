import { takeLatest } from 'redux-saga/effects';
import * as contactSaga from '../service/serviceContactSaga';
import * as profileSaga from '../service/serviceProfileSaga';
import * as messageSaga from '../service/serviceMessageSaga';
import * as types from '../../store/actionTypes';

// LOGIN watcher
export function* watchLogin() {
    yield takeLatest(types.LOGIN, profileSaga.loginSaga);
}

// GET PROFILE watcher
export function* watchGetProfile() {
    yield takeLatest(types.GET_PROFILE, profileSaga.getProfileSaga);
}

// UPDATE PROFILE watcher
export function* watchSubmitProfile() {
    yield takeLatest(types.SUBMIT_PROFILE, profileSaga.submitProfileSaga);
}

// SAVE CONTACT watcher
export function* watchSubmitContact() {
    yield takeLatest(types.SUBMIT_CONTACT, contactSaga.submitContactSaga);
}

// GET CONTACTS watcher
export function* watchGetContacts() {
    yield takeLatest(types.GET_CONTACTS, contactSaga.getContacts);
}

// DELETE CONTACTS watcher
export function* watchDeleteContacts() {
    yield takeLatest(types.DELETE_CONTACT, contactSaga.deleteContactSaga);
}

// SAVE MESSAGE watcher
export function* watchSendMessage() {
    yield takeLatest(types.SEND_MESSAGE, messageSaga.sendMessageSaga);
}

export function* watchReadMessage() {
    yield takeLatest(types.READ_MESSAGE, messageSaga.readMessageSaga);
}

// GET MESSAGE watcher
export function* watchGetMessages() {
    yield takeLatest(types.GET_MESSAGES, messageSaga.getMessagesSaga);
}

// DELETE MESSAGE watcher
export function* watchDeleteMessage() {
    yield takeLatest(types.DELETE_MESSAGE, messageSaga.deleteMessageSaga);
}