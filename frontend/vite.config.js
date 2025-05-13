import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    proxy:{
      "/api":{
        target: "https://fast-temple-34808-1abd3fc375e5.herokuapp.com/", // for dev server http://localhost:5000/
        changeOrigin: true,
      }
    }
  }
});
