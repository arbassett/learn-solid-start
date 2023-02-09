import { defineConfig } from 'vite';
import solidStart from 'solid-start/vite';
import devtools from 'solid-devtools/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig((env) => ({
  plugins: [
    solidStart({ ssr: true }),
    UnoCSS(),
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
    }),
  ],
}));
