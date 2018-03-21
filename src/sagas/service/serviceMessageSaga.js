import { put, call } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import * as service from '../../service/serviceMessage'

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