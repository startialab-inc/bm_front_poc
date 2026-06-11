import type { Meta, StoryObj } from '@storybook/vue3'
import AppBlockEditMenuCell from './AppBlockEditMenuCell.vue'

const meta: Meta<typeof AppBlockEditMenuCell> = {
  title: 'Molecules/AppBlockEditMenuCell',
  component: AppBlockEditMenuCell,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'FontAwesome クラス文字列（例: fa-solid fa-plus）',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppBlockEditMenuCell>

/** デフォルト（icon・label 空） */
export const Default: Story = {
  args: {},
}

/** ブロック追加 */
export const BlockAdd: Story = {
  name: 'ブロック追加',
  args: {
    icon: 'fa-solid fa-plus',
    label: 'ブロック追加',
  },
}

/** ファイルアップロード */
export const FileUpload: Story = {
  name: 'ファイルアップロード',
  args: {
    icon: 'fa-solid fa-image',
    label: 'ファイルアップロード',
  },
}

/** BlockEditMenu（Unselect）のメニュー項目一覧 */
export const UnselectMenu: Story = {
  name: 'Unselect メニュー一覧',
  render: () => ({
    components: { AppBlockEditMenuCell },
    template: `
      <div class="flex gap-1 bg-[#1b4187] p-2">
        <AppBlockEditMenuCell icon="fa-solid fa-plus" label="ブロック追加" />
        <AppBlockEditMenuCell icon="fa-solid fa-image" label="ファイルアップロード" />
        <AppBlockEditMenuCell icon="fa-solid fa-shapes" label="ダウンロードブロック" />
        <AppBlockEditMenuCell icon="fa-solid fa-file" label="ページテンプレート" />
      </div>
    `,
  }),
}

/** BlockEditMenu（Select）のメニュー項目一覧 */
export const SelectMenu: Story = {
  name: 'Select メニュー一覧',
  render: () => ({
    components: { AppBlockEditMenuCell },
    template: `
      <div class="flex flex-wrap gap-1 bg-[#1b4187] p-2 w-[400px]">
        <AppBlockEditMenuCell icon="fa-solid fa-clone" label="ブロックコピー" />
        <AppBlockEditMenuCell icon="fa-solid fa-image" label="ファイルアップロード" />
        <AppBlockEditMenuCell icon="fa-solid fa-eye-slash" label="ブロック非表示" />
        <AppBlockEditMenuCell icon="fa-solid fa-pencil" label="ブロック編集" />
        <AppBlockEditMenuCell icon="fa-solid fa-plus" label="ブロック追加" />
        <AppBlockEditMenuCell icon="fa-solid fa-star" label="お気に入りに追加" />
        <AppBlockEditMenuCell icon="fa-solid fa-circle-arrow-down" label="ダウンロードブロック" />
        <AppBlockEditMenuCell icon="fa-solid fa-trash" label="ブロック削除" />
        <AppBlockEditMenuCell icon="fa-solid fa-lock" label="ブロックロック" />
      </div>
    `,
  }),
}
