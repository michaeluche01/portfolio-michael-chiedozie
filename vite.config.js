import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/portfolio-michael-chiedozie/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Lets component .scss files do: @use 'variables' as *;
        // without needing relative paths like ../../styles/variables
        loadPaths: [path.resolve(__dirname, 'src/styles')],
      },
    },
  },
  resolve: {
    alias: {
      '@':            path.resolve(__dirname, 'src'),
      '@components':  path.resolve(__dirname, 'src/components'),
      '@styles':      path.resolve(__dirname, 'src/styles'),
      '@data':        path.resolve(__dirname, 'src/data'),
      '@assets':      path.resolve(__dirname, 'src/assets'),
    },
  },
});
