import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppSnackbar from './AppSnackbar.vue'

const meta: Meta<typeof AppSnackbar> = {
  component: AppSnackbar,
  title: 'Atoms/AppSnackbar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'スナックバーコンポーネント（Atom）。',
          'Figma node-id: `2051:66855`（Snackbar）',
          '',
          '`type` prop で 4 種類のスタイルを切り替えます:',
          '- `success`: 緑系（背景 #ecfdf5・枠線 #34d399・アイコン circle-check）',
          '- `info`: 青系（背景 #f0f9ff・枠線 #0ea5e9・アイコン circle-info）',
          '- `warning`: オレンジ系（背景 #fff7ed・枠線 #fb923c・アイコン circle-exclamation）',
          '- `error`: 赤系（背景 #fef2f2・枠線 #f87171・アイコン triangle-exclamation）',
          '',
          '`title` は必須。`description` は省略可能で、指定するとタイトル下に説明文が表示されます。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'スナックバーの種類',
    },
    title: {
      control: 'text',
      description: 'タイトル',
    },
    description: {
      control: 'text',
      description: '説明文（省略可）',
    },
  },
  args: {
    type: 'success',
    title: 'タイトル',
    description: 'description here',
  },
}

export default meta
type Story = StoryObj<typeof AppSnackbar>

// --- 各 type バリアント ---

export const Success: Story = {
  name: 'Success（成功）',
  args: { type: 'success', title: '保存しました', description: '変更内容が正常に保存されました。' },
}

export const Info: Story = {
  name: 'Info（情報）',
  args: { type: 'info', title: '更新があります', description: '新しいバージョンが利用可能です。' },
}

export const Warning: Story = {
  name: 'Warning（警告）',
  args: { type: 'warning', title: '注意が必要です', description: 'この操作は元に戻せません。' },
}

export const Error: Story = {
  name: 'Error（エラー）',
  args: { type: 'error', title: 'エラーが発生しました', description: '入力内容を確認してください。' },
}

// --- description なし（タイトルのみ）---

export const TitleOnly: Story = {
  name: 'タイトルのみ（description なし）',
  args: { type: 'success', title: '保存しました' },
}

// --- 全バリアント横並びデモ ---

export const AllVariants: Story = {
  name: '全バリアント一覧',
  render: () => ({
    components: { AppSnackbar },
    template: `
      <div class="p-6 space-y-4 font-sans bg-slate-50">
        <AppSnackbar type="success" title="成功メッセージ" description="操作が正常に完了しました。" />
        <AppSnackbar type="info" title="情報メッセージ" description="新しい情報があります。" />
        <AppSnackbar type="warning" title="警告メッセージ" description="注意して操作してください。" />
        <AppSnackbar type="error" title="エラーメッセージ" description="問題が発生しました。再試行してください。" />
        <hr class="border-slate-200" />
        <p class="text-xs text-slate-500">タイトルのみ（description なし）</p>
        <AppSnackbar type="success" title="シンプルな成功通知" />
        <AppSnackbar type="error" title="シンプルなエラー通知" />
      </div>
    `,
  }),
}
