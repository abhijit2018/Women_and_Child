import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    // Do not ship source maps in production builds — avoids leaking
    // original source structure/comments to the public bundle.
    sourcemap: false,
    outDir: 'dist',
  },
});
