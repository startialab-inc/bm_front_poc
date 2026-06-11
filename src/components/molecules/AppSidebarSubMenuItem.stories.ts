import type { Meta, StoryObj } from '@storybook/vue3'
import AppSidebarSubMenuItem from './AppSidebarSubMenuItem.vue'

const meta: Meta<typeof AppSidebarSubMenuItem> = {
  title: 'Molecules/AppSidebarSubMenuItem',
  component: AppSidebarSubMenuItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    current: { control: 'boolean' },
    notification: { control: 'text', description: '文字列・数値→テキスト付きバッジ、true→ドット通知（12×12px 円）、未指定・false・空文字→非表示' },
    notificationType: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AppSidebarSubMenuItem>

/** 通常状態（Default） */
export const Default: Story = {
  name: 'Default',
  args: {
    label: 'ページ一覧',
  },
}

/** 現在地状態（Current）: 内側コンテナが #e2e8f0 背景 */
export const CurrentStory: Story = {
  name: 'Current',
  args: {
    label: 'ページ一覧',
    current: true,
  },
}

/** RouterLink バージョン（to あり）: クリックでページ遷移 */
export const WithLink: Story = {
  name: 'WithLink',
  args: {
    label: 'ページ一覧',
    to: '/',
  },
}

/** 通知バッジあり（info・デフォルト） */
export const WithNotification: Story = {
  name: 'WithNotification',
  args: {
    label: 'ページ一覧',
    notification: '3',
  },
}

/** ドット通知（true を渡したとき、12×12px の円のみ表示） */
export const WithDotNotification: Story = {
  name: 'WithDotNotification',
  args: {
    label: 'ページ一覧',
    notification: true,
    notificationType: 'danger',
  },
}

/** 通知バッジ 全種別 */
export const NotificationTypes: Story = {
  name: 'NotificationTypes',
  render: () => ({
    components: { AppSidebarSubMenuItem },
    template: `
      <div class="flex flex-col gap-2 bg-gray-50 p-4">
        <p class="text-xs text-gray-500">info（デフォルト）</p>
        <AppSidebarSubMenuItem label="ページ一覧" notification="3" notificationType="info" />

        <p class="text-xs text-gray-500">success</p>
        <AppSidebarSubMenuItem label="新規作成" notification="5" notificationType="success" />

        <p class="text-xs text-gray-500">warning</p>
        <AppSidebarSubMenuItem label="設定" notification="12" notificationType="warning" />

        <p class="text-xs text-gray-500">danger</p>
        <AppSidebarSubMenuItem label="削除" notification="1" notificationType="danger" />
      </div>
    `,
  }),
}

/** 全状態一覧 */
export const AllVariants: Story = {
  name: 'AllVariants',
  render: () => ({
    components: { AppSidebarSubMenuItem },
    template: `
      <div class="flex flex-col gap-2 bg-gray-50 p-4">
        <p class="text-xs text-gray-500">Default</p>
        <AppSidebarSubMenuItem label="ページ一覧" />

        <p class="text-xs text-gray-500">Current</p>
        <AppSidebarSubMenuItem label="新規作成" :current="true" />

        <p class="text-xs text-gray-500">通知バッジあり（info）</p>
        <AppSidebarSubMenuItem label="設定" notification="3" />

        <p class="text-xs text-gray-500">通知バッジあり + Current</p>
        <AppSidebarSubMenuItem label="お知らせ" notification="99" :current="true" />

        <p class="text-xs text-gray-500">RouterLink（to あり）</p>
        <AppSidebarSubMenuItem label="設定" to="/" />

        <p class="text-xs text-gray-500">長いテキスト（省略）</p>
        <AppSidebarSubMenuItem label="とても長いメニューテキストが入力されたときに省略されることを確認するサンプル" />
      </div>
    `,
  }),
}

/** インタラクティブ（Controls で props を変更） */
export const Interactive: Story = {
  name: 'Interactive',
  args: {
    label: 'ページ一覧',
    current: false,
    notification: '',
    notificationType: 'info',
  },
}
