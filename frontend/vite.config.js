import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: 'all',
    hmr: {
      clientPort: 443
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/docs': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      '/openapi.json': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      '/redoc': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    global: 'globalThis',
  },
})