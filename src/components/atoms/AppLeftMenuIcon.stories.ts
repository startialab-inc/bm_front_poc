import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppLeftMenuIcon from './AppLeftMenuIcon.vue'

const meta: Meta<typeof AppLeftMenuIcon> = {
  component: AppLeftMenuIcon,
  title: 'Atoms/AppLeftMenuIcon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '左メニューの開閉を切り替えるアイコンボタンコンポーネント（Atom）。',
          'Figma node-id: `411:7357`（Icon/LeftMenu）',
          '',
          '`status` prop でアイコンの表示を切り替えます:',
          '- `close`: サイドバーが開いているときに表示（panel-left アイコン）。',
          '- `open`: サイドバーが閉じているときに表示（panel-left-close アイコン）。',
          '',
          'クリックすると `toggle` イベントを emit します。',
          '内部状態は持たず、親コンポーネントが `status` prop を更新することで表示が切り替わります。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['close', 'open'],
      description: 'サイドバーの開閉状態（close: 開いている / open: 閉じている）',
    },
  },
  args: {
    status: 'close',
  },
}

export default meta
type Story = StoryObj<typeof AppLeftMenuIcon>

// --- バリアント ---

export const Close: Story = {
  name: 'サイドバー開き状態（Close）',
  args: { status: 'close' },
}

export const Open: Story = {
  name: 'サイドバー閉じ状態（Open）',
  args: { status: 'open' },
}

// --- インタラクティブデモ ---

export const Interactive: Story = {
  name: 'インタラクティブ（トグル動作確認）',
  render: () => ({
    components: { AppLeftMenuIcon },
    setup() {
      const status = ref<'close' | 'open'>('close')
      const toggle = () => {
        status.value = status.value === 'close' ? 'open' : 'close'
      }
      return { status, toggle }
    },
    template: `
      <div class="p-6 space-y-4 font-sans">
        <p class="text-sm text-slate-500">クリックするとトグルします（親が状態を管理）</p>
        <div class="flex items-center gap-4">
          <AppLeftMenuIcon :status="status" @toggle="toggle" />
          <span class="text-sm font-mono text-slate-600">status: "{{ status }}"</span>
        </div>
      </div>
    `,
  }),
}

// --- 全バリアント比較 ---

export const AllVariants: Story = {
  name: '全バリアント比較',
  render: () => ({
    components: { AppLeftMenuIcon },
    template: `
      <div class="p-6 space-y-6 font-sans">
        <div class="flex items-start gap-10 flex-wrap">
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Close</span>
            <div class="bg-white p-4 rounded shadow-sm inline-flex">
              <AppLeftMenuIcon status="close" />
            </div>
            <span class="text-xs text-slate-400">サイドバー開き状態</span>
          </div>
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Open</span>
            <div class="bg-white p-4 rounded shadow-sm inline-flex">
              <AppLeftMenuIcon status="open" />
            </div>
            <span class="text-xs text-slate-400">サイドバー閉じ状態</span>
          </div>
        </div>
      </div>
    `,
  }),
}
