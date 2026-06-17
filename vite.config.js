import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'// 👈 Am adăugat importul pentru Tailwind
// https://vite.dev/config/

 // https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 Am activat pluginul Tailwind în listă
    
  ],
  base: '/jewelryShop/'
 
})