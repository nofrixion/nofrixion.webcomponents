import { resolve } from 'path';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import banner from 'vite-plugin-banner';

// We could explore to create a npm package
// Here's an interesting link: https://www.bitovi.com/blog/react-everywhere-with-vite-and-react-to-webcomponent

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    banner(`NoFrixion Web Components - Version ${process.env.npm_package_version}`),
  ],
  build: {
    minify: 'terser',
    lib: {
      formats: ['umd'], // We can also build for ES adding 'es' to the array
      entry: resolve(__dirname, 'out/index-webcomponents.ts'),
      name: 'web-components',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'axios', '@tanstack/react-query', '@nofrixion/moneymoov'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          '@tanstack/react-query': '@tanstack/react-query',
          '@nofrixion/moneymoov': '@nofrixion/moneymoov',
        },
      },
    },
  },
  define: {
    'process.env': `"${process.env}"`,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
