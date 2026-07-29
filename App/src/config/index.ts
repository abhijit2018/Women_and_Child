const Config = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    process.env.EXPO_PUBLIC_API_URL ??
    "http://192.168.1.32:5001/api/v1",
};

export default Config;