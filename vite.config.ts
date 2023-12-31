import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
    build: {
        outDir: 'dist',
        assetsDir: './assets',
        copyPublicDir: true,
        
    },
    publicDir: './src/assets'
})