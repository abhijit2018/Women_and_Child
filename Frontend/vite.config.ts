import path from "path";

import {
  defineConfig,
} from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(
        __dirname,
        "./src"
      ),
    },
  },

  server: {

    host: "0.0.0.0",

    port: 5173,

    proxy: {

      "/api": {
        target:
          "http://192.168.1.32:1091/",

        changeOrigin: true,
        secure: false,
      },
    },
  },
});