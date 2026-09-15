import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// 构建产物直接落进 Flask 的 static/app/，由后端托管；
// 生产环境不需要 Node，只有开发机和出包时需要。
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/static/app/',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    outDir: '../static/app',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    port: 5173,
    // 开发期把 /api 反代到 Flask，保证 session Cookie 与 CSRF 是同源的，
    // 否则跨源下登录态握手会对不上。
    proxy: {
      '/api': { target: 'http://127.0.0.1:8080', changeOrigin: false },
      '/hello': { target: 'http://127.0.0.1:8080', changeOrigin: false },
    },
  },
})
