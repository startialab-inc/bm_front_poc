import type { Meta, StoryObj } from '@storybook/vue3'
import AppPagerNav from './AppPagerNav.vue'
import type { NavType } from './AppPagerNav.vue'

const meta: Meta<typeof AppPagerNav> = {
  title: 'Atoms/AppPagerNav',
  component: AppPagerNav,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['first', 'prev', 'next', 'last'] satisfies NavType[],
    },
    current: { control: 'number' },
    total: { control: 'number' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof AppPagerNav>

// ---- first ----
export const FirstActive: Story = {
  name: 'First（有効）',
  args: { type: 'first', current: 5, total: 10 },
}

export const FirstDisabled: Story = {
  name: 'First（無効: 1ページ目）',
  args: { type: 'first', current: 1, total: 10 },
}

// ---- prev ----
export const PrevActive: Story = {
  name: 'Prev（有効）',
  args: { type: 'prev', current: 5, total: 10 },
}

export const PrevDisabled: Story = {
  name: 'Prev（無効: 1ページ目）',
  args: { type: 'prev', current: 1, total: 10 },
}

// ---- next ----
export const NextActive: Story = {
  name: 'Next（有効）',
  args: { type: 'next', current: 5, total: 10 },
}

export const NextDisabled: Story = {
  name: 'Next（無効: 最終ページ）',
  args: { type: 'next', current: 10, total: 10 },
}

// ---- last ----
export const LastActive: Story = {
  name: 'Last（有効）',
  args: { type: 'last', current: 5, total: 10 },
}

export const LastDisabled: Story = {
  name: 'Last（無効: 最終ページ）',
  args: { type: 'last', current: 10, total: 10 },
}

// ---- 明示的 disabled ----
export const ExplicitDisabled: Story = {
  name: '明示的 disabled（next・中間ページ）',
  args: { type: 'next', current: 5, total: 10, disabled: true },
}

// ---- 全種類を並べたデモ ----
export const AllTypes: Story = {
  name: '全種類（有効）',
  render: () => ({
    components: { AppPagerNav },
    template: `
      <div class="flex items-center gap-4 p-4">
        <AppPagerNav type="first" :current="5" :total="10" />
        <AppPagerNav type="prev"  :current="5" :total="10" />
        <AppPagerNav type="next"  :current="5" :total="10" />
        <AppPagerNav type="last"  :current="5" :total="10" />
      </div>
    `,
  }),
}

export const AllTypesDisabled: Story = {
  name: '全種類（無効）',
  render: () => ({
    components: { AppPagerNav },
    template: `
      <div class="flex items-center gap-4 p-4">
        <AppPagerNav type="first" :current="1" :total="10" />
        <AppPagerNav type="prev"  :current="1" :total="10" />
        <AppPagerNav type="next"  :current="10" :total="10" />
        <AppPagerNav type="last"  :current="10" :total="10" />
      </div>
    `,
  }),
}
