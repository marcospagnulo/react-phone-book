import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

/* Profile Service */
export const login = (loginForm) => {
    return axios.get(SERVICE_URL + "/profiles?username=" + loginForm.username + "&password=" + loginForm.password);
}

export const getUserProfile = () => {
    return axios.get(SERVICE_URL + "/profile");
}

export const submitUserProfile = (profile) => {
    return axios.put(SERVICE_URL + "/profiles/" + profile.id, profile);
}

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

/* Messages service */
export const getMessages = (userId) => {
    return axios.get(SERVICE_URL + "/messages?userId=" + userId);
}

export const sendMessage = (payload) => {
    return axios.post(SERVICE_URL + "/messages", payload);
}

export const readMessage = (payload) => {
    return axios.put(SERVICE_URL + "/messages/" + payload.id, payload);
}

export const deleteMessage = (id) => {
    return axios.delete(SERVICE_URL + "/messages/" + id);
}