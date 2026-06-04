import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AppCheckbox from './AppCheckbox.vue'

const meta: Meta<typeof AppCheckbox> = {
  title: 'Molecules/AppCheckbox',
  component: AppCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'チェックボックスのラベルテキスト',
    },
    value: {
      control: 'text',
      description: 'このチェックボックスが表す値（boolean トグルの場合は true）',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppCheckbox>

// 未選択状態
export const Default: Story = {
  name: '未選択',
  args: {
    label: 'このページのアクセス URL を変更する',
    value: true,
    disabled: false,
  },
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      const checked = ref<string | number | boolean | undefined>(undefined)
      return { args, checked }
    },
    template: `<AppCheckbox v-bind="args" v-model="checked" />`,
  }),
}

// 選択済み状態
export const Selected: Story = {
  name: '選択済み',
  args: {
    label: 'このページのアクセス URL を変更する',
    value: true,
    disabled: false,
  },
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      const checked = ref<string | number | boolean | undefined>(true)
      return { args, checked }
    },
    template: `<AppCheckbox v-bind="args" v-model="checked" />`,
  }),
}

// 無効・未選択
export const DisabledUnselected: Story = {
  name: '無効（未選択）',
  args: {
    label: 'このページのアクセス URL を変更する',
    value: true,
    disabled: true,
  },
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      const checked = ref<string | number | boolean | undefined>(undefined)
      return { args, checked }
    },
    template: `<AppCheckbox v-bind="args" v-model="checked" />`,
  }),
}

// 無効・選択済み
export const DisabledSelected: Story = {
  name: '無効（選択済み）',
  args: {
    label: 'このページのアクセス URL を変更する',
    value: true,
    disabled: true,
  },
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      const checked = ref<string | number | boolean | undefined>(true)
      return { args, checked }
    },
    template: `<AppCheckbox v-bind="args" v-model="checked" />`,
  }),
}

// グループデモ（複数チェックボックス）
export const GroupDemo: Story = {
  name: 'グループデモ',
  render: () => ({
    components: { AppCheckbox },
    setup() {
      const notifications = ref<string | undefined>(undefined)
      const marketing = ref<string | undefined>(undefined)
      const updates = ref<string | undefined>(undefined)
      return { notifications, marketing, updates }
    },
    template: `
      <div class="flex flex-col gap-3 p-4">
        <AppCheckbox v-model="notifications" value="notifications" label="メール通知を受け取る" />
        <AppCheckbox v-model="marketing" value="marketing" label="マーケティング情報を受け取る" />
        <AppCheckbox v-model="updates" value="updates" label="製品アップデート情報を受け取る" />
        <p class="text-xs text-slate-400 mt-2">
          通知: {{ notifications ?? '未選択' }} /
          マーケティング: {{ marketing ?? '未選択' }} /
          アップデート: {{ updates ?? '未選択' }}
        </p>
      </div>
    `,
  }),
}
