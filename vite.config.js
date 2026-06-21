import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'// 👈 importul pentru Tailwind

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Am activat pluginul Tailwind
    
  ],
  base: '/jewelryShop/'
 
})