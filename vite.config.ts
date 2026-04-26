import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path matches the GitHub Pages repo subpath in production.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Drive-Now/' : '/',
  server: {
    port: 5173,
    open: true,
  },
}));
