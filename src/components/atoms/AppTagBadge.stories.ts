import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppTagBadge from './AppTagBadge.vue'

const meta: Meta<typeof AppTagBadge> = {
  component: AppTagBadge,
  title: 'Atoms/AppTagBadge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'タグバッジコンポーネント（Atom）。',
          'Figma node-id: `621:17779`（Badge/Tag）',
          '',
          '`label` prop に表示するテキストを渡します。単一バリアントで、白背景・グレー枠の小型タグバッジです。',
          '10px の小さいフォントサイズで、ページ内のタグ表示に使用します。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'バッジに表示するテキスト',
      table: {
        defaultValue: { summary: '—（必須）' },
      },
    },
  },
  args: {
    label: 'タグ',
  },
}

export default meta
type Story = StoryObj<typeof AppTagBadge>

// --- ラベルバリエーション ---

export const Default: Story = {
  name: 'デフォルト',
  args: { label: 'タグ' },
}

export const ShortLabel: Story = {
  name: '短いラベル',
  args: { label: 'A' },
}

export const MediumLabel: Story = {
  name: '中程度のラベル',
  args: { label: 'カテゴリ' },
}

export const LongLabel: Story = {
  name: '長いラベル',
  args: { label: 'とても長いタグ名のサンプル' },
}

// --- 複数タグ並列表示 ---

export const AllVariants: Story = {
  name: '複数タグ並列表示',
  render: () => ({
    components: { AppTagBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2 p-4">
        <AppTagBadge label="タグ" />
        <AppTagBadge label="カテゴリ" />
        <AppTagBadge label="ニュース" />
        <AppTagBadge label="お知らせ" />
        <AppTagBadge label="プレスリリース" />
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppTagBadge },
    setup() {
      const label = ref('タグ')
      return { label }
    },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="flex items-center gap-3">
          <label class="text-xs text-slate-500 shrink-0">テキスト：</label>
          <input
            v-model="label"
            type="text"
            class="text-xs border border-slate-300 rounded px-2 py-1 w-40"
          />
        </div>
        <div class="flex items-center justify-center bg-slate-50 rounded-lg p-6 min-h-[80px]">
          <AppTagBadge :label="label" />
        </div>
      </div>
    `,
  }),
}
