import type { Meta, StoryObj } from '@storybook/vue3'
import AppSwitchLabel from './AppSwitchLabel.vue'

const meta: Meta<typeof AppSwitchLabel> = {
  component: AppSwitchLabel,
  title: 'Molecules/AppSwitchLabel',
  tags: ['autodocs'],
  argTypes: {
    leftLabel: { control: 'text', description: '左側ラベルテキスト' },
    rightLabel: { control: 'text', description: '右側ラベルテキスト' },
    disabled: { control: 'boolean', description: '無効状態' },
    modelValue: { control: 'boolean', description: 'ON/OFF 状態' },
  },
  args: {
    leftLabel: undefined,
    rightLabel: undefined,
    disabled: false,
    modelValue: false,
  },
}

export default meta
type Story = StoryObj<typeof AppSwitchLabel>

// ラベルなし（スイッチのみ）
export const Default: Story = {
  name: 'Default（ラベルなし）',
}

// 左ラベルのみ
export const WithLeftLabel: Story = {
  name: 'WithLeftLabel（左ラベルのみ）',
  args: {
    leftLabel: '通知を受け取る',
  },
}

// 右ラベルのみ
export const WithRightLabel: Story = {
  name: 'WithRightLabel（右ラベルのみ）',
  args: {
    rightLabel: '有効にする',
  },
}

// 左右両方のラベル
export const WithBothLabels: Story = {
  name: 'WithBothLabels（両ラベル）',
  args: {
    leftLabel: 'OFF',
    rightLabel: 'ON',
  },
}

// 左右両方のラベル・ON 状態
export const WithBothLabelsOn: Story = {
  name: 'WithBothLabelsOn（両ラベル・ON）',
  args: {
    leftLabel: 'OFF',
    rightLabel: 'ON',
    modelValue: true,
  },
}

// 無効状態（OFF）
export const Disabled: Story = {
  name: 'Disabled（無効・OFF）',
  args: {
    leftLabel: '通知を受け取る',
    disabled: true,
  },
}

// 無効状態（ON）
export const DisabledOn: Story = {
  name: 'DisabledOn（無効・ON）',
  args: {
    leftLabel: '通知を受け取る',
    disabled: true,
    modelValue: true,
  },
}
