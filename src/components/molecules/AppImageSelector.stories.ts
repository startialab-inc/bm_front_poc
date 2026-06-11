import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppImageSelector from './AppImageSelector.vue'

const meta: Meta<typeof AppImageSelector> = {
  component: AppImageSelector,
  title: 'Molecules/AppImageSelector',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '画像の選択・プレビュー・変更・削除を行うコンポーネント。\n\n未選択状態（`modelValue = null`）では「画像を選択」ボタンを表示。\n選択済み状態（`modelValue` に URL）ではプレビューと「画像を変更」「画像を削除」ボタンを表示する。\n\n`@select` で選択した `File` を、`@delete` で削除イベントを親に通知する。',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppImageSelector>

// =====================================================
// 未選択状態
// =====================================================

export const Unselect: Story = {
  name: '未選択状態（画像を選択ボタン表示）',
  args: {
    modelValue: null,
  },
}

// =====================================================
// 選択済み状態
// =====================================================

export const Selected: Story = {
  name: '選択済み状態（プレビュー＋変更・削除ボタン）',
  args: {
    modelValue: 'https://placehold.co/920x523/e2e8f0/64748b?text=Image+Preview',
  },
}

// =====================================================
// インタラクティブ（Controls で切り替え可能）
// =====================================================

export const Interactive: Story = {
  name: 'インタラクティブ（Controls で URL を変更）',
  args: {
    modelValue: null,
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: '選択済み画像の URL（null = 未選択）',
    },
  },
}
