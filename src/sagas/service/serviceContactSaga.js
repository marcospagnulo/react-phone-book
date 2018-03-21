import { put, call } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import * as service from '../../service/serviceContact'

export function* getContacts({ payload }) {
    try {
        const response = yield call(service.getContacts, payload);
        yield put({ type: types.GET_CONTACTS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.GET_CONTACTS_ERROR, error });
    }
}

export function* submitContactSaga({ payload }) {
    try {
        const response = yield call(service.subimtContact, payload);
        yield put({ type: types.SUBMIT_CONTACT_SUCCESS, payload: response.data });
        yield put({ type: types.GET_CONTACTS, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.SUBMIT_CONTACT_ERROR, error });
    }
}

export function* deleteContactSaga({ payload }) {
    try {
        const response = yield call(service.deleteContact, payload.contactId);
        yield put({ type: types.DELETE_CONTACT_SUCCESS, payload: response.data });
        yield put({ type: types.GET_CONTACTS, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.DELETE_CONTACT_ERROR, error });
    }
}