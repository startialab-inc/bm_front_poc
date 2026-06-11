import type { Meta, StoryObj } from '@storybook/vue3'
import AppFavoriteBlock from './AppFavoriteBlock.vue'

const meta: Meta<typeof AppFavoriteBlock> = {
  title: 'Molecules/AppFavoriteBlock',
  component: AppFavoriteBlock,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'ブロックタイトル',
    },
    selected: {
      control: 'boolean',
      description: '選択状態',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppFavoriteBlock>

/** デフォルト（未選択）状態 */
export const Default: Story = {
  args: {
    title: 'ブロックタイトル',
    selected: false,
  },
}

/** 選択済み状態 */
export const Selected: Story = {
  args: {
    title: 'ブロックタイトル',
    selected: true,
  },
}

/** カスタムタイトル */
export const CustomTitle: Story = {
  args: {
    title: 'トップページ用ブロック',
    selected: false,
  },
}

/** カスタムタイトル + 選択済み */
export const CustomTitleSelected: Story = {
  args: {
    title: 'トップページ用ブロック',
    selected: true,
  },
}
