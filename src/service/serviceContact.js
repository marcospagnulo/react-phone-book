import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

/* Contacts Service*/
export const getContacts = (userId) => {
    return axios.get(SERVICE_URL + "/contacts?userId=" + userId);
}

export const subimtContact = (payload) => {
    if (payload.contact.id) {
        return axios.put(SERVICE_URL + "/contacts/" + payload.contact.id, payload.contact);
    } else {
        return axios.post(SERVICE_URL + "/contacts", payload.contact);
    }
}

export const deleteContact = (id) => {
    return axios.delete(SERVICE_URL + "/contacts/" + id);
}