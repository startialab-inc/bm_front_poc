import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppSwitch from './AppSwitch.vue'

const meta: Meta<typeof AppSwitch> = {
  component: AppSwitch,
  title: 'Atoms/AppSwitch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'トグルスイッチコンポーネント（Atom）。ON/OFF の2バリアントを持ち、`v-model` で状態を制御する。\n\n' +
          '- **ON**: 背景色 `#34d399`（緑）、つまみが右端\n' +
          '- **OFF**: 背景色 `#e2e8f0`（グレー）、つまみが左端\n' +
          '- つまみは `position: absolute` + `left` の CSS `transition` でアニメーションする\n\n' +
          'Figma node-id: 849:2931',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'boolean' },
  },
  args: {
    modelValue: false,
  },
}

export default meta
type Story = StoryObj<typeof AppSwitch>

// =====================================================
// バリアント
// =====================================================

export const Off: Story = {
  name: 'OFF（デフォルト）',
  args: {
    modelValue: false,
  },
}

export const On: Story = {
  name: 'ON',
  args: {
    modelValue: true,
  },
}

// =====================================================
// インタラクティブデモ（v-model でリアルタイム切り替え）
// =====================================================

export const Interactive: Story = {
  name: 'インタラクティブ（クリックで ON/OFF 切り替え）',
  render: () => ({
    components: { AppSwitch },
    setup() {
      const isOn = ref(false)
      return { isOn }
    },
    template: `
      <div class="p-6 flex flex-col items-center gap-4">
        <AppSwitch v-model="isOn" />
        <p class="text-sm text-slate-600">
          状態: <span class="font-semibold" :class="isOn ? 'text-emerald-600' : 'text-slate-400'">{{ isOn ? 'ON' : 'OFF' }}</span>
        </p>
      </div>
    `,
  }),
}

// =====================================================
// 複数スイッチの並列表示
// =====================================================

export const MultipleGroup: Story = {
  name: 'ON/OFF 並列表示',
  render: () => ({
    components: { AppSwitch },
    template: `
      <div class="p-6 flex items-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <AppSwitch :model-value="false" />
          <p class="text-[10px] text-slate-400">OFF（modelValue=false）</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AppSwitch :model-value="true" />
          <p class="text-[10px] text-slate-400">ON（modelValue=true）</p>
        </div>
      </div>
    `,
  }),
}
