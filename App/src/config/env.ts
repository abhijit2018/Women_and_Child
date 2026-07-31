export const ENV = {
  APP_NAME: process.env.EXPO_PUBLIC_API_APP_NAME ?? "React Native Starter",

  API_URL:
    process.env.EXPO_PUBLIC_API_URL ??
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    "http://192.168.1.32:5001/api/v1",

  TIMEOUT: Number(process.env.EXPO_PUBLIC_TIMEOUT ?? 30000),

  NODE_ENV: process.env.NODE_ENV ?? "development",
};