import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api/anthropic': 'http://localhost:8787',
      '/api/elevenlabs': 'http://localhost:8787',
      '/api/stt': 'http://localhost:8787',
      '/api/webhooks': 'http://localhost:8787'
    }
  }
});
