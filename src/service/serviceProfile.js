import axios from 'axios';
const SERVICE_URL = "http://localhost:3001"

/* Profile Service */
export const login = (loginForm) => {
    return axios.get(SERVICE_URL + "/profiles?email=" + loginForm.username + "&password=" + loginForm.password);
}

export const getUserProfile = () => {
    return axios.get(SERVICE_URL + "/profile");
}

export const submitUserProfile = (profile) => {
    return axios.put(SERVICE_URL + "/profiles/" + profile.id, profile);
}