import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import banner from 'vite-plugin-banner';

// We could explore to create a npm package
// Here's an interesting link: https://www.bitovi.com/blog/react-everywhere-with-vite-and-react-to-webcomponent

export default defineConfig(() => ({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    banner(`NoFrixion Web Components - Version ${process.env.npm_package_version}`),
  ],
  build: {
    lib: {
      formats: ['es'], // We can also build for UMD adding 'umd' to the array
      entry: resolve(__dirname, 'out/index.ts'),
      name: 'web-components',
    },
  },
  define: {
    'process.env': `"${process.env}"`,
  },
}));
