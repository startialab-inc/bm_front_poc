import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseControlLabel from './BaseControlLabel.vue'

const meta: Meta<typeof BaseControlLabel> = {
  component: BaseControlLabel,
  title: 'Atoms/BaseControlLabel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'フォームコントロール（radio / checkbox / switch）に付属するテキストラベル。\n\n`weight` で `font-normal`（400）/ `font-medium`（500）を切り替えられる。AppRadioButton の box variant のみ medium を使用。',
      },
    },
  },
  argTypes: {
    weight: {
      control: 'select',
      options: ['normal', 'medium'],
    },
  },
  args: {
    label: 'ラベルテキスト',
    weight: 'normal',
  },
}

export default meta
type Story = StoryObj<typeof BaseControlLabel>

// =====================================================
// normal（font-weight: 400）
// =====================================================

export const NormalDefault: Story = {
  name: 'Normal - デフォルト（font-weight: 400）',
  args: { label: 'ラジオボタンのラベル', weight: 'normal' },
}

// =====================================================
// medium（font-weight: 500）
// =====================================================

export const MediumDefault: Story = {
  name: 'Medium - box variant 用（font-weight: 500）',
  args: { label: 'ラジオボタン（ボックス）のラベル', weight: 'medium' },
}

// =====================================================
// 長いテキスト
// =====================================================

export const LongText: Story = {
  name: 'Normal - 長いテキスト',
  args: { label: 'これは長めのラベルテキストのサンプルです', weight: 'normal' },
}
