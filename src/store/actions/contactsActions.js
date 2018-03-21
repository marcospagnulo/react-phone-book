import * as types from '../actionTypes';

export const registerContactComponent = (payload) => ({ type: types.REGISTER_CONTACTS_COMPONENT, payload });

export const getContactsAction = (payload) => ({ type: types.GET_CONTACTS, payload });

export const selectContactAction = (payload) => ({ type: types.SELECT_CONTACT, payload });

export const updateContactAction = (payload) => ({ type: types.UPDATE_CONTACT, payload });

export const submitContactAction = (payload) => ({ type: types.SUBMIT_CONTACT, payload });

export const deleteContactAction = (payload) => ({ type: types.DELETE_CONTACT, payload });

export const resetContactAction = () => ({ type: types.RESET_CONTACT });