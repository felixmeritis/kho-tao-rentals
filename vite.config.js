import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// Vite configuration - think of this as the "blueprint" for how our app gets built
// Like telling a construction crew how to assemble our building blocks
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: true
  }
})