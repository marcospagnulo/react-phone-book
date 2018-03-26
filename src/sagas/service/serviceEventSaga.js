import { put, call } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import * as service from '../../service/serviceEvent';

export function* getEventsSaga({ payload }) {
    try {
        const response = yield call(service.getEvents, payload);
        yield put({ type: types.GET_EVENTS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.GET_EVENTS_ERROR, error });
    }
}

export function* submitEventSaga({ payload }) {
    try {
        const response = yield call(service.subimtEvent, payload);
        yield put({ type: types.SUBMIT_EVENT_SUCCESS, payload: response.data });
        yield put({ type: types.GET_EVENTS, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.SUBMIT_EVENT_ERROR, error });
    }
}

export function* deleteEventSaga({ payload }) {
    try {
        const response = yield call(service.deleteEvent, payload.eventId);
        yield put({ type: types.DELETE_EVENT_SUCCESS, payload: response.data });
        yield put({ type: types.GET_EVENTS, payload: payload.userId })
    } catch (error) {
        yield put({ type: types.DELETE_EVENT_ERROR, error });
    }
}