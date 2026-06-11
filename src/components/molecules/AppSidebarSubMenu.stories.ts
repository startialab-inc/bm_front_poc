import type { Meta, StoryObj } from '@storybook/vue3'
import AppSidebarSubMenu from './AppSidebarSubMenu.vue'
import AppSidebarSubMenuItem from './AppSidebarSubMenuItem.vue'
import AppSidebarMenuItem from './AppSidebarMenuItem.vue'

const meta: Meta<typeof AppSidebarSubMenu> = {
  title: 'Molecules/AppSidebarSubMenu',
  component: AppSidebarSubMenu,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['inline', 'popup'],
      description: '表示タイプ（inline: AppSidebarMenuItem スロット内 / popup: 浮き出し）',
    },
    standalone: {
      control: 'boolean',
      description: '単体使用モード（inline type 専用: true にすると自前でボーダーを表示）',
    },
  },
  args: {
    type: 'inline',
    standalone: false,
  },
}

export default meta
type Story = StoryObj<typeof AppSidebarSubMenu>

/** inline type（AppSidebarMenuItem スロット内を再現） */
export const InlineDefault: Story = {
  name: 'InlineDefault',
  render: (args) => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem, AppSidebarMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="background: #f1f5f9; padding: 16px;">
        <p style="font-size:12px; color:#6b7280; margin-bottom:8px;">AppSidebarMenuItem スロット内での使用例</p>
        <AppSidebarMenuItem label="ページ管理" :current="true">
          <AppSidebarSubMenu v-bind="args">
            <AppSidebarSubMenuItem label="ページ一覧" />
            <AppSidebarSubMenuItem label="新規作成" />
            <AppSidebarSubMenuItem label="設定" current />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>
      </div>
    `,
  }),
}

/** inline type（単体 + 左縦ボーダーを自前表示） */
export const InlineStandalone: Story = {
  name: 'InlineStandalone',
  render: () => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem },
    template: `
      <div style="background: #f1f5f9; padding: 16px;">
        <p style="font-size:12px; color:#6b7280; margin-bottom:8px;">standalone=true: AppSidebarMenuItem 外での単体使用例</p>
        <AppSidebarSubMenu type="inline" :standalone="true">
          <AppSidebarSubMenuItem label="ページ一覧" />
          <AppSidebarSubMenuItem label="新規作成" />
          <AppSidebarSubMenuItem label="設定" current />
        </AppSidebarSubMenu>
      </div>
    `,
  }),
}

/** popup type（白背景 + drop-shadow） */
export const Popup: Story = {
  name: 'Popup',
  render: () => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem },
    template: `
      <div style="background: #e2e8f0; padding: 32px;">
        <p style="font-size:12px; color:#6b7280; margin-bottom:16px;">popup type: 白背景 + drop-shadow（アイコンモード時のポップアップを想定）</p>
        <AppSidebarSubMenu type="popup">
          <AppSidebarSubMenuItem label="ページ一覧" />
          <AppSidebarSubMenuItem label="新規作成" />
          <AppSidebarSubMenuItem label="設定" />
        </AppSidebarSubMenu>
      </div>
    `,
  }),
}

/** current=true のアイテムを含むパターン */
export const WithCurrentItem: Story = {
  name: 'WithCurrentItem',
  render: () => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem, AppSidebarMenuItem },
    template: `
      <div style="background: #f1f5f9; padding: 16px; display: flex; gap: 32px; align-items: flex-start;">
        <div>
          <p style="font-size:12px; color:#6b7280; margin-bottom:8px;">inline（AppSidebarMenuItem 内）</p>
          <AppSidebarMenuItem label="コンテンツ管理" :current="true">
            <AppSidebarSubMenu>
              <AppSidebarSubMenuItem label="記事一覧" current />
              <AppSidebarSubMenuItem label="カテゴリ" />
              <AppSidebarSubMenuItem label="タグ" />
            </AppSidebarSubMenu>
          </AppSidebarMenuItem>
        </div>
        <div>
          <p style="font-size:12px; color:#6b7280; margin-bottom:8px;">popup</p>
          <AppSidebarSubMenu type="popup">
            <AppSidebarSubMenuItem label="記事一覧" current />
            <AppSidebarSubMenuItem label="カテゴリ" />
            <AppSidebarSubMenuItem label="タグ" />
          </AppSidebarSubMenu>
        </div>
      </div>
    `,
  }),
}

/** AppSidebarMenuItem スロット内に挿入した完全な組み合わせ */
export const InSidebarMenuItem: Story = {
  name: 'InSidebarMenuItem',
  render: () => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem, AppSidebarMenuItem },
    template: `
      <div style="background: #f1f5f9; padding: 16px; display: flex; flex-direction: column; gap: 8px;">
        <p style="font-size:12px; color:#6b7280; margin-bottom:4px;">AppSidebarMenuItem + AppSidebarSubMenu の組み合わせ例</p>
        <AppSidebarMenuItem label="ページ管理">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="ページ一覧" />
            <AppSidebarSubMenuItem label="新規作成" />
            <AppSidebarSubMenuItem label="設定" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>
        <AppSidebarMenuItem label="コンテンツ管理" :current="true">
          <AppSidebarSubMenu>
            <AppSidebarSubMenuItem label="記事一覧" current />
            <AppSidebarSubMenuItem label="カテゴリ" />
          </AppSidebarSubMenu>
        </AppSidebarMenuItem>
        <AppSidebarMenuItem label="ダッシュボード" to="/" />
      </div>
    `,
  }),
}

/** 全バリアントを並べた比較ビュー */
export const AllVariants: Story = {
  name: 'AllVariants',
  render: () => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem, AppSidebarMenuItem },
    template: `
      <div style="background: #e2e8f0; padding: 24px; display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap;">
        <div>
          <p style="font-size:12px; color:#6b7280; margin-bottom:8px; font-weight:600;">inline（AppSidebarMenuItem 内）</p>
          <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
            <AppSidebarMenuItem label="メニュー項目" :current="true">
              <AppSidebarSubMenu>
                <AppSidebarSubMenuItem label="サブ項目 1" current />
                <AppSidebarSubMenuItem label="サブ項目 2" />
                <AppSidebarSubMenuItem label="サブ項目 3" />
              </AppSidebarSubMenu>
            </AppSidebarMenuItem>
          </div>
        </div>
        <div>
          <p style="font-size:12px; color:#6b7280; margin-bottom:8px; font-weight:600;">inline（standalone=true）</p>
          <div style="background: #f1f5f9; padding: 8px; border-radius: 8px;">
            <AppSidebarSubMenu type="inline" :standalone="true">
              <AppSidebarSubMenuItem label="サブ項目 1" current />
              <AppSidebarSubMenuItem label="サブ項目 2" />
              <AppSidebarSubMenuItem label="サブ項目 3" />
            </AppSidebarSubMenu>
          </div>
        </div>
        <div>
          <p style="font-size:12px; color:#6b7280; margin-bottom:8px; font-weight:600;">popup</p>
          <AppSidebarSubMenu type="popup">
            <AppSidebarSubMenuItem label="サブ項目 1" current />
            <AppSidebarSubMenuItem label="サブ項目 2" />
            <AppSidebarSubMenuItem label="サブ項目 3" />
          </AppSidebarSubMenu>
        </div>
      </div>
    `,
  }),
}

/** Controls で type / standalone をリアルタイム変更 */
export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { AppSidebarSubMenu, AppSidebarSubMenuItem },
    setup() {
      return { args }
    },
    template: `
      <div style="background: #e2e8f0; padding: 32px; min-height: 200px;">
        <AppSidebarSubMenu v-bind="args">
          <AppSidebarSubMenuItem label="サブ項目 1" current />
          <AppSidebarSubMenuItem label="サブ項目 2" />
          <AppSidebarSubMenuItem label="サブ項目 3" />
        </AppSidebarSubMenu>
      </div>
    `,
  }),
  args: {
    type: 'inline',
    standalone: true,
  },
}
