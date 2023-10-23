import axios from "axios";


export const appAxios = axios.create({
    baseURL: "https://hotels-italy-backend.vercel.app",
    headers: { "Content-Type": "application/json", shop_id: "test", sessionToken: localStorage.getItem('token')},
    withCredentials: true,
});