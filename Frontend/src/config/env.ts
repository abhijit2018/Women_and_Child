/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_SOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const env = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_URL: import.meta.env.VITE_API_URL,
  APP_ENV: import.meta.env.VITE_APP_ENV,
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
};

export default env;