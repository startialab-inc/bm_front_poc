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
    {
      path: '/dev/app-logo',
      name: 'AppLogoDemo',
      component: () => import('@/pages/dev/AppLogoDemo.vue'),
    },
    {
      path: '/dev/app-left-menu-icon',
      name: 'AppLeftMenuIconDemo',
      component: () => import('@/pages/dev/AppLeftMenuIconDemo.vue'),
    },
    {
      path: '/dev/app-contact',
      name: 'AppContactDemo',
      component: () => import('@/pages/dev/AppContactDemo.vue'),
    },
    // ---- Molecules デモ ----
    {
      path: '/dev/app-radio-button',
      name: 'AppRadioButtonDemo',
      component: () => import('@/pages/dev/AppRadioButtonDemo.vue'),
    },
    {
      path: '/dev/app-checkbox',
      name: 'AppCheckboxDemo',
      component: () => import('@/pages/dev/AppCheckboxDemo.vue'),
    },
    {
      path: '/dev/app-segment-control',
      name: 'AppSegmentControlDemo',
      component: () => import('@/pages/dev/AppSegmentControlDemo.vue'),
    },
    {
      path: '/dev/app-tab',
      name: 'AppTabDemo',
      component: () => import('@/pages/dev/AppTabDemo.vue'),
    },
    {
      path: '/dev/base-control-label',
      name: 'BaseControlLabelDemo',
      component: () => import('@/pages/dev/BaseControlLabelDemo.vue'),
    },
    {
      path: '/dev/app-switch-label',
      name: 'AppSwitchLabelDemo',
      component: () => import('@/pages/dev/AppSwitchLabelDemo.vue'),
    },
    {
      path: '/dev/app-pagination',
      name: 'AppPaginationDemo',
      component: () => import('@/pages/dev/AppPaginationDemo.vue'),
    },
    {
      path: '/dev/app-form-heading',
      name: 'AppFormHeadingDemo',
      component: () => import('@/pages/dev/AppFormHeadingDemo.vue'),
    },
    {
      path: '/dev/app-form-title',
      name: 'AppFormTitleDemo',
      component: () => import('@/pages/dev/AppFormTitleDemo.vue'),
    },
    {
      path: '/dev/app-sidebar-menu-item',
      name: 'AppSidebarMenuItemDemo',
      component: () => import('@/pages/dev/AppSidebarMenuItemDemo.vue'),
    },
    {
      path: '/dev/app-sidebar-sub-menu-item',
      name: 'AppSidebarSubMenuItemDemo',
      component: () => import('@/pages/dev/AppSidebarSubMenuItemDemo.vue'),
    },
    {
      path: '/dev/app-sidebar-sub-menu',
      name: 'AppSidebarSubMenuDemo',
      component: () => import('@/pages/dev/AppSidebarSubMenuDemo.vue'),
    },
    {
      path: '/dev/app-image-selector',
      name: 'AppImageSelectorDemo',
      component: () => import('@/pages/dev/AppImageSelectorDemo.vue'),
    },
    {
      path: '/dev/app-contact-item-type',
      name: 'AppContactItemTypeDemo',
      component: () => import('@/pages/dev/AppContactItemTypeDemo.vue'),
    },
    {
      path: '/dev/app-confirm-section',
      name: 'AppConfirmSectionDemo',
      component: () => import('@/pages/dev/AppConfirmSectionDemo.vue'),
    },
    {
      path: '/dev/app-page-setting-status',
      name: 'AppPageSettingStatusDemo',
      component: () => import('@/pages/dev/AppPageSettingStatusDemo.vue'),
    },
    {
      path: '/dev/app-favorite-block',
      name: 'AppFavoriteBlockDemo',
      component: () => import('@/pages/dev/AppFavoriteBlockDemo.vue'),
    },
    {
      path: '/dev/app-block-edit-menu-cell',
      name: 'AppBlockEditMenuCellDemo',
      component: () => import('@/pages/dev/AppBlockEditMenuCellDemo.vue'),
    },
    {
      path: '/dev/app-block-edit-menu',
      name: 'AppBlockEditMenuDemo',
      component: () => import('@/pages/dev/AppBlockEditMenuDemo.vue'),
    },
    {
      path: '/dev/app-modal-footer',
      name: 'AppModalFooterDemo',
      component: () => import('@/pages/dev/AppModalFooterDemo.vue'),
    },
    // TODO: コンポーネントを実装したらここにデモページのルートを追記する

    // ---- アプリケーションページ ----
    // TODO: 実装するページのルートをここに追記する
  ],
});

export default router;
