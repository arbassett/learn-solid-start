import { defineConfig } from 'vite';
import solidStart from 'solid-start/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig((env) => ({
  plugins: [solidStart(), UnoCSS()]
}));