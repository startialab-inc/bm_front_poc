import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppProgressBar from './AppProgressBar.vue'

const meta: Meta<typeof AppProgressBar> = {
  component: AppProgressBar,
  title: 'Atoms/AppProgressBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '進捗を示すプログレスバーコンポーネント（Atom）。',
          'Figma node-id: `955:48818`（ProgressBar）',
          '',
          'トラック（グレー背景）とフィル（色付き）の2層構造。',
          '- `progress`（0〜100）でフィルの幅を制御する',
          '- `status` でフィルの色を切り替える（`default` / `info` / `success` / `warning` / `danger`）',
          '- `animated=true` でアニメーションストライプを表示する（Bootstrap 準拠）',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '進捗パーセンテージ（0〜100）',
    },
    status: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'danger'],
      description: 'フィルの色',
    },
    animated: {
      control: 'boolean',
      description: 'アニメーションストライプを表示する',
    },
  },
  args: {
    progress: 25,
    status: 'default',
    animated: false,
  },
}

export default meta
type Story = StoryObj<typeof AppProgressBar>

// --- 進捗値バリアント ---

export const Default: Story = {
  name: 'デフォルト（25%）',
  args: { progress: 25, status: 'default' },
}

export const InfoStatus: Story = {
  name: 'Info（50%）',
  args: { progress: 50, status: 'info' },
}

export const SuccessStatus: Story = {
  name: 'Success（75%）',
  args: { progress: 75, status: 'success' },
}

export const WarningStatus: Story = {
  name: 'Warning（60%）',
  args: { progress: 60, status: 'warning' },
}

export const DangerStatus: Story = {
  name: 'Danger（40%）',
  args: { progress: 40, status: 'danger' },
}

export const AnimatedStripesDemo: Story = {
  name: 'アニメーションストライプ',
  args: { progress: 60, status: 'default', animated: true },
}

// --- 全バリアント一覧 ---

export const AllVariants: Story = {
  name: '全バリアント一覧',
  render: () => ({
    components: { AppProgressBar },
    template: `
      <div class="p-4 space-y-4 font-sans w-80">
        <div v-for="item in variants" :key="item.status" class="space-y-1">
          <p class="text-xs text-slate-500">{{ item.label }}</p>
          <AppProgressBar :progress="50" :status="item.status" />
        </div>
      </div>
    `,
    setup() {
      const variants = [
        { status: 'default', label: 'default（#2862cb）' },
        { status: 'info',    label: 'info（cyan-500）' },
        { status: 'success', label: 'success（green-500）' },
        { status: 'warning', label: 'warning（yellow-500）' },
        { status: 'danger',  label: 'danger（red-500）' },
      ]
      return { variants }
    },
  }),
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => ({
    components: { AppProgressBar },
    setup() {
      const progress = ref(50)
      const status = ref<'default' | 'info' | 'success' | 'warning' | 'danger'>('default')
      const animated = ref(false)
      const statuses = ['default', 'info', 'success', 'warning', 'danger'] as const
      return { progress, status, animated, statuses }
    },
    template: `
      <div class="p-4 space-y-4 font-sans w-80">
        <div class="space-y-2">
          <label class="text-xs text-slate-500">progress: {{ progress }}</label>
          <input type="range" min="0" max="100" v-model.number="progress" class="w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-xs text-slate-500">status</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in statuses"
              :key="s"
              @click="status = s"
              :class="['px-2 py-1 text-xs rounded border', status === s ? 'bg-slate-800 text-white' : 'bg-white text-slate-600']"
            >{{ s }}</button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" id="animated-toggle" v-model="animated" />
          <label for="animated-toggle" class="text-xs text-slate-500">animated</label>
        </div>
        <AppProgressBar :progress="progress" :status="status" :animated="animated" />
      </div>
    `,
  }),
}
