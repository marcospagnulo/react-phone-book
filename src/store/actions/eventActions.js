import * as types from '../actionTypes';

export const registerEventComponent = (payload) => ({ type: types.REGISTER_EVENTS_COMPONENT, payload });

export const getEventsAction = (payload) => ({ type: types.GET_EVENTS, payload });

export const selectEventAction = (payload) => ({ type: types.SELECT_EVENT, payload });

export const updateEventAction = (payload) => ({ type: types.UPDATE_EVENT, payload });

export const submitEventAction = (payload) => ({ type: types.SUBMIT_EVENT, payload });

export const deleteEventAction = (payload) => ({ type: types.DELETE_EVENT, payload });

export const resetEventAction = () => ({ type: types.RESET_EVENT });