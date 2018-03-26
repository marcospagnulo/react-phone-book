import { takeLatest } from 'redux-saga/effects';
import * as eventSaga from '../service/serviceEventSaga';
import * as types from '../../store/actionTypes';

// SAVE EVENT watcher
export function* watchSubmitEvent() {
    yield takeLatest(types.SUBMIT_EVENT, eventSaga.submitEventSaga);
}

// GET EVENTS watcher
export function* watchGetEvents() {
    yield takeLatest(types.GET_EVENTS, eventSaga.getEventsSaga);
}

// DELETE EVENTS watcher
export function* watchDeleteEvent() {
    yield takeLatest(types.DELETE_EVENT, eventSaga.deleteEventSaga);
}