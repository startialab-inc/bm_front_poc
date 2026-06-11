import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AppPagination from './AppPagination.vue'

const meta: Meta<typeof AppPagination> = {
  title: 'Molecules/AppPagination',
  component: AppPagination,
  tags: ['autodocs'],
  argTypes: {
    totalCount: { control: 'number' },
    totalPages: { control: 'number' },
    modelValue: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof AppPagination>

// 1ページ目: first/prev が disabled
export const Default: Story = {
  name: 'Default（1ページ目・first/prev disabled）',
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.modelValue ?? 1)
      return { page, args }
    },
    template: `
      <div class="p-6">
        <AppPagination
          v-model="page"
          :totalCount="args.totalCount"
          :totalPages="args.totalPages"
        />
        <p class="mt-4 text-sm text-gray-500">現在ページ: {{ page }}</p>
      </div>
    `,
  }),
  args: {
    totalCount: 42,
    totalPages: 10,
    modelValue: 1,
  },
}

// 中間ページ: 全矢印有効・省略記号あり
export const MiddlePage: Story = {
  name: '中間ページ（5/10・省略記号あり）',
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.modelValue ?? 5)
      return { page, args }
    },
    template: `
      <div class="p-6">
        <AppPagination
          v-model="page"
          :totalCount="args.totalCount"
          :totalPages="args.totalPages"
        />
        <p class="mt-4 text-sm text-gray-500">現在ページ: {{ page }}</p>
      </div>
    `,
  }),
  args: {
    totalCount: 42,
    totalPages: 10,
    modelValue: 5,
  },
}

// 最終ページ: next/last が disabled
export const LastPage: Story = {
  name: '最終ページ（10/10・next/last disabled）',
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.modelValue ?? 10)
      return { page, args }
    },
    template: `
      <div class="p-6">
        <AppPagination
          v-model="page"
          :totalCount="args.totalCount"
          :totalPages="args.totalPages"
        />
        <p class="mt-4 text-sm text-gray-500">現在ページ: {{ page }}</p>
      </div>
    `,
  }),
  args: {
    totalCount: 42,
    totalPages: 10,
    modelValue: 10,
  },
}

// 少数ページ: 省略記号なし
export const FewPages: Story = {
  name: '少数ページ（省略記号なし）',
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.modelValue ?? 1)
      return { page, args }
    },
    template: `
      <div class="p-6">
        <AppPagination
          v-model="page"
          :totalCount="args.totalCount"
          :totalPages="args.totalPages"
        />
        <p class="mt-4 text-sm text-gray-500">現在ページ: {{ page }}</p>
      </div>
    `,
  }),
  args: {
    totalCount: 15,
    totalPages: 3,
    modelValue: 1,
  },
}

// インタラクティブ: クリックでページ変更
export const Interactive: Story = {
  name: 'Interactive（ページ変更可能）',
  render: () => ({
    components: { AppPagination },
    setup() {
      const page = ref(1)
      const totalPages = 10
      const totalCount = 42
      return { page, totalPages, totalCount }
    },
    template: `
      <div class="p-6 space-y-4">
        <AppPagination v-model="page" :totalCount="totalCount" :totalPages="totalPages" />
        <div class="flex gap-2">
          <button
            v-for="p in totalPages"
            :key="p"
            :class="[
              'rounded px-2 py-1 text-xs',
              page === p ? 'bg-[#143166] text-white' : 'bg-gray-100 text-gray-700',
            ]"
            @click="page = p"
          >
            {{ p }}
          </button>
        </div>
        <p class="text-sm text-gray-500">現在ページ: {{ page }}</p>
      </div>
    `,
  }),
}
