import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppCountBadge from './AppCountBadge.vue'

const meta: Meta<typeof AppCountBadge> = {
  component: AppCountBadge,
  title: 'Atoms/AppCountBadge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '件数バッジコンポーネント（Atom）。',
          'Figma node-id: `619:13664`（PageCountBadge）',
          '',
          '`count` prop に表示する件数（数値）を渡します。単一バリアントで、件数の大きさに応じて幅が伸縮します。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    count: {
      control: 'number',
      description: '表示する件数',
      table: {
        defaultValue: { summary: '—（必須）' },
      },
    },
  },
  args: {
    count: 1,
  },
}

export default meta
type Story = StoryObj<typeof AppCountBadge>

// --- 数値バリエーション ---

export const Default: Story = {
  name: 'デフォルト（count=1）',
  args: { count: 1 },
}

export const SmallNumber: Story = {
  name: '小さい数値（count=10）',
  args: { count: 10 },
}

export const MediumNumber: Story = {
  name: '中程度の数値（count=100）',
  args: { count: 100 },
}

export const LargeNumber: Story = {
  name: '大きい数値（count=9999）',
  args: { count: 9999 },
}

// --- 件数比較一覧 ---

export const AllSizes: Story = {
  name: '件数比較一覧',
  render: () => ({
    components: { AppCountBadge },
    template: `
      <div class="flex flex-wrap items-center gap-3 p-4">
        <div class="flex flex-col items-center gap-1">
          <AppCountBadge :count="1" />
          <span class="text-[10px] text-slate-400">1件</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppCountBadge :count="10" />
          <span class="text-[10px] text-slate-400">10件</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppCountBadge :count="100" />
          <span class="text-[10px] text-slate-400">100件</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppCountBadge :count="1000" />
          <span class="text-[10px] text-slate-400">1000件</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppCountBadge :count="9999" />
          <span class="text-[10px] text-slate-400">9999件</span>
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppCountBadge },
    setup() {
      const count = ref(42)
      return { count }
    },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="flex items-center gap-3">
          <label class="text-xs text-slate-500 shrink-0">件数：</label>
          <input
            v-model.number="count"
            type="number"
            min="0"
            class="text-xs border border-slate-300 rounded px-2 py-1 w-28"
          />
        </div>
        <div class="flex items-center justify-center bg-slate-50 rounded-lg p-6 min-h-[80px]">
          <AppCountBadge :count="count" />
        </div>
      </div>
    `,
  }),
}
