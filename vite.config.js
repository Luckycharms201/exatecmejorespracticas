import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Escuchar en todas las interfaces (IPv4 + IPv6). Por defecto Vite a veces
  // sólo quedaba en IPv6 ([::1]) y `localhost` (que resuelve a 127.0.0.1) no
  // cargaba. `host: true` lo hace accesible en 127.0.0.1 y en la red local.
  server: {
    host: true,
  },
})
