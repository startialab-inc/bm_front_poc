import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import AppModalFooter from './AppModalFooter.vue'
import AppButton from '@/components/atoms/AppButton.vue'

const meta: Meta<typeof AppModalFooter> = {
  title: 'Molecules/AppModalFooter',
  component: AppModalFooter,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppModalFooter>

// Basic（2ボタン）: secondary + primary
export const Basic: Story = {
  name: 'Basic（2ボタン）',
  render: () => ({
    components: { AppModalFooter, AppButton },
    template: `
      <AppModalFooter>
        <AppButton variant="secondary" label="保存して閉じる" />
        <AppButton variant="primary" label="保存して設定を続ける" />
      </AppModalFooter>
    `,
  }),
}

// Article（3ボタン）: secondary + submit + primary
export const Article: Story = {
  name: 'Article（3ボタン）',
  render: () => ({
    components: { AppModalFooter, AppButton },
    template: `
      <AppModalFooter>
        <AppButton variant="secondary" label="閉じる" />
        <AppButton variant="submit" label="申請する" />
        <AppButton variant="primary" label="保存する" />
      </AppModalFooter>
    `,
  }),
}

// disabled ボタンを含むケース
export const WithDisabled: Story = {
  name: 'disabled ボタンを含む',
  render: () => ({
    components: { AppModalFooter, AppButton },
    template: `
      <AppModalFooter>
        <AppButton variant="secondary" label="保存して閉じる" />
        <AppButton variant="primary" label="保存して設定を続ける" :disabled="true" />
      </AppModalFooter>
    `,
  }),
}

// 1ボタン（閉じるのみ）
export const SingleButton: Story = {
  name: '1ボタン（閉じるのみ）',
  render: () => ({
    components: { AppModalFooter, AppButton },
    template: `
      <AppModalFooter>
        <AppButton variant="secondary" label="閉じる" />
      </AppModalFooter>
    `,
  }),
}
