// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [ react(), tailwind( {
          nesting: true,

    })],
  vite: {
    define: {
      'process.env': process.env,
    },
  },
});
