import { defineConfig } from 'vite';
import solidStart from 'solid-start/vite';
import vercel from 'solid-start-vercel';
import devtools from 'solid-devtools/vite';
import UnoCSS from 'unocss/vite';

export default defineConfig((env) => ({
  plugins: [
    solidStart({ ssr: true, adapter: vercel({edge: false})}),
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
  ssr: {
    external: ['monaco-editor'],
  }
}));
