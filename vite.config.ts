import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: 'my-nofrixion-lib',
      entry: 'src/web-components/main.tsx',
    }
  },
  define: {
    // 'process.env': { NODE_ENV: 'production' }
    'process.env': `"${process.env}"`
  },
  plugins: [react()],
})
