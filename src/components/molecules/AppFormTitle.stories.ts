import type { Meta, StoryObj } from '@storybook/vue3'
import AppFormTitle from './AppFormTitle.vue'

const meta: Meta<typeof AppFormTitle> = {
  title: 'Molecules/AppFormTitle',
  component: AppFormTitle,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'login'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AppFormTitle>

// 標準（アクセント縦線あり）
export const Default: Story = {
  name: '標準（アクセント縦線あり）',
  args: {
    title: 'ページ名',
    variant: 'default',
  },
}

// ログイン画面用（アクセント縦線なし）
export const LoginVariant: Story = {
  name: 'ログイン画面用（アクセント縦線なし）',
  args: {
    title: 'ログインID',
    variant: 'login',
  },
}

// 長いタイトル（nowrap 確認）
export const LongTitle: Story = {
  name: '長いタイトル（nowrap 確認）',
  args: {
    title: 'とても長いフォーム項目タイトルのサンプルテキスト',
    variant: 'default',
  },
}

// インタラクティブ（Controls で props を変更可能）
export const Interactive: Story = {
  name: 'インタラクティブ',
  args: {
    title: 'ページ名',
    variant: 'default',
  },
}
