import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
      },
    },
    // Optimizaciones
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Separar CSS
    cssCodeSplit: true,
    // Tamaño de chunk
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  preview: {
    port: 8080,
    open: true,
  },
});
