import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default axiosClient;