import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppPasswordStrength from './AppPasswordStrength.vue'
import AppProgressBar from './AppProgressBar.vue'

const meta: Meta<typeof AppPasswordStrength> = {
  component: AppPasswordStrength,
  title: 'Atoms/AppPasswordStrength',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'パスワード強度を示すラベルバッジコンポーネント（Atom）。',
          'Figma node-id: `1000:53908`（PasswordStrength）',
          '',
          '4段階の強度レベルに応じた背景色とラベルテキストを表示する。',
          '- `short`（赤）: パスワードが短すぎます — 幅 auto',
          '- `weak`（オレンジ）: 弱い — 幅 180px',
          '- `normal`（茶）: 普通 — 幅 180px',
          '- `strong`（緑）: 強い — 幅 180px',
          '',
          'ProgressBar とセットで使用することで、パスワード強度インジケーターを構成できる。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['short', 'weak', 'normal', 'strong'],
      description: 'パスワード強度レベル',
    },
  },
  args: {
    type: 'weak',
  },
}

export default meta
type Story = StoryObj<typeof AppPasswordStrength>

// --- 各バリアント ---

export const Short: Story = {
  name: 'short（パスワードが短すぎます）',
  args: { type: 'short' },
}

export const Weak: Story = {
  name: 'weak（弱い）',
  args: { type: 'weak' },
}

export const Normal: Story = {
  name: 'normal（普通）',
  args: { type: 'normal' },
}

export const Strong: Story = {
  name: 'strong（強い）',
  args: { type: 'strong' },
}

// --- 全バリアント一覧 ---

export const AllVariants: Story = {
  name: '全バリアント一覧',
  render: () => ({
    components: { AppPasswordStrength },
    template: `
      <div class="p-4 space-y-3 font-sans">
        <div v-for="item in variants" :key="item.type" class="space-y-1">
          <p class="text-xs text-slate-500">{{ item.label }}</p>
          <AppPasswordStrength :type="item.type" />
        </div>
      </div>
    `,
    setup() {
      const variants = [
        { type: 'short', label: 'short — 幅 auto、背景 red-500' },
        { type: 'weak',  label: 'weak — 幅 180px、背景 orange-500' },
        { type: 'normal', label: 'normal — 幅 180px、背景 #713f12' },
        { type: 'strong', label: 'strong — 幅 180px、背景 green-500' },
      ]
      return { variants }
    },
  }),
}

// --- ProgressBar とのセット使用例 ---

export const WithProgressBar: Story = {
  name: 'ProgressBar とのセット使用例',
  render: () => ({
    components: { AppPasswordStrength, AppProgressBar },
    template: `
      <div class="p-4 space-y-4 font-sans w-64">
        <div v-for="item in examples" :key="item.type" class="space-y-1">
          <p class="text-xs text-slate-500">{{ item.label }}</p>
          <AppProgressBar :progress="item.progress" :status="item.status" />
          <AppPasswordStrength :type="item.type" />
        </div>
      </div>
    `,
    setup() {
      const examples = [
        { type: 'short',  progress: 10, status: 'danger',  label: 'パスワード入力中（短すぎ）' },
        { type: 'weak',   progress: 30, status: 'danger',  label: 'パスワード入力中（弱い）' },
        { type: 'normal', progress: 60, status: 'warning', label: 'パスワード入力中（普通）' },
        { type: 'strong', progress: 90, status: 'success', label: 'パスワード入力中（強い）' },
      ]
      return { examples }
    },
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppPasswordStrength, AppProgressBar },
    setup() {
      const type = ref<'short' | 'weak' | 'normal' | 'strong'>('weak')
      const types = ['short', 'weak', 'normal', 'strong'] as const
      const progressMap = { short: 10, weak: 30, normal: 60, strong: 90 }
      const statusMap = { short: 'danger', weak: 'danger', normal: 'warning', strong: 'success' } as const
      return { type, types, progressMap, statusMap }
    },
    template: `
      <div class="p-4 space-y-4 font-sans w-64">
        <div class="space-y-2">
          <label class="text-xs text-slate-500">type を切り替え</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="t in types"
              :key="t"
              @click="type = t"
              :class="['px-2 py-1 text-xs rounded border', type === t ? 'bg-slate-800 text-white' : 'bg-white text-slate-600']"
            >{{ t }}</button>
          </div>
        </div>
        <AppProgressBar :progress="progressMap[type]" :status="statusMap[type]" />
        <AppPasswordStrength :type="type" />
      </div>
    `,
  }),
}
