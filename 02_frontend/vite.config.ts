import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/oneonone-management/', // GitHub Pages用のベースパス
  server: {
    host: true,	// サーバーがリッスンするホストアドレスを指定
    port: 5173,	// 開発サーバーが使用するポート番号
  },
})