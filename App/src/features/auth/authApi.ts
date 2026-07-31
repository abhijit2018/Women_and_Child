
import axios from "axios";

const BASE_URL = "https://your-api-url.com/api/v1";

export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
authApi.interceptors.request.use(
  async config => {
    // Example:
    // const token = await AsyncStorage.getItem("token");
    //
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
authApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized");
          break;

        case 403:
          console.log("Forbidden");
          break;

        case 500:
          console.log("Server Error");
          break;

        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);