import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AppSegmentControl from './AppSegmentControl.vue'

const meta: Meta<typeof AppSegmentControl> = {
  title: 'Molecules/AppSegmentControl',
  component: AppSegmentControl,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'select',
      options: [undefined, 'all', 'published', 'unpublished', 'editing', 'pending', 'approved', 'rejected'],
      description: '選択中のセグメント value（省略時は未選択）',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppSegmentControl>

const defaultItems = [
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 8, value: 'published' },
  { label: '非公開中', count: 0, value: 'unpublished' },
  { label: '編集中', count: 4, value: 'editing' },
]

const manyItems = [
  { label: 'すべて', count: 8, value: 'all' },
  { label: '公開中', count: 8, value: 'published' },
  { label: '非公開中', count: 0, value: 'unpublished' },
  { label: '編集中', count: 4, value: 'editing' },
  { label: '申請中', count: 3, value: 'pending' },
  { label: '承認済', count: 4, value: 'approved' },
  { label: '差戻し', count: 1, value: 'rejected' },
]

// 初期選択あり（デフォルト）
export const Default: Story = {
  name: '初期選択あり（すべて）',
  render: (args) => ({
    components: { AppSegmentControl },
    setup() {
      const model = ref(args.modelValue ?? 'all')
      return { model, args }
    },
    template: `<AppSegmentControl v-model="model" :items="args.items" />`,
  }),
  args: {
    items: defaultItems,
    modelValue: 'all',
  },
}

// 初期選択なし
export const NoInitialSelection: Story = {
  name: '初期選択なし',
  render: (args) => ({
    components: { AppSegmentControl },
    setup() {
      const model = ref<string | undefined>(undefined)
      return { model, args }
    },
    template: `<AppSegmentControl v-model="model" :items="args.items" />`,
  }),
  args: {
    items: defaultItems,
    modelValue: undefined,
  },
}

// 7件タブ
export const ManyItems: Story = {
  name: '7件タブ',
  render: (args) => ({
    components: { AppSegmentControl },
    setup() {
      const model = ref('all')
      return { model, args }
    },
    template: `<AppSegmentControl v-model="model" :items="args.items" />`,
  }),
  args: {
    items: manyItems,
    modelValue: 'all',
  },
}

// 2件タブ
export const TwoItems: Story = {
  name: '2件タブ',
  render: (args) => ({
    components: { AppSegmentControl },
    setup() {
      const model = ref('active')
      return { model, args }
    },
    template: `<AppSegmentControl v-model="model" :items="args.items" />`,
  }),
  args: {
    items: [
      { label: '有効', count: 5, value: 'active' },
      { label: '無効', count: 2, value: 'inactive' },
    ],
    modelValue: 'active',
  },
}
