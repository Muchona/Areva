
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
 base: '/Areva-Automation/'Ensures assets load correctly from muchona.github.io/areva-automation/
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Cleaner production build
    target: 'esnext',
    minify: 'esbuild'
  }
});
