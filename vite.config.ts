import { resolve } from 'path';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import banner from 'vite-plugin-banner';
import { vitePlugin as utwm } from 'unplugin-tailwindcss-mangle';

const builtClassesPrefix = 'nf-wc-';

export default defineConfig({
  plugins: [
    react(),
    utwm({
      classGenerator: {
        classPrefix: builtClassesPrefix,
        customGenerate: (original, options) => {
          return options.classPrefix + original;
        },
      },
    }),
    cssInjectedByJsPlugin(),
    banner(`NoFrixion Web Components - Version ${process.env.npm_package_version}`),
  ],
  build: {
    minify: 'terser',
    lib: {
      formats: ['umd'], // We can also build for ES adding 'es' to the array
      entry: resolve(__dirname, 'src/index-webcomponents.ts'),
      name: 'web-components',
      fileName: () => `web-components.js`,
    },
  },
  define: {
    'process.env': `"${process.env}"`,
    builtClassesPrefix: `"${builtClassesPrefix}"`,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
