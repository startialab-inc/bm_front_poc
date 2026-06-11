import type { Meta, StoryObj } from '@storybook/vue3'
import AppSidebarMenuItem from './AppSidebarMenuItem.vue'

const meta: Meta<typeof AppSidebarMenuItem> = {
  title: 'Molecules/AppSidebarMenuItem',
  component: AppSidebarMenuItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    current: { control: 'boolean' },
    notification: { control: 'text', description: '文字列・数値→テキスト付きバッジ、true→ドット通知（12×12px 円）、未指定・false・空文字→非表示' },
    notificationType: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AppSidebarMenuItem>

/** sub-menu なし・リンクあり（通常のナビゲーションアイテム） */
export const WithoutSubMenu: Story = {
  name: 'WithoutSubMenu',
  args: {
    label: 'ダッシュボード',
    to: '/',
  },
}

/** current 状態（青背景・アクティブ） */
export const Current: Story = {
  name: 'Current',
  args: {
    label: 'ダッシュボード',
    current: true,
    to: '/',
  },
}

/** 通知バッジあり（success / デフォルト） */
export const WithNotification: Story = {
  name: 'WithNotification',
  args: {
    label: 'リード管理',
    notification: '3',
    notificationType: 'success',
    to: '/',
  },
}

/** ドット通知（true を渡したとき、12×12px の円のみ表示） */
export const WithDotNotification: Story = {
  name: 'WithDotNotification',
  args: {
    label: 'リード管理',
    notification: true,
    notificationType: 'danger',
    to: '/',
  },
}

/** 通知バッジ全種別 */
export const NotificationTypes: Story = {
  name: 'NotificationTypes',
  render: () => ({
    components: { AppSidebarMenuItem },
    template: `
      <div class="flex flex-col gap-2 bg-gray-50 p-4">
        <p class="text-xs text-gray-500">info</p>
        <AppSidebarMenuItem label="リード管理" notification="1" notificationType="info" to="/" />
        <p class="text-xs text-gray-500">success（デフォルト）</p>
        <AppSidebarMenuItem label="リード管理" notification="3" notificationType="success" to="/" />
        <p class="text-xs text-gray-500">warning</p>
        <AppSidebarMenuItem label="リード管理" notification="12" notificationType="warning" to="/" />
        <p class="text-xs text-gray-500">danger</p>
        <AppSidebarMenuItem label="リード管理" notification="99" notificationType="danger" to="/" />
      </div>
    `,
  }),
}

/** sub-menu あり（展開/閉じ込みトグル） */
export const WithSubMenu: Story = {
  name: 'WithSubMenu',
  args: {
    label: 'ページ管理',
  },
  render: (args) => ({
    components: { AppSidebarMenuItem },
    setup: () => ({ args }),
    template: `
      <AppSidebarMenuItem v-bind="args">
        <div class="flex flex-col gap-1 px-3 py-2">
          <p class="text-sm text-gray-600">サブメニュー項目 1</p>
          <p class="text-sm text-gray-600">サブメニュー項目 2</p>
          <p class="text-sm text-gray-600">サブメニュー項目 3</p>
        </div>
      </AppSidebarMenuItem>
    `,
  }),
}

/** sub-menu あり + current 状態（初期展開済み） */
export const WithSubMenuCurrent: Story = {
  name: 'WithSubMenuCurrent',
  args: {
    label: 'ページ管理',
    current: true,
  },
  render: (args) => ({
    components: { AppSidebarMenuItem },
    setup: () => ({ args }),
    template: `
      <AppSidebarMenuItem v-bind="args">
        <div class="flex flex-col gap-1 px-3 py-2">
          <p class="text-sm text-gray-600">サブメニュー項目 1</p>
          <p class="text-sm text-gray-600">サブメニュー項目 2</p>
        </div>
      </AppSidebarMenuItem>
    `,
  }),
}

/** 全バリアント一覧 */
export const AllVariants: Story = {
  name: 'AllVariants',
  render: () => ({
    components: { AppSidebarMenuItem },
    template: `
      <div class="flex flex-col gap-2 bg-gray-50 p-4">
        <p class="text-xs text-gray-500">sub-menu なし（Default）</p>
        <AppSidebarMenuItem label="ダッシュボード" to="/" />

        <p class="text-xs text-gray-500">sub-menu なし（Current）</p>
        <AppSidebarMenuItem label="ダッシュボード" :current="true" to="/" />

        <p class="text-xs text-gray-500">通知バッジあり</p>
        <AppSidebarMenuItem label="リード管理" notification="3" to="/" />

        <p class="text-xs text-gray-500">sub-menu あり（折りたたみ）</p>
        <AppSidebarMenuItem label="ページ管理">
          <div class="flex flex-col gap-1 px-3 py-2">
            <p class="text-sm text-gray-600">サブメニュー項目 1</p>
            <p class="text-sm text-gray-600">サブメニュー項目 2</p>
          </div>
        </AppSidebarMenuItem>
      </div>
    `,
  }),
}
