import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

export const getUserProfile = () => {
    return axios.get(SERVICE_URL + "/profile");
}

export const submitUserProfile = (profile) => {
    return axios.post(SERVICE_URL + "/profile", profile);
}

export const getContacts = () => {
    return axios.get(SERVICE_URL + "/contacts");
}

export const subimtContact = (contact) => {
    if (contact.id) {
        return axios.put(SERVICE_URL + "/contacts/" + contact.id, contact);
    } else {
        return axios.post(SERVICE_URL + "/contacts", contact);
    }
}

export const deleteContact = (id) => {
    return axios.delete(SERVICE_URL + "/contacts/" + id);
}