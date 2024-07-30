import Axios from "axios";

// const baseUrl = 'http://localhost:4000/';
const baseUrl = 'https://javashal.tech';

export const heroService = Axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
}); 