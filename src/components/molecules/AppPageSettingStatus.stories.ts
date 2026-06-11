import type { Meta, StoryObj } from '@storybook/vue3'
import AppPageSettingStatus from './AppPageSettingStatus.vue'

const meta: Meta<typeof AppPageSettingStatus> = {
  title: 'Molecules/AppPageSettingStatus',
  component: AppPageSettingStatus,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'radio',
      options: ['on', 'off'],
      description: 'ON/OFF の表示状態',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppPageSettingStatus>

export const On: Story = {
  name: 'ON 状態',
  args: {
    status: 'on',
  },
}

export const Off: Story = {
  name: 'OFF 状態',
  args: {
    status: 'off',
  },
}

export const Default: Story = {
  name: 'デフォルト（引数なし）',
  args: {},
}

export const Interactive: Story = {
  name: 'インタラクティブ',
  args: {
    status: 'on',
  },
}
