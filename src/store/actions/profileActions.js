import * as types from '../actionTypes';

export const getProfileAction = (payload) => ({type: types.GET_PROFILE, payload});

export const updateProfileAction = (payload) => {
    return {type: types.UPDATE_PROFILE, payload}
};

export const submitProfileAction = (payload) => {
    return {type: types.SUBMIT_PROFILE, payload}
};