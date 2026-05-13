import { createRouter, createWebHashHistory } from 'vue-router';

// PoC なので Hash モードを使用（サーバー設定不要）
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dev',
    },
    // ---- コンポーネントデモ ----
    {
      path: '/dev',
      name: 'DevIndex',
      component: () => import('@/pages/dev/DevIndex.vue'),
    },
    // ---- コンポーネントデモ（実装済み） ----
    {
      path: '/dev/app-button',
      name: 'AppButtonDemo',
      component: () => import('@/pages/dev/AppButtonDemo.vue'),
    },
    {
      path: '/dev/app-button-icon',
      name: 'AppButtonIconDemo',
      component: () => import('@/pages/dev/AppButtonIconDemo.vue'),
    },
    {
      path: '/dev/base-radio-input',
      name: 'BaseRadioInputDemo',
      component: () => import('@/pages/dev/BaseRadioInputDemo.vue'),
    },
    {
      path: '/dev/base-checkbox-input',
      name: 'BaseCheckboxInputDemo',
      component: () => import('@/pages/dev/BaseCheckboxInputDemo.vue'),
    },
    {
      path: '/dev/app-tag',
      name: 'AppTagDemo',
      component: () => import('@/pages/dev/AppTagDemo.vue'),
    },
    // TODO: コンポーネントを実装したらここにデモページのルートを追記する

    // ---- アプリケーションページ ----
    // TODO: 実装するページのルートをここに追記する
  ],
});

export default router;
