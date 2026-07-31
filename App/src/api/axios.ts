import axios from "axios";

const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL ??
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "http://192.168.1.32:5001/api/v1";

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: Number(process.env.EXPO_PUBLIC_TIMEOUT ?? 30000),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;