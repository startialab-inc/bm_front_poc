import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AppRadioButton from './AppRadioButton.vue'

const meta: Meta<typeof AppRadioButton> = {
  title: 'Molecules/AppRadioButton',
  component: AppRadioButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'box'],
      description: 'テキスト形式またはボックス形式',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    value: {
      control: 'text',
      description: 'このラジオボタンが表す値',
    },
    disabled: {
      control: 'boolean',
      description: '無効状態',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppRadioButton>

// --- テキスト形式 ---

export const TextDefault: Story = {
  name: 'テキスト（未選択）',
  args: {
    variant: 'text',
    label: 'オプション A',
    value: 'a',
    name: 'group-text',
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

export const TextSelected: Story = {
  name: 'テキスト（選択済み）',
  args: {
    variant: 'text',
    label: 'オプション A',
    value: 'a',
    name: 'group-text-selected',
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('a')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

export const TextDisabled: Story = {
  name: 'テキスト（無効）',
  args: {
    variant: 'text',
    label: 'オプション A（無効）',
    value: 'a',
    name: 'group-text-disabled',
    disabled: true,
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

// --- ボックス形式 ---

export const BoxDefault: Story = {
  name: 'ボックス（未選択）',
  args: {
    variant: 'box',
    label: 'オプション A',
    value: 'a',
    name: 'group-box',
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

export const BoxSelected: Story = {
  name: 'ボックス（選択済み）',
  args: {
    variant: 'box',
    label: 'オプション A',
    value: 'a',
    name: 'group-box-selected',
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('a')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

export const BoxDisabled: Story = {
  name: 'ボックス（無効）',
  args: {
    variant: 'box',
    label: 'オプション A（無効）',
    value: 'a',
    name: 'group-box-disabled',
    disabled: true,
  },
  render: (args) => ({
    components: { AppRadioButton },
    setup() {
      const selected = ref('')
      return { args, selected }
    },
    template: `<AppRadioButton v-bind="args" v-model="selected" />`,
  }),
}

// --- グループデモ ---

export const GroupDemo: Story = {
  name: 'グループ選択デモ',
  render: () => ({
    components: { AppRadioButton },
    setup() {
      const selectedText = ref('a')
      const selectedBox = ref('a')
      return { selectedText, selectedBox }
    },
    template: `
      <div class="space-y-8 p-6">
        <div>
          <p class="mb-3 text-sm font-semibold text-slate-700">テキスト形式グループ</p>
          <div class="space-y-2">
            <AppRadioButton v-model="selectedText" variant="text" name="demo-text" value="a" label="オプション A" />
            <AppRadioButton v-model="selectedText" variant="text" name="demo-text" value="b" label="オプション B" />
            <AppRadioButton v-model="selectedText" variant="text" name="demo-text" value="c" label="オプション C" />
            <AppRadioButton v-model="selectedText" variant="text" name="demo-text" value="d" label="オプション D（無効）" disabled />
          </div>
          <p class="mt-2 text-xs text-slate-400">選択中: {{ selectedText }}</p>
        </div>
        <div>
          <p class="mb-3 text-sm font-semibold text-slate-700">ボックス形式グループ</p>
          <div class="flex gap-2">
            <AppRadioButton v-model="selectedBox" variant="box" name="demo-box" value="a" label="オプション A" />
            <AppRadioButton v-model="selectedBox" variant="box" name="demo-box" value="b" label="オプション B" />
            <AppRadioButton v-model="selectedBox" variant="box" name="demo-box" value="c" label="オプション C（無効）" disabled />
          </div>
          <p class="mt-2 text-xs text-slate-400">選択中: {{ selectedBox }}</p>
        </div>
      </div>
    `,
  }),
}
