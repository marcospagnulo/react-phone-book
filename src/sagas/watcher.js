import { takeLatest } from 'redux-saga/effects';
import * as saga from './serviceSaga';
import * as types from '../store/actionTypes';

// LOGIN watcher
export function* watchLogin() {
    yield takeLatest(types.LOGIN, saga.loginSaga);
}

// GET PROFILE watcher
export function* watchGetProfile() {
    yield takeLatest(types.GET_PROFILE, saga.getProfileSaga);
}

// UPDATE PROFILE watcher
export function* watchSubmitProfile() {
    yield takeLatest(types.SUBMIT_PROFILE, saga.submitProfileSaga);
}

// SAVE CONTACT watcher
export function* watchSubmitContact() {
    yield takeLatest(types.SUBMIT_CONTACT, saga.submitContactSaga);
}

// GET CONTACTS watcher
export function* watchGetContacts() {
    yield takeLatest(types.GET_CONTACTS, saga.getContacts);
}

// DELETE CONTACTS watcher
export function* watchDeleteContacts() {
    yield takeLatest(types.DELETE_CONTACT, saga.deleteContactSaga);
}

// GET MESSAGES watcher
export function* watchGetMessages() {
    yield takeLatest(types.GET_MESSAGES, saga.getMessages);
}