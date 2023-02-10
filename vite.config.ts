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
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
}));
