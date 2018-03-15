import * as types from '../actionTypes';

const INITIAL_STATE = {
    contact: null,
    contacts: [],
    component: null
};

// Handles image related actions
export default function (state = INITIAL_STATE, action) {

    if (state.component) {
        state.component.actionDispatched(action.type);
    }

    switch (action.type) {

        case types.REGISTER_CONTACT_COMPONENT:
            return {
                ...state, component: action.payload
            }
        case types.SUBMIT_CONTACT_SUCCESS:
        case types.SELECT_CONTACT:
        case types.UPDATE_CONTACT:
            return {
                ...state,
                contact: { ...state.contact, ...action.payload }
            }
        case types.GET_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.payload
            };
        case types.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                contact: null
            }
        default:
            return state;
    }
}