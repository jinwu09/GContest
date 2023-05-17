import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    injectRegister: 'auto',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Quiger',
        short_name: 'Quiger',
        description: 'Quiger: Real Time Quiz Application for Gordon College - College of Computer Studies',
        theme_color: '#ffffff',
        icons: [
          {
            src: './pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: './pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          
        ]
        
      },
      workbox: {
        cleanupOutdatedCaches: true, 
        sourcemap: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          }
        ] 
      },
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
