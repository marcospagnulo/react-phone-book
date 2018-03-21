import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

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