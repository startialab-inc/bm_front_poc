import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// vite.config.ts の設定（プラグイン・エイリアス等）を継承し、テスト設定を追加する
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// server/preview 設定を除外する:
// vite.config.ts の server.strictPort: true が Vitest の内部 Vite サーバーに継承されると、
// 開発サーバー起動中のポート競合により Vitest 初期化が失敗するため
const { server: _server, preview: _preview, ...viteConfigBase } = viteConfig as any

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default mergeConfig(viteConfigBase, defineConfig({
  test: {
    // カバレッジ設定（npm run test:coverage で実行）
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.vue'],
      reporter: ['text', 'html'],
      reportsDirectory: 'dist/coverage'
    },
    projects: [{
      extends: true,
      test: {
        // DOM 環境: happy-dom（jsdom より軽量、Vue エコシステムとの相性良好）
        environment: 'happy-dom',
        // テスト対象ファイル: コンポーネントと同階層の .spec.ts ファイル
        include: ['src/**/*.spec.ts']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
}));
