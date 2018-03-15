import * as types from '../actionTypes';

const INITIAL_STATE = {
    name: "",
    surname: "",
    address: "",
    mobile: "",
    email: "",
    password: ""
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_PROFILE_SUCCESS:
        case types.UPDATE_PROFILE:
        case types.SUBMIT_PROFILE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}