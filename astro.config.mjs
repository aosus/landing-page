// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://aosus.github.io',
  base: '/landing-page',
  vite: {
    plugins: [tailwindcss()]
  }
});
