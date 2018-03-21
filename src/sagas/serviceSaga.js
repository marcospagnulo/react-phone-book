import { put, call } from 'redux-saga/effects';
import * as types from '../store/actionTypes';
import * as service from '../service/service'

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

export function* getProfileSaga({ payload }) {
    try {
        const response = yield call(service.getUserProfile, payload);
        yield put({ type: types.GET_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.GET_PROFILE_ERROR, error });
    }
}

export function* loginSaga({ payload }) {
    try {
        const response = yield call(service.login, payload);
        if (response.data.length > 0) {
            yield put({ type: types.LOGIN_SUCCESS, payload: response.data[0] });
        } else {
            yield put({ type: types.LOGIN_ERROR, payload: null });
        }
    } catch (error) {
        yield put({ type: types.LOGIN_ERROR, error });
    }
}

export function* submitProfileSaga({ payload }) {
    try {
        const response = yield call(service.submitUserProfile, payload);
        yield put({ type: types.SUBMIT_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.SUBMIT_PROFILE_ERROR, error });
    }
}

export function* getMessagesSaga({ payload }) {
    try {
        const response = yield call(service.getMessages, payload);
        yield put({ type: types.GET_MESSAGES_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.GET_MESSAGES_ERROR, error });
    }
}

export function* sendMessageSaga({ payload }) {
    try {
        const response = yield call(service.sendMessage, payload);
        yield put({ type: types.SEND_MESSAGE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.SEND_MESSAGE_ERROR, error });
    }
}

export function* readMessageSaga({ payload }) {
    try {
        const response = yield call(service.readMessage, payload);
        yield put({ type: types.READ_MESSAGE_SUCCESS, payload: response.data });
        yield put({ type: types.GET_MESSAGES, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.SEND_MESSAGE_ERROR, error });
    }
}

export function* deleteMessageSaga({ payload }) {
    try {
        const response = yield call(service.deleteMessage, payload.messageId);
        yield put({ type: types.DELETE_MESSAGE_SUCCESS, payload: response.data });
        yield put({ type: types.GET_MESSAGES, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.DELETE_MESSAGE_ERROR, error });
    }
}