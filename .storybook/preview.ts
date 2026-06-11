import '../src/assets/main.css';
import type { Preview } from '@storybook/vue3-vite';
import i18n from '../src/locales/index';
import { createRouter, createMemoryHistory } from 'vue-router';

// @storybook/vue3 の renderToCanvas は PLUGINS_SETUP_FUNCTIONS に登録された関数を
// Vue app 生成後に呼び出す（runSetupFunctions）。
// i18n・vue-router プラグインをここで登録することで各 hook が Storybook 上でも動作する。
// （import { setup } from '@storybook/vue3-vite' を使うと他ストーリーが壊れるため直接操作する）
const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: {} }],
});
;(globalThis as Record<string, unknown>).PLUGINS_SETUP_FUNCTIONS ??= new Set<(app: { use: (p: unknown) => void }) => void>()
;((globalThis as Record<string, unknown>).PLUGINS_SETUP_FUNCTIONS as Set<(app: { use: (p: unknown) => void }) => void>).add((app) => app.use(i18n))
;((globalThis as Record<string, unknown>).PLUGINS_SETUP_FUNCTIONS as Set<(app: { use: (p: unknown) => void }) => void>).add((app) => app.use(router))

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'gray', value: '#F0F0F0' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
