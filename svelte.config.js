import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.html'],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      fallback: 'error.html',
      edge: true,
      split: false,
    }),
  }
};

export default config;
