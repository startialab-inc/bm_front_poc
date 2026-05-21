import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppTooltip from './AppTooltip.vue'

const meta: Meta<typeof AppTooltip> = {
  component: AppTooltip,
  title: 'Atoms/AppTooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ツールチップコンポーネント（Atom）。スロットにトリガー要素を渡し、ホバー・クリック・手動で表示制御できる。\n\n' +
          '- **trigger="hover"**（デフォルト）: マウスオーバーで表示\n' +
          '- **trigger="click"**: クリックで表示/非表示トグル\n' +
          '- **trigger="manual"**: `show()` / `hide()` / `toggle()` を外から呼び出して制御\n' +
          '- **placement**: `top`（デフォルト）/ `bottom` / `left` / `right`\n' +
          '- **width**: 未指定で `auto`。`"146px"` 等で固定幅にできる（Figma 準拠値）\n' +
          '- **offset**: トリガー要素とツールチップの追加オフセット（px 数値、デフォルト 0）\n\n' +
          'Figma node-id: 619:13590',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'manual'],
    },
    width: { control: 'text' },
    offset: { control: 'number' },
  },
  args: {
    text: 'ツールチップ',
    placement: 'top',
    trigger: 'hover',
    width: undefined,
    offset: 0,
  },
}

export default meta
type Story = StoryObj<typeof AppTooltip>

// =====================================================
// デフォルト（hover / placement: top）
// =====================================================

export const Default: Story = {
  name: 'デフォルト（hover / top）',
  render: (args) => ({
    components: { AppTooltip },
    setup() { return { args } },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip v-bind="args">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">ホバーしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

// =====================================================
// placement バリアント
// =====================================================

export const PlacementBottom: Story = {
  name: 'placement="bottom"',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip text="下に表示" placement="bottom">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">ホバーしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

export const PlacementLeft: Story = {
  name: 'placement="left"',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip text="左に表示" placement="left">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">ホバーしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

export const PlacementRight: Story = {
  name: 'placement="right"',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip text="右に表示" placement="right">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">ホバーしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

// =====================================================
// trigger バリアント
// =====================================================

export const TriggerClick: Story = {
  name: 'trigger="click"（クリックで表示/非表示）',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip text="クリックで表示" trigger="click">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">クリックしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

export const TriggerManual: Story = {
  name: 'trigger="manual"（外部から show/hide 制御）',
  render: () => ({
    components: { AppTooltip },
    setup() {
      const tooltipRef = ref<InstanceType<typeof AppTooltip> | null>(null)
      function show() { tooltipRef.value?.show() }
      function hide() { tooltipRef.value?.hide() }
      function toggle() { tooltipRef.value?.toggle() }
      return { tooltipRef, show, hide, toggle }
    },
    template: `
      <div class="p-16 flex flex-col items-center gap-4">
        <AppTooltip ref="tooltipRef" text="手動制御のツールチップ" trigger="manual">
          <span class="px-3 py-1.5 rounded bg-slate-200 text-sm">ターゲット要素</span>
        </AppTooltip>
        <div class="flex gap-2">
          <button @click="show" class="px-3 py-1.5 rounded bg-blue-500 text-white text-sm">show()</button>
          <button @click="hide" class="px-3 py-1.5 rounded bg-slate-500 text-white text-sm">hide()</button>
          <button @click="toggle" class="px-3 py-1.5 rounded bg-emerald-500 text-white text-sm">toggle()</button>
        </div>
      </div>
    `,
  }),
}

// =====================================================
// width 指定あり（Figma 準拠: 146px）
// =====================================================

export const WithWidth: Story = {
  name: 'width="146px"（Figma 準拠幅）',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-16 flex justify-center">
        <AppTooltip text="Figma 準拠の幅 146px" width="146px">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">ホバーしてね</button>
        </AppTooltip>
      </div>
    `,
  }),
}

// =====================================================
// 全方向一覧
// =====================================================

export const AllPlacements: Story = {
  name: '4方向一覧',
  render: () => ({
    components: { AppTooltip },
    template: `
      <div class="p-24 grid grid-cols-2 gap-16 place-items-center">
        <AppTooltip text="top（デフォルト）" placement="top">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">top</button>
        </AppTooltip>
        <AppTooltip text="bottom" placement="bottom">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">bottom</button>
        </AppTooltip>
        <AppTooltip text="left" placement="left">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">left</button>
        </AppTooltip>
        <AppTooltip text="right" placement="right">
          <button class="px-3 py-1.5 rounded bg-slate-200 text-sm">right</button>
        </AppTooltip>
      </div>
    `,
  }),
}
