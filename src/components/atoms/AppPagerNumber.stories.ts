import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppPagerNumber from './AppPagerNumber.vue'

const meta: Meta<typeof AppPagerNumber> = {
  component: AppPagerNumber,
  title: 'Atoms/AppPagerNumber',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'ページネーション番号ボタンコンポーネント（Atom）。',
          'Figma node-id: `932:25025`（PagerNubmer ※Figma typo, 正: PagerNumber）',
          '',
          '`active` の状態に応じて要素タグを切り替えます:',
          '- 現在ページ（`active=true`）: `<div>` 要素・濃紺背景（#143166）・白テキスト',
          '- 通常ページ（`active=false`）: `<button>` 要素・薄グレー背景（#f8fafc）・グレーボーダー・テキスト色 #0d2144',
          '',
          'Pagination（Molecule）の子として使用されます。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    page: {
      control: 'number',
      description: 'ページ番号',
    },
    active: {
      control: 'boolean',
      description: '現在ページかどうか',
    },
  },
  args: {
    page: 1,
    active: false,
  },
}

export default meta
type Story = StoryObj<typeof AppPagerNumber>

// --- バリアント ---

export const Active: Story = {
  name: '現在ページ（Active）',
  args: { page: 2, active: true },
}

export const Default: Story = {
  name: '通常ページ（Default）',
  args: { page: 1, active: false },
}

// --- ページネーション風横並びデモ ---

export const AllVariants: Story = {
  name: 'ページネーション風横並び',
  render: () => ({
    components: { AppPagerNumber },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <p class="text-xs text-slate-400">現在ページ: 2</p>
        <div class="flex items-center gap-1">
          <AppPagerNumber :page="1" :active="false" />
          <AppPagerNumber :page="2" :active="true" />
          <AppPagerNumber :page="3" :active="false" />
          <AppPagerNumber :page="4" :active="false" />
          <AppPagerNumber :page="5" :active="false" />
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppPagerNumber },
    setup() {
      const currentPage = ref(2)
      const totalPages = ref([1, 2, 3, 4, 5])
      return { currentPage, totalPages }
    },
    template: `
      <div class="p-4 font-sans space-y-4">
        <p class="text-xs text-slate-500">番号をクリックしてページを切り替え</p>
        <div class="flex items-center gap-1">
          <AppPagerNumber
            v-for="page in totalPages"
            :key="page"
            :page="page"
            :active="currentPage === page"
            @click="currentPage = page"
          />
        </div>
        <p class="text-xs text-slate-500">現在ページ: {{ currentPage }}</p>
      </div>
    `,
  }),
}
