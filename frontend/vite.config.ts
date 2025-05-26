import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '08fce044-cfda-4863-971b-b69d26c7a26d-00-19b59kd3rb6hz.spock.replit.dev',
      'hubb-assist-mono-fronteback-v1.replit.app',
      '.replit.app',
      '.spock.replit.dev'
    ],
    hmr: {
      port: 24678,
      host: '0.0.0.0'
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