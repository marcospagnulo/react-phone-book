import { takeLatest } from 'redux-saga/effects';
import * as contactSaga from '../service/serviceContactSaga';
import * as types from '../../store/actionTypes';

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