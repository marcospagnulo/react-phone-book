import * as types from '../actionTypes';

const INITIAL_STATE = {
    event: null,
    events: [],
    component: null
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {

    if (state.component) {
        state.component.actionDispatched(action.type);
    }

    switch (action.type) {

        case types.REGISTER_EVENT_COMPONENT:
            return {
                ...state, component: action.payload
            }
        case types.SUBMIT_EVENT_SUCCESS:
        case types.SELECT_EVENT:
        case types.UPDATE_EVENT:
            return {
                ...state,
                event: { ...state.event, ...action.payload }
            }
        case types.GET_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload
            };
        case types.RESET_EVENT:
        case types.DELETE_EVENT_SUCCESS:
            return {
                ...state,
                event: null
            }
        default:
            return state;
    }
}