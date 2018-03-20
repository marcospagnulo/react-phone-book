import * as types from '../actionTypes';

export const registerMessagesComponent = (payload) => ({ type: types.REGISTER_MESSAGES_COMPONENT, payload });

export const getMessagesAction = (payload) => ({ type: types.GET_MESSAGES, payload });

export const selectMessageAction = (payload) => ({ type: types.SELECT_MESSAGE, payload });

export const updateMessageAction = (payload) => ({ type: types.UPDATE_MESSAGE, payload });

export const submitMessageAction = (payload) => ({ type: types.SUBMIT_MESSAGE, payload });

export const deleteMessageAction = (payload) => ({ type: types.DELETE_MESSAGE, payload });