import axios from "axios";

const authApi = axios.create({
  baseURL: "http://192.168.1.32:5001/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;