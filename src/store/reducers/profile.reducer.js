import * as types from '../actionTypes';

const INITIAL_STATE = {
    profile: null,
    component: null
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGOUT:
            return {
                ...state,
                ...{ profile: null }
            };
        case types.LOGIN_SUCCESS:
        case types.GET_PROFILE_SUCCESS:
        case types.UPDATE_PROFILE:
        case types.SUBMIT_PROFILE_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, ...action.payload }
            };
        default:
            return state;
    }
}