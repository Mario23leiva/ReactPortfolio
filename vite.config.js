import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // Rutas relativas para que funcione en GitHub Pages con cualquier ruta base
  base: './',
  plugins: [react()],
})
