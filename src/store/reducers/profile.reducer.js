import * as types from '../actionTypes';

const INITIAL_STATE = {
    profile: localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null,
    component: null
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {

    if (state.component) {
        state.component.actionDispatched(action.type);
    }

    switch (action.type) {

        case types.REGISTER_PROFILE_COMPONENT:
            return {
                ...state, component: action.payload
            }
        case types.LOGOUT:
            localStorage.removeItem("profile");
            return {
                ...state,
                ...{ profile: null }
            };
        case types.LOGIN_SUCCESS:
        case types.SUBMIT_PROFILE_SUCCESS:
            const profile = { ...state.profile, ...action.payload };
            localStorage.setItem("profile", JSON.stringify(profile));
            return {
                ...state,
                profile: profile
            };
        case types.GET_PROFILE_SUCCESS:
        case types.UPDATE_PROFILE:
            return {
                ...state,
                profile: { ...state.profile, ...action.payload }
            };
        default:
            return state;
    }
}