import Axios from "axios";

// const baseUrl = 'http://localhost:4000/';
const baseUrl = 'http://3.25.85.88/';

export const heroService = Axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
});