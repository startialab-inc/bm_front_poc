import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppBadgeStatus from './AppBadgeStatus.vue'

const meta: Meta<typeof AppBadgeStatus> = {
  component: AppBadgeStatus,
  title: 'Atoms/AppBadgeStatus',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'バッジステータスコンポーネント（Atom）。',
          'Figma node-id: `619:13589`（Badge/PageStatus）/ `864:40386`（Badge/SubStatus）',
          '',
          '`variant` prop で5状態を切り替えます。',
          '`rebuilding` 状態のみ時計アイコンと日時テキストを表示し、`datetime` prop で日時文字列を指定します。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['open', 'close', 'rebuilding', 'editing', 'approved'],
      description: 'バッジの状態',
      table: {
        defaultValue: { summary: '—（必須）' },
      },
    },
    datetime: {
      control: 'text',
      description: '再構築予約日時（variant="rebuilding" のときのみ使用）',
      table: {
        defaultValue: { summary: "''" },
      },
    },
  },
  args: {
    variant: 'open',
    datetime: '',
  },
}

export default meta
type Story = StoryObj<typeof AppBadgeStatus>

// --- 個別バリアント ---

export const Open: Story = {
  name: 'open（公開中）',
  args: { variant: 'open' },
}

export const Close: Story = {
  name: 'close（非公開）',
  args: { variant: 'close' },
}

export const Rebuilding: Story = {
  name: 'rebuilding（再構築予約）',
  args: { variant: 'rebuilding', datetime: '2026/05/20 10:00' },
}

export const Editing: Story = {
  name: 'editing（編集中）',
  args: { variant: 'editing' },
}

export const Approved: Story = {
  name: 'approved（承認済）',
  args: { variant: 'approved' },
}

// --- 全バリアント一覧 ---

export const AllVariants: Story = {
  name: '全バリアント一覧',
  render: () => ({
    components: { AppBadgeStatus },
    template: `
      <div class="flex flex-wrap gap-3 p-4">
        <div class="flex flex-col items-center gap-1">
          <AppBadgeStatus variant="open" />
          <span class="text-[10px] text-slate-400">open</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppBadgeStatus variant="close" />
          <span class="text-[10px] text-slate-400">close</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppBadgeStatus variant="rebuilding" datetime="2026/05/20 10:00" />
          <span class="text-[10px] text-slate-400">rebuilding</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppBadgeStatus variant="editing" />
          <span class="text-[10px] text-slate-400">editing</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <AppBadgeStatus variant="approved" />
          <span class="text-[10px] text-slate-400">approved</span>
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppBadgeStatus },
    setup() {
      const variant = ref<'open' | 'close' | 'rebuilding' | 'editing' | 'approved'>('open')
      const datetime = ref('2026/05/20 10:00')
      const variants = ['open', 'close', 'rebuilding', 'editing', 'approved'] as const
      return { variant, datetime, variants }
    },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="v in variants"
            :key="v"
            @click="variant = v"
            class="text-xs border rounded px-2 py-1 transition-colors"
            :class="variant === v
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
          >{{ v }}</button>
        </div>
        <div v-if="variant === 'rebuilding'" class="flex items-center gap-2">
          <label class="text-xs text-slate-500 shrink-0">日時：</label>
          <input
            v-model="datetime"
            type="text"
            placeholder="例: 2026/05/20 10:00"
            class="text-xs border border-slate-300 rounded px-2 py-1 w-48"
          />
        </div>
        <div class="flex items-center justify-center bg-slate-50 rounded-lg p-6 min-h-[80px]">
          <AppBadgeStatus :variant="variant" :datetime="datetime" />
        </div>
      </div>
    `,
  }),
}
