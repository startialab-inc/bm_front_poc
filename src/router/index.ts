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
    {
      path: '/dev/app-switch',
      name: 'AppSwitchDemo',
      component: () => import('@/pages/dev/AppSwitchDemo.vue'),
    },
    {
      path: '/dev/app-tooltip',
      name: 'AppTooltipDemo',
      component: () => import('@/pages/dev/AppTooltipDemo.vue'),
    },
    {
      path: '/dev/app-badge-status',
      name: 'AppBadgeStatusDemo',
      component: () => import('@/pages/dev/AppBadgeStatusDemo.vue'),
    },
    {
      path: '/dev/app-badge-icon',
      name: 'AppBadgeIconDemo',
      component: () => import('@/pages/dev/AppBadgeIconDemo.vue'),
    },
    {
      path: '/dev/app-count-badge',
      name: 'AppCountBadgeDemo',
      component: () => import('@/pages/dev/AppCountBadgeDemo.vue'),
    },
    {
      path: '/dev/app-tag-badge',
      name: 'AppTagBadgeDemo',
      component: () => import('@/pages/dev/AppTagBadgeDemo.vue'),
    },
    {
      path: '/dev/app-segment-control-item',
      name: 'AppSegmentControlItemDemo',
      component: () => import('@/pages/dev/AppSegmentControlItemDemo.vue'),
    },
    {
      path: '/dev/app-tab-item',
      name: 'AppTabItemDemo',
      component: () => import('@/pages/dev/AppTabItemDemo.vue'),
    },
    {
      path: '/dev/app-pager-number',
      name: 'AppPagerNumberDemo',
      component: () => import('@/pages/dev/AppPagerNumberDemo.vue'),
    },
    {
      path: '/dev/app-progress-bar',
      name: 'AppProgressBarDemo',
      component: () => import('@/pages/dev/AppProgressBarDemo.vue'),
    },
    {
      path: '/dev/app-password-strength',
      name: 'AppPasswordStrengthDemo',
      component: () => import('@/pages/dev/AppPasswordStrengthDemo.vue'),
    },
    {
      path: '/dev/app-menu-icon',
      name: 'AppMenuIconDemo',
      component: () => import('@/pages/dev/AppMenuIconDemo.vue'),
    },
    {
      path: '/dev/app-snackbar',
      name: 'AppSnackbarDemo',
      component: () => import('@/pages/dev/AppSnackbarDemo.vue'),
    },
    // TODO: コンポーネントを実装したらここにデモページのルートを追記する

    // ---- アプリケーションページ ----
    // TODO: 実装するページのルートをここに追記する
  ],
});

export default router;
