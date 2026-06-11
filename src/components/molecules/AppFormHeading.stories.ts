import type { Meta, StoryObj } from '@storybook/vue3'
import AppFormHeading from './AppFormHeading.vue'

const meta: Meta<typeof AppFormHeading> = {
  title: 'Molecules/AppFormHeading',
  component: AppFormHeading,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof AppFormHeading>

// タイトルのみ（説明文なし）
export const TitleOnly: Story = {
  name: 'タイトルのみ（説明文なし）',
  args: {
    title: '基本設定',
  },
}

// タイトル＋説明文あり
export const WithDescription: Story = {
  name: 'タイトル＋説明文あり',
  args: {
    title: '基本設定',
    description: '説明文が入ります',
  },
}

// 長い説明文
export const LongDescription: Story = {
  name: '長い説明文',
  args: {
    title: 'ページ公開設定',
    description: 'このセクションでは、ページの公開状態やスケジュールを設定できます。設定を変更した場合は必ず保存ボタンをクリックしてください。',
  },
}

// インタラクティブ（Controls で props を変更可能）
export const Interactive: Story = {
  name: 'インタラクティブ',
  args: {
    title: '基本設定',
    description: '説明文が入ります',
  },
}
