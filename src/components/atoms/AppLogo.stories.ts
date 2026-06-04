import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppLogo from './AppLogo.vue'

const meta: Meta<typeof AppLogo> = {
  component: AppLogo,
  title: 'Atoms/AppLogo',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'BlueMonkey ブランドロゴコンポーネント（Atom）。',
          'Figma node-id: `308:6387`（logo）',
          '',
          '`variant` prop でロゴの表示形式を切り替えます:',
          '- `landscape`: 横並びロゴ（マーク + テキスト）。160×48px。',
          '- `portrait`: 縦積みロゴ（マーク + テキスト）。160×170px。',
          '- `square`: アイコンのみ。40×40px。サイドバー折りたたみ時などに使用。',
          '',
          '`public/assets/images/logo/` に配置した SVG ファイルを参照します。',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['landscape', 'portrait', 'square'],
      description: 'ロゴの表示形式（landscape / portrait / square）',
    },
  },
  args: {
    variant: 'landscape',
  },
}

export default meta
type Story = StoryObj<typeof AppLogo>

// --- バリアント ---

export const Landscape: Story = {
  name: '横並び（Landscape）',
  args: { variant: 'landscape' },
}

export const Portrait: Story = {
  name: '縦積み（Portrait）',
  args: { variant: 'portrait' },
}

export const Square: Story = {
  name: 'アイコンのみ（Square）',
  args: { variant: 'square' },
}

// --- 全バリアント横並びデモ ---

export const AllVariants: Story = {
  name: '全バリアント比較',
  render: () => ({
    components: { AppLogo },
    template: `
      <div class="p-6 space-y-8 font-sans bg-slate-100">
        <div class="flex items-start gap-10 flex-wrap">
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Landscape</span>
            <div class="bg-white p-4 rounded shadow-sm inline-flex">
              <AppLogo variant="landscape" />
            </div>
            <span class="text-xs text-slate-400">160 × 48px</span>
          </div>
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Portrait</span>
            <div class="bg-white p-4 rounded shadow-sm inline-flex">
              <AppLogo variant="portrait" />
            </div>
            <span class="text-xs text-slate-400">160 × 170px</span>
          </div>
          <div class="flex flex-col items-start gap-3">
            <span class="text-xs font-medium text-slate-500 uppercase tracking-wide">Square</span>
            <div class="bg-white p-4 rounded shadow-sm inline-flex">
              <AppLogo variant="square" />
            </div>
            <span class="text-xs text-slate-400">40 × 40px</span>
          </div>
        </div>
      </div>
    `,
  }),
}
