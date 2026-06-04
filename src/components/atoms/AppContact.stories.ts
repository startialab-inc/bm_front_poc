import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppContact from './AppContact.vue'

const meta: Meta<typeof AppContact> = {
  component: AppContact,
  title: 'Atoms/AppContact',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'サポートチャット等へのコンタクトボタンコンポーネント（Atom）。',
          'Figma node-id: `520:12941`（Contact）',
          '',
          '単一バリアント・props なし。',
          '青い円形背景（`#2862cb`）+ 白い吹き出しアイコン SVG を重ねた構成。',
          '`public/assets/images/contact.svg` を参照します。',
          '',
          'サイドバー下部など、固定位置に配置して使用することを想定しています。',
        ].join('\n'),
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppContact>

// --- デフォルト表示 ---

export const Default: Story = {
  name: 'デフォルト',
}

// --- 背景違いで比較 ---

export const OnDifferentBackgrounds: Story = {
  name: '各種背景での表示確認',
  render: () => ({
    components: { AppContact },
    template: `
      <div class="p-6 space-y-6 font-sans">
        <div class="flex items-center gap-8 flex-wrap">
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">白背景</span>
            <div class="bg-white p-6 rounded shadow-sm">
              <AppContact />
            </div>
          </div>
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">グレー背景</span>
            <div class="bg-slate-100 p-6 rounded shadow-sm">
              <AppContact />
            </div>
          </div>
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">サイドバー背景（#1b4187）</span>
            <div class="bg-[#1b4187] p-6 rounded shadow-sm">
              <AppContact />
            </div>
          </div>
          <div class="flex flex-col items-center gap-3">
            <span class="text-xs font-medium text-slate-500">ダーク背景</span>
            <div class="bg-slate-800 p-6 rounded shadow-sm">
              <AppContact />
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-400">サイズ: 64 × 64px</p>
      </div>
    `,
  }),
}
