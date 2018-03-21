import { put, call } from 'redux-saga/effects';
import * as types from '../../store/actionTypes';
import * as service from '../../service/serviceProfile'

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
            yield put({ type: types.GET_MESSAGES, payload: response.data[0].id })
            yield put({ type: types.GET_CONTACTS, payload: response.data[0].id })
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