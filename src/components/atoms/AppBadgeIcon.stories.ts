import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppBadgeIcon from './AppBadgeIcon.vue'

const meta: Meta<typeof AppBadgeIcon> = {
  component: AppBadgeIcon,
  title: 'Atoms/AppBadgeIcon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'バッジアイコンコンポーネント（Atom）。',
          'Figma node-id: `538:11930`（Badge/PageSettingIcon）',
          '',
          '24px の丸型アイコンバッジ。7種類のタイプ × active/inactive の組み合わせで計14バリアント。',
          '`type` prop でアイコンの種類を、`active` prop で有効/無効状態を切り替えます。',
          'BowNow タイプのみ FontAwesome ではなく画像アセット（`/assets/images/bow-now-*.svg`）を使用します。',
          'BowNow / BowNowScript の active 時は背景が深紅（#5a0000）になります。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'BowNow', 'Curation'],
      description: 'バッジのタイプ',
      table: {
        defaultValue: { summary: '—（必須）' },
      },
    },
    active: {
      control: 'boolean',
      description: 'アクティブ状態（true: 有効、false: 無効）',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    type: 'PageSetting',
    active: true,
  },
}

export default meta
type Story = StoryObj<typeof AppBadgeIcon>

// --- 個別タイプ（active） ---

export const Contact: Story = {
  name: 'Contact（コンタクト）',
  args: { type: 'Contact', active: true },
}

export const Editable: Story = {
  name: 'Editable（編集可能）',
  args: { type: 'Editable', active: true },
}

export const PageSetting: Story = {
  name: 'PageSetting（ページ設定）',
  args: { type: 'PageSetting', active: true },
}

export const OpenTerm: Story = {
  name: 'OpenTerm（公開期間）',
  args: { type: 'OpenTerm', active: true },
}

export const BowNowScript: Story = {
  name: 'BowNowScript（スクリプト）',
  args: { type: 'BowNowScript', active: true },
}

export const BowNow: Story = {
  name: 'BowNow（画像アセット）',
  args: { type: 'BowNow', active: true },
}

export const Curation: Story = {
  name: 'Curation（キュレーション）',
  args: { type: 'Curation', active: true },
}

// --- 全タイプ一覧（active / inactive 対比） ---

export const AllTypes: Story = {
  name: '全タイプ一覧（active / inactive 対比）',
  render: () => ({
    components: { AppBadgeIcon },
    setup() {
      const types = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'BowNow', 'Curation'] as const
      return { types }
    },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="grid grid-cols-7 gap-4">
          <div v-for="t in types" :key="t" class="flex flex-col items-center gap-2">
            <AppBadgeIcon :type="t" :active="true" />
            <AppBadgeIcon :type="t" :active="false" />
            <span class="text-[10px] text-slate-400 text-center leading-tight">{{ t }}</span>
          </div>
        </div>
        <div class="flex gap-4 text-[10px] text-slate-400">
          <span>上段: active=true</span>
          <span>下段: active=false</span>
        </div>
      </div>
    `,
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppBadgeIcon },
    setup() {
      const type = ref<'Contact' | 'Editable' | 'PageSetting' | 'OpenTerm' | 'BowNowScript' | 'BowNow' | 'Curation'>('PageSetting')
      const active = ref(true)
      const types = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'BowNow', 'Curation'] as const
      return { type, active, types }
    },
    template: `
      <div class="p-4 space-y-4 font-sans">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="t in types"
            :key="t"
            @click="type = t"
            class="text-xs border rounded px-2 py-1 transition-colors"
            :class="type === t
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'"
          >{{ t }}</button>
        </div>
        <div class="flex items-center gap-3">
          <label class="text-xs text-slate-500">active:</label>
          <button
            @click="active = !active"
            class="text-xs border rounded px-3 py-1 transition-colors"
            :class="active
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-600 border-slate-300'"
          >{{ active ? 'true' : 'false' }}</button>
        </div>
        <div class="flex items-center justify-center bg-slate-50 rounded-lg p-8 min-h-[80px]">
          <AppBadgeIcon :type="type" :active="active" />
        </div>
      </div>
    `,
  }),
}
