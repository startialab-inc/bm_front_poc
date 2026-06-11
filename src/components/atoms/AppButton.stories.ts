import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { userEvent } from 'storybook/test'
import AppButton from './AppButton.vue'

const meta: Meta<typeof AppButton> = {
  component: AppButton,
  title: 'Atoms/AppButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '各種アクションに対応する汎用ボタン。\n\n`variant` で外観（ghost / primary / submit / destructive / secondary / sort / filter）を、`size` でサイズ（sm=32px / md=40px）を切り替えられる。ghost はデフォルト sm、その他はデフォルト md。\n\n`iconLeft` / `iconRight` で Font Awesome アイコンをボタンの左右に配置できる。sort / filter はデフォルトラベルとアイコンが設定済み。disabled 状態にも対応。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'ghost-danger', 'primary', 'submit', 'destructive', 'secondary', 'sort', 'filter'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'primary',
    label: 'ボタン',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppButton>

// =====================================================
// ghost バリアント（透明背景・sm サイズ・テキスト＋アイコン）
// =====================================================

export const GhostDefault: Story = {
  name: 'Ghost - Default（右アイコン）',
  args: { variant: 'ghost', label: 'アクション', iconRight: 'circle' },
}

export const GhostLeftIcon: Story = {
  name: 'Ghost - Default（左アイコン）',
  args: { variant: 'ghost', label: 'アクション', iconLeft: 'circle' },
}

export const GhostBothIcons: Story = {
  name: 'Ghost - Default（両側アイコン）',
  args: { variant: 'ghost', label: 'アクション', iconLeft: 'circle', iconRight: 'chevron-down' },
}

export const GhostHover: Story = {
  name: 'Ghost - Hover（青背景・テキスト色変化）',
  args: { variant: 'ghost', label: 'アクション', iconRight: 'circle' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'アクション' })
    await userEvent.hover(button)
  },
}

export const GhostFocus: Story = {
  name: 'Ghost - Focus（青背景・青枠線）',
  args: { variant: 'ghost', label: 'アクション', iconRight: 'circle' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'アクション' })
    await button.focus()
  },
}

export const GhostDisabled: Story = {
  name: 'Ghost - Disabled（グレー文字）',
  args: { variant: 'ghost', label: 'アクション', iconRight: 'circle', disabled: true },
}

export const GhostNoIcon: Story = {
  name: 'Ghost - アイコンなし',
  args: { variant: 'ghost', label: 'アクション' },
}

// =====================================================
// ghost-danger バリアント（透明背景・赤テキスト・sm サイズ）
// =====================================================

export const GhostDangerDefault: Story = {
  name: 'GhostDanger - Default（赤文字・左アイコン）',
  args: { variant: 'ghost-danger', label: '削除', iconLeft: 'trash' },
}

export const GhostDangerHover: Story = {
  name: 'GhostDanger - Hover（薄赤背景）',
  args: { variant: 'ghost-danger', label: '削除', iconLeft: 'trash' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '削除' })
    await userEvent.hover(button)
  },
}

export const GhostDangerDisabled: Story = {
  name: 'GhostDanger - Disabled（グレー文字）',
  args: { variant: 'ghost-danger', label: '削除', iconLeft: 'trash', disabled: true },
}

// =====================================================
// primary バリアント（塗りつぶし青・md サイズ）
// =====================================================

export const PrimaryDefault: Story = {
  name: 'Primary - Default（青背景）',
  args: { variant: 'primary', label: '保存' },
}

export const PrimaryHover: Story = {
  name: 'Primary - Hover（濃い青背景）',
  args: { variant: 'primary', label: '保存' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '保存' })
    await userEvent.hover(button)
  },
}

export const PrimaryFocus: Story = {
  name: 'Primary - Focus（最濃い青背景）',
  args: { variant: 'primary', label: '保存' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '保存' })
    await button.focus()
  },
}

export const PrimaryDisabled: Story = {
  name: 'Primary - Disabled（グレー背景）',
  args: { variant: 'primary', label: '保存', disabled: true },
}

// =====================================================
// submit バリアント（塗りつぶしオレンジ・md サイズ）
// =====================================================

export const SubmitDefault: Story = {
  name: 'Submit - Default（オレンジ背景）',
  args: { variant: 'submit', label: '送信' },
}

export const SubmitHover: Story = {
  name: 'Submit - Hover（明るいオレンジ）',
  args: { variant: 'submit', label: '送信' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '送信' })
    await userEvent.hover(button)
  },
}

export const SubmitFocus: Story = {
  name: 'Submit - Focus（濃いオレンジ）',
  args: { variant: 'submit', label: '送信' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '送信' })
    await button.focus()
  },
}

export const SubmitDisabled: Story = {
  name: 'Submit - Disabled（グレー背景）',
  args: { variant: 'submit', label: '送信', disabled: true },
}

// =====================================================
// destructive バリアント（塗りつぶし赤・md サイズ）
// =====================================================

export const DestructiveDefault: Story = {
  name: 'Destructive - Default（赤背景）',
  args: { variant: 'destructive', label: '削除' },
}

export const DestructiveHover: Story = {
  name: 'Destructive - Hover（明るい赤）',
  args: { variant: 'destructive', label: '削除' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '削除' })
    await userEvent.hover(button)
  },
}

export const DestructiveFocus: Story = {
  name: 'Destructive - Focus（濃い赤）',
  args: { variant: 'destructive', label: '削除' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: '削除' })
    await button.focus()
  },
}

export const DestructiveDisabled: Story = {
  name: 'Destructive - Disabled（グレー背景）',
  args: { variant: 'destructive', label: '削除', disabled: true },
}

// =====================================================
// secondary バリアント（アウトライン・md サイズ）
// =====================================================

export const SecondaryDefault: Story = {
  name: 'Secondary - Default（白背景・紺枠線）',
  args: { variant: 'secondary', label: 'キャンセル' },
}

export const SecondaryHover: Story = {
  name: 'Secondary - Hover（グレー背景・紺枠線）',
  args: { variant: 'secondary', label: 'キャンセル' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'キャンセル' })
    await userEvent.hover(button)
  },
}

export const SecondaryFocus: Story = {
  name: 'Secondary - Focus（グレー背景・枠線なし）',
  args: { variant: 'secondary', label: 'キャンセル' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'キャンセル' })
    await button.focus()
  },
}

export const SecondaryDisabled: Story = {
  name: 'Secondary - Disabled（透明背景・グレー枠線）',
  args: { variant: 'secondary', label: 'キャンセル', disabled: true },
}

// =====================================================
// sort バリアント（単一状態・アイコン固定）
// =====================================================

export const SortDefault: Story = {
  name: 'Sort - Default（更新日順）',
  args: { variant: 'sort' },
}

// =====================================================
// filter バリアント（単一状態・アイコン固定）
// =====================================================

export const FilterDefault: Story = {
  name: 'Filter - Default（絞り込み検索）',
  args: { variant: 'filter' },
}
