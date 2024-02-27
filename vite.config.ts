import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/model-system/',
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'http://10.191.164.136:8005/chat',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chat/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
})
