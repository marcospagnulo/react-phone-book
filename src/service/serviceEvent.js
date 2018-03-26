import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

/* events Service*/
export const getEvents = (userId) => {
    return axios.get(SERVICE_URL + "/events?userId=" + userId);
}

export const subimtEvent = (payload) => {
    if (payload.id) {
        return axios.put(SERVICE_URL + "/events/" + payload.id, payload);
    } else {
        return axios.post(SERVICE_URL + "/events", payload);
    }
}

export const deleteEvent = (id) => {
    return axios.delete(SERVICE_URL + "/events/" + id);
}