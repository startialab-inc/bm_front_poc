import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AppTag from './AppTag.vue'

const meta: Meta<typeof AppTag> = {
  component: AppTag,
  title: 'Atoms/AppTag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'タグコンポーネント（Atom）。Figma node-id: `911:50285`\n\n`deletable` prop で2つのバリアントを切り替える。\n\n- `deletable=false`（デフォルト）: 削除ボタンなし・ボーダーあり（Figma: Undelete）\n- `deletable=true`: 削除ボタン（`fa-circle-xmark`）付き・ボーダーなし（Figma: Deleteable）\n\n削除ボタンクリック時は `delete` イベントを emit する。親コンポーネントでリストから除外するなどの処理を実装すること。',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    deletable: { control: 'boolean' },
  },
  args: {
    label: 'タグラベル',
    deletable: false,
  },
}

export default meta
type Story = StoryObj<typeof AppTag>

// =====================================================
// バリアント
// =====================================================

export const UndeleteDefault: Story = {
  name: 'Undelete（削除ボタンなし・ボーダーあり）',
  args: {
    label: 'タグラベル',
    deletable: false,
  },
}

export const DeleteableDefault: Story = {
  name: 'Deleteable（削除ボタンあり）',
  args: {
    label: 'タグラベル',
    deletable: true,
  },
}

// =====================================================
// インタラクティブデモ（削除イベント確認）
// =====================================================

export const DeleteableInteractive: Story = {
  name: 'Deleteable - インタラクティブ（削除操作デモ）',
  render: () => ({
    components: { AppTag },
    setup() {
      const tags = ref(['Vue 3', 'TypeScript', 'Tailwind CSS', 'Storybook'])
      const removeTag = (tag: string) => {
        tags.value = tags.value.filter(t => t !== tag)
      }
      return { tags, removeTag }
    },
    template: `
      <div class="p-4 space-y-4">
        <p class="text-sm text-slate-600">× ボタンをクリックするとタグが削除されます</p>
        <div class="flex flex-wrap gap-2">
          <AppTag
            v-for="tag in tags"
            :key="tag"
            :label="tag"
            :deletable="true"
            @delete="removeTag(tag)"
          />
        </div>
        <p v-if="tags.length === 0" class="text-sm text-slate-400">（タグがすべて削除されました）</p>
      </div>
    `,
  }),
}

// =====================================================
// 複数タグの並列表示
// =====================================================

export const TagList: Story = {
  name: '複数タグの並列表示',
  render: () => ({
    components: { AppTag },
    template: `
      <div class="p-4 space-y-4">
        <div>
          <p class="text-xs text-slate-500 mb-2">Undelete（ボーダーあり）</p>
          <div class="flex flex-wrap gap-2">
            <AppTag label="Vue 3" />
            <AppTag label="TypeScript" />
            <AppTag label="Tailwind CSS" />
          </div>
        </div>
        <div>
          <p class="text-xs text-slate-500 mb-2">Deleteable（削除ボタンあり）</p>
          <div class="flex flex-wrap gap-2">
            <AppTag label="Vue 3" :deletable="true" />
            <AppTag label="TypeScript" :deletable="true" />
            <AppTag label="Tailwind CSS" :deletable="true" />
          </div>
        </div>
      </div>
    `,
  }),
}
