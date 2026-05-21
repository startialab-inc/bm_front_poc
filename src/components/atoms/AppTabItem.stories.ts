import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppTabItem from './AppTabItem.vue'

const meta: Meta<typeof AppTabItem> = {
  component: AppTabItem,
  title: 'Atoms/AppTabItem',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'タブナビゲーション子要素コンポーネント（Atom）。',
          'Figma node-id: `849:2330`（TabChild）',
          '',
          '`selected` の状態に応じて要素タグを切り替えます:',
          '- 選択中（`selected=true`）: `<div>` 要素・下部に 2px ブランド色（#2862cb）ボーダー・テキスト色 #0d2144',
          '- 非選択（`selected=false`）: `<button>` 要素・下線なし・テキスト色 #64748b',
          '',
          'Tab（Molecule）の子として使用されます。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'タブラベル',
    },
    selected: {
      control: 'boolean',
      description: '選択状態',
    },
  },
  args: {
    label: 'タブ',
    selected: false,
  },
}

export default meta
type Story = StoryObj<typeof AppTabItem>

// --- バリアント ---

export const Selected: Story = {
  name: '選択中',
  args: { label: 'タブ1', selected: true },
}

export const Unselected: Story = {
  name: '非選択',
  args: { label: 'タブ1', selected: false },
}

// --- Tab 風の横並びデモ ---

export const AllVariants: Story = {
  name: 'Tab 風横並び',
  render: () => ({
    components: { AppTabItem },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <p class="text-xs text-slate-400">選択中: タブ1</p>
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem label="タブ1" :selected="true" />
          <AppTabItem label="タブ2" :selected="false" />
          <AppTabItem label="タブ3" :selected="false" />
        </div>
        <p class="text-xs text-slate-400">選択中: タブ2</p>
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem label="タブ1" :selected="false" />
          <AppTabItem label="タブ2" :selected="true" />
          <AppTabItem label="タブ3" :selected="false" />
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppTabItem },
    setup() {
      const tabs = ref(['タブ1', 'タブ2', 'タブ3'])
      const selectedIndex = ref(0)
      return { tabs, selectedIndex }
    },
    template: `
      <div class="p-4 font-sans space-y-4">
        <p class="text-xs text-slate-500">タブをクリックして切り替え</p>
        <div class="flex items-start border-b border-slate-200">
          <AppTabItem
            v-for="(tab, i) in tabs"
            :key="tab"
            :label="tab"
            :selected="selectedIndex === i"
            @click="selectedIndex = i"
          />
        </div>
        <p class="text-xs text-slate-500">選択中: {{ tabs[selectedIndex] }}</p>
      </div>
    `,
  }),
}
