import { defineConfig } from 'vite';
import nuvshaPlugin from 'nuvsha/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    nuvshaPlugin(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    open: false
  }
});
