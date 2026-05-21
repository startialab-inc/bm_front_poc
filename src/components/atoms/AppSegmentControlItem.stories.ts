import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppSegmentControlItem from './AppSegmentControlItem.vue'

const meta: Meta<typeof AppSegmentControlItem> = {
  component: AppSegmentControlItem,
  title: 'Atoms/AppSegmentControlItem',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'セグメントコントロール子要素コンポーネント（Atom）。',
          'Figma node-id: `520:13248`（SegmentControlChild）',
          '',
          '`selected` の状態に応じて要素タグを切り替えます:',
          '- 選択中（`selected=true`）: `<div>` 要素・白背景・border-radius 6px・テキスト色 #0d2144',
          '- 非選択（`selected=false`）: `<button>` 要素・透明背景・border-radius 8px・テキスト色 #64748b',
          '',
          '件数（`count`）は括弧付き `(8)` の形式で表示します。',
          'SegmentControl（Molecule）の子として使用されます。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'タブラベル',
    },
    count: {
      control: { type: 'number', min: 0 },
      description: '件数（括弧付きで表示）',
    },
    selected: {
      control: 'boolean',
      description: '選択状態',
    },
  },
  args: {
    label: 'すべて',
    count: 8,
    selected: false,
  },
}

export default meta
type Story = StoryObj<typeof AppSegmentControlItem>

// --- バリアント ---

export const Selected: Story = {
  name: '選択中',
  args: { label: 'すべて', count: 8, selected: true },
}

export const Unselected: Story = {
  name: '非選択',
  args: { label: 'すべて', count: 8, selected: false },
}

export const ZeroCount: Story = {
  name: '件数ゼロ',
  args: { label: '下書き', count: 0, selected: false },
}

// --- SegmentControl 風の横並びデモ ---

export const AllVariants: Story = {
  name: 'SegmentControl 風横並び',
  render: () => ({
    components: { AppSegmentControlItem },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <p class="text-xs text-slate-400">選択中: すべて（bg-slate-100 コンテナ上）</p>
        <div class="flex items-center bg-slate-100 rounded-[10px] p-1 gap-1 w-[360px]">
          <AppSegmentControlItem label="すべて" :count="8" :selected="true" />
          <AppSegmentControlItem label="公開中" :count="3" :selected="false" />
          <AppSegmentControlItem label="非公開" :count="5" :selected="false" />
        </div>
        <p class="text-xs text-slate-400">選択中: 公開中</p>
        <div class="flex items-center bg-slate-100 rounded-[10px] p-1 gap-1 w-[360px]">
          <AppSegmentControlItem label="すべて" :count="8" :selected="false" />
          <AppSegmentControlItem label="公開中" :count="3" :selected="true" />
          <AppSegmentControlItem label="非公開" :count="5" :selected="false" />
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppSegmentControlItem },
    setup() {
      const tabs = ref([
        { label: 'すべて', count: 8 },
        { label: '公開中', count: 3 },
        { label: '非公開', count: 5 },
      ])
      const selectedIndex = ref(0)
      return { tabs, selectedIndex }
    },
    template: `
      <div class="p-4 font-sans space-y-4">
        <p class="text-xs text-slate-500">タブをクリックして切り替え</p>
        <div class="flex items-center bg-slate-100 rounded-[10px] p-1 gap-1 w-[360px]">
          <AppSegmentControlItem
            v-for="(tab, i) in tabs"
            :key="tab.label"
            :label="tab.label"
            :count="tab.count"
            :selected="selectedIndex === i"
            @click="selectedIndex = i"
          />
        </div>
        <p class="text-xs text-slate-500">選択中: {{ tabs[selectedIndex].label }}</p>
      </div>
    `,
  }),
}
