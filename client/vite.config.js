import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'TrafficSetu',
        short_name: 'TrafficSetu',
        description:
          'Citizen Traffic Grievance and Public Safety Response Platform',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: []
      }
    })
  ]
})