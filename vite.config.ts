//@ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
//@ts-ignore
import path from 'path';

const config = {
  logLevel: 'info',
  plugins: [
    sveltekit(),
  ],
  optimizeDeps: {
    include: ['lottie-web', '@fullcalendar/common']
  },
  build: {
    outDir: 'build'
  },
  server: {
    fs: {
      strict: false,
      allow: ['../*']
    },
    port: 3000
  },
  preview: {
    port: 3000
  },
  resolve: {
    dedupe: ['@fullcalendar/common'],
    alias: {
      $src: path.resolve('src'),
      $apis: path.resolve('src/apis'),
      $static: path.resolve('static'),
      $components: path.resolve('src/components'),
      $lib: path.resolve('src/lib'),
      $routes: path.resolve('src/routes'),
      $widget: path.resolve('src/components/widgets'),
      $gen: path.resolve('/src/gen'),
      $stores: path.resolve('src/stores'),
      $types: path.resolve('src/types'),
      $utils: path.resolve('src/libs/utils')
    }
  }
};

export default config;
