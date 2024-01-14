import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3500'
})

export const BASE_URL = 'http://localhost:3500';