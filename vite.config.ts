import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // Vue + Tailwind プラグイン設定
  plugins: [
    vue(),
    tailwindcss(),
  ],

  // 開発サーバー設定
  server: {
    port: 8300, // TODO: 必要に応じてポート番号を変更
    open: 'http://localhost:8300/', // TODO: ポート番号を変更した場合はここも更新
    strictPort: true,
  },

  // プレビューサーバー設定（本番ビルド後の確認用）
  preview: {
    port: 8300,
    strictPort: true,
  },

  // ベースパス（サブディレクトリへのデプロイ時に必要）
  base: '/bm_front_componentlist/',

  // ビルド設定（Vue SPA 単一エントリー）
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: true,
  },

  // パス解決設定
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
