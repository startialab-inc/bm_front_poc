import type { Meta, StoryObj } from '@storybook/vue3'
import AppBlockEditMenu from './AppBlockEditMenu.vue'

const meta: Meta<typeof AppBlockEditMenu> = {
  title: 'Molecules/AppBlockEditMenu',
  component: AppBlockEditMenu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['unselect', 'select'],
      description: "メニューのバリアント。'unselect': 未選択時、'select': ブロック選択時",
    },
  },
}

export default meta
type Story = StoryObj<typeof AppBlockEditMenu>

/** Unselect バリアント（デフォルト）: 4項目 + フッターヘルプ */
export const Unselect: Story = {
  name: 'Unselect（未選択時）',
  args: {
    variant: 'unselect',
  },
}

/** Select バリアント: 9項目 */
export const Select: Story = {
  name: 'Select（ブロック選択時）',
  args: {
    variant: 'select',
  },
}
