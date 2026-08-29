import { defineConfig } from 'vite';
import nuvshaPlugin from 'nuvsha/vite-plugin';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite configuration for a Nuvsha project.
 *
 * defineConfig() just gives you autocomplete if you use an editor like VS Code.
 * plugins: [nuvshaPlugin()] tells Vite: "whenever you see a .nuv file,
 * pass it through the Nuvsha compiler first."
 *
 * server.open: true automatically opens the browser when you run "npm run dev".
 */
export default defineConfig({
  plugins: [
    nuvshaPlugin(),
    tailwindcss()
  ],
  server: {
    open: true
  }
});
