// import { resolve } from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// import banner from 'vite-plugin-banner';

// // We could explore to create a npm package
// // Here's an interesting link: https://www.bitovi.com/blog/react-everywhere-with-vite-and-react-to-webcomponent

// export default defineConfig(() => ({
//   plugins: [
//     react(),
//     cssInjectedByJsPlugin(),
//     banner(`NoFrixion Web Components - Version ${process.env.npm_package_version}`),
//   ],
//   build: {
//     minify: 'terser',
//     lib: {
//       formats: ['umd'], // We can also build for ES adding 'es' to the array
//       entry: resolve(__dirname, 'out/index.ts'),
//       name: 'web-components',
//     },
//   },
//   define: {
//     'process.env': `"${process.env}"`,
//   },
// }));

import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index-react.ts'),
      name: 'NoFrixionComponents',
      formats: ['es', 'umd'],
      fileName: (format) => `nofrixion-components.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
