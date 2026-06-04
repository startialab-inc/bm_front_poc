import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AppTab from './AppTab.vue'

const meta: Meta<typeof AppTab> = {
  title: 'Molecules/AppTab',
  component: AppTab,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'select',
      options: ['basic', 'detail', 'history', 'settings', 'preview'],
      description: '選択中タブの value',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppTab>

const defaultItems = [
  { label: '基本情報', value: 'basic' },
  { label: '詳細設定', value: 'detail' },
  { label: '変更履歴', value: 'history' },
]

const manyItems = [
  { label: '基本情報', value: 'basic' },
  { label: '詳細設定', value: 'detail' },
  { label: '変更履歴', value: 'history' },
  { label: '設定', value: 'settings' },
  { label: 'プレビュー', value: 'preview' },
]

// デフォルト（最初のタブを選択）
export const Default: Story = {
  name: 'デフォルト（1番目選択）',
  render: (args) => ({
    components: { AppTab },
    setup() {
      const model = ref(args.modelValue ?? 'basic')
      return { model, args }
    },
    template: `<AppTab v-model="model" :items="args.items" />`,
  }),
  args: {
    items: defaultItems,
    modelValue: 'basic',
  },
}

// 2番目のタブを選択
export const SecondSelected: Story = {
  name: '2番目のタブを選択',
  render: (args) => ({
    components: { AppTab },
    setup() {
      const model = ref('detail')
      return { model, args }
    },
    template: `<AppTab v-model="model" :items="args.items" />`,
  }),
  args: {
    items: defaultItems,
    modelValue: 'detail',
  },
}

// 3番目のタブを選択
export const ThirdSelected: Story = {
  name: '3番目のタブを選択',
  render: (args) => ({
    components: { AppTab },
    setup() {
      const model = ref('history')
      return { model, args }
    },
    template: `<AppTab v-model="model" :items="args.items" />`,
  }),
  args: {
    items: defaultItems,
    modelValue: 'history',
  },
}

// 5件タブ
export const ManyTabs: Story = {
  name: '5件タブ',
  render: (args) => ({
    components: { AppTab },
    setup() {
      const model = ref('basic')
      return { model, args }
    },
    template: `<AppTab v-model="model" :items="args.items" />`,
  }),
  args: {
    items: manyItems,
    modelValue: 'basic',
  },
}

// インタラクティブデモ（動的切り替え）
export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppTab },
    setup() {
      const model = ref('basic')
      const items = [
        { label: '基本情報', value: 'basic' },
        { label: '詳細設定', value: 'detail' },
        { label: '変更履歴', value: 'history' },
      ]
      return { model, items }
    },
    template: `
      <div>
        <AppTab v-model="model" :items="items" />
        <p class="mt-4 text-sm text-gray-500">選択中: {{ model }}</p>
      </div>
    `,
  }),
}
