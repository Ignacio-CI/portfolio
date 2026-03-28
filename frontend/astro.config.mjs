// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  },

  integrations: [svelte(), icon()],

  vite: {
    plugins: [
      // @ts-expect-error - Mismatch between Astro's Vite version and @tailwindcss/vite
      tailwindcss()
    ]
  }
});