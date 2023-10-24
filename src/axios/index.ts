import axios from "axios";

// const baseURL = "http://localhost:8080"
const baseURL = "https://hotels-italy-backend.vercel.app"

export const appAxios = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json", shop_id: "test", sessionToken: localStorage.getItem('token')},
    withCredentials: true,
});