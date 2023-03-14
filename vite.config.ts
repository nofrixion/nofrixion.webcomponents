import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// We could explore to create a npm package
// Here's an interesting link: https://www.bitovi.com/blog/react-everywhere-with-vite-and-react-to-webcomponent

export default defineConfig(() => ({
  plugins: [react()],
  build: {
    lib: {
      formats: ['es'], // We can also build for UMD adding 'umd' to the array
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'web-components',
    },
  },
  define: {
    'process.env': `"${process.env}"`,
  },
}));
