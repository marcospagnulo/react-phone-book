import * as types from '../actionTypes';

export const registerProfileComponent = (payload) => ({
    type: types.REGISTER_PROFILE_COMPONENT, payload
});

export const loginAction = (payload) => ({
    type: types.LOGIN, payload
});

export const logoutAction = (payload) => ({
    type: types.LOGOUT, payload
});

export const getProfileAction = (payload) => ({
    type: types.GET_PROFILE, payload
});

export const updateProfileAction = (payload) => {
    return { type: types.UPDATE_PROFILE, payload }
};

export const submitProfileAction = (payload) => {
    return { type: types.SUBMIT_PROFILE, payload }
};