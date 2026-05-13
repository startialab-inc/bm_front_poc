import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { userEvent } from 'storybook/test'
import AppButtonIcon from './AppButtonIcon.vue'

const meta: Meta<typeof AppButtonIcon> = {
  component: AppButtonIcon,
  title: 'Atoms/AppButtonIcon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'アイコンのみの丸型ボタン（32×32px）。\n\n`icon` で Font Awesome アイコン名を指定し、`fontType` でアイコン種別（`fa-solid` / `fa-regular` / `fa-brands` 等）を切り替えられる。デフォルトは `fa-solid`。\n\nホバー・フォーカス時に背景が薄い青（`bg-surface-selected`）に変化する。disabled 状態ではアイコンがグレーになりクリック不可になる。',
      },
    },
  },
  argTypes: {
    icon: { control: 'text' },
    fontType: {
      control: 'select',
      options: ['fa-solid', 'fa-regular', 'fa-brands'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: 'arrow-left',
    fontType: 'fa-solid',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppButtonIcon>

// =====================================================
// Default 状態
// =====================================================

export const Default: Story = {
  name: 'Default（薄いグレー背景）',
  args: { icon: 'arrow-left' },
}

export const Hover: Story = {
  name: 'Hover（薄い青背景）',
  args: { icon: 'arrow-left' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await userEvent.hover(button)
  },
}

export const Focus: Story = {
  name: 'Focus（薄い青背景）',
  args: { icon: 'arrow-left' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await button.focus()
  },
}

export const Disabled: Story = {
  name: 'Disabled（グレーアイコン・クリック不可）',
  args: { icon: 'arrow-left', disabled: true },
}

// =====================================================
// アイコン種別バリエーション
// =====================================================

export const SolidIcon: Story = {
  name: 'fa-solid アイコン（デフォルト）',
  args: { icon: 'magnifying-glass', fontType: 'fa-solid' },
}

export const RegularIcon: Story = {
  name: 'fa-regular アイコン',
  args: { icon: 'circle', fontType: 'fa-regular' },
}

// =====================================================
// 各種アイコン例
// =====================================================

export const ArrowRight: Story = {
  name: 'arrow-right アイコン',
  args: { icon: 'arrow-right' },
}

export const Xmark: Story = {
  name: 'xmark アイコン（閉じる）',
  args: { icon: 'xmark' },
}

export const MagnifyingGlass: Story = {
  name: 'magnifying-glass アイコン（検索）',
  args: { icon: 'magnifying-glass' },
}

export const ChevronDown: Story = {
  name: 'chevron-down アイコン',
  args: { icon: 'chevron-down' },
}
