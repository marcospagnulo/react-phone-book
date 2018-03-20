import * as types from '../actionTypes';

const INITIAL_STATE = {
    message: null,
    messages: [],
    component: null
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {

    if (state.component) {
        state.component.actionDispatched(action.type);
    }

    switch (action.type) {

        case types.REGISTER_MESSAGES_COMPONENT:
            return {
                ...state, component: action.payload
            }
        case types.READ_MESSAGE_SUCCESS:
        case types.SELECT_MESSAGE:
            return {
                ...state,
                message: { ...state.MESSAGE, ...action.payload }
            }
        case types.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload
            };
        case types.DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
}