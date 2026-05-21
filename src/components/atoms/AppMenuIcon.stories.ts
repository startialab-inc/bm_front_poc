import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppMenuIcon from './AppMenuIcon.vue'

const meta: Meta<typeof AppMenuIcon> = {
  component: AppMenuIcon,
  title: 'Atoms/AppMenuIcon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'サイドバー用アイコンメニューボタンコンポーネント（Atom）。',
          'Figma node-id: `308:6380`（side-bar/menu-icon）',
          '',
          '`current` の状態に応じて要素タグとスタイルを切り替えます:',
          '- 通常（`current=false`）: `<button>` 要素・白背景・ブランド青アイコン・ホバー時薄青背景（#ddeaff）',
          '- 現在地（`current=true`）: `<div>` 要素・ブランド青背景（#2862cb）・白アイコン',
          '',
          '`icon` prop で FontAwesome アイコン名を指定します（デフォルト: `grip-horizontal`）。',
          'sidebar（Organism）の子として使用されます。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'FontAwesome アイコン名（例: grip-horizontal）',
    },
    current: {
      control: 'boolean',
      description: '現在地（Current）状態かどうか',
    },
  },
  args: {
    icon: 'grip-horizontal',
    current: false,
  },
}

export default meta
type Story = StoryObj<typeof AppMenuIcon>

// --- バリアント ---

export const Default: Story = {
  name: '通常（Default）',
  args: { icon: 'grip-horizontal', current: false },
}

export const Current: Story = {
  name: '現在地（Current）',
  args: { icon: 'grip-horizontal', current: true },
}

// --- 全バリアント横並びデモ ---

export const AllVariants: Story = {
  name: '全バリアント（Default / Hover / Current）',
  render: () => ({
    components: { AppMenuIcon },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon :current="false" />
            <span class="text-[10px] text-slate-400">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <p class="text-[10px] text-slate-400 text-center">Hover<br>（マウスオーバーで確認）</p>
            <AppMenuIcon :current="false" />
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon :current="true" />
            <span class="text-[10px] text-slate-400">Current</span>
          </div>
        </div>
        <div class="flex items-center gap-6 mt-4">
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="house" :current="false" />
            <span class="text-[10px] text-slate-400">house</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="gear" :current="false" />
            <span class="text-[10px] text-slate-400">gear</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="user" :current="true" />
            <span class="text-[10px] text-slate-400">user (current)</span>
          </div>
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppMenuIcon },
    setup() {
      const activeIndex = ref(0)
      const items = [
        { icon: 'grip-horizontal', label: 'メニュー' },
        { icon: 'house', label: 'ホーム' },
        { icon: 'gear', label: '設定' },
        { icon: 'user', label: 'ユーザー' },
      ]
      return { activeIndex, items }
    },
    template: `
      <div class="p-4 font-sans space-y-4">
        <p class="text-xs text-slate-500">アイコンをクリックして Current 状態を切り替え</p>
        <div class="flex items-center gap-2">
          <AppMenuIcon
            v-for="(item, i) in items"
            :key="i"
            :icon="item.icon"
            :current="activeIndex === i"
            @click="activeIndex = i"
          />
        </div>
        <p class="text-xs text-slate-500">現在地: {{ items[activeIndex].label }}</p>
      </div>
    `,
  }),
}
