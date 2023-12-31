import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  base: '',
  plugins: [ react() ],
  server: {
    open: 'public/index.html'
  },
  build: {
    rollupOptions: {
      input: {
        app: 'public/index.html',
      },
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'maplibre-gl': ['maplibre-gl']
        }
      }
    }
  }
}));