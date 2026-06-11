import type { Meta, StoryObj } from '@storybook/vue3'
import AppContactItemType from './AppContactItemType.vue'
import type { ContactItemType } from './AppContactItemType.vue'

const meta: Meta<typeof AppContactItemType> = {
  title: 'Molecules/AppContactItemType',
  component: AppContactItemType,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'select' },
      options: [
        'default',
        'date',
        'year',
        'textbox',
        'textarea',
        'checkbox',
        'radiobutton',
        'selectbox',
        'file',
      ] satisfies ContactItemType[],
      description: '入力タイプ',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'フォーム項目の入力タイプを選択し、タイプに応じた追加オプションを表示する Molecule（Figma: ContactItemType 1793:71658）。',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default（姓名）',
  args: { modelValue: 'default' },
}

export const Date: Story = {
  name: 'Date（年月日）',
  args: { modelValue: 'date' },
}

export const Year: Story = {
  name: 'Year（年のみ）',
  args: { modelValue: 'year' },
}

export const Textbox: Story = {
  name: 'Textbox（テキストボックス1行）',
  args: { modelValue: 'textbox' },
}

export const Textarea: Story = {
  name: 'Textarea（テキストエリア複数行）',
  args: { modelValue: 'textarea' },
}

export const Checkbox: Story = {
  name: 'Checkbox（チェックボックス）',
  args: { modelValue: 'checkbox' },
}

export const Radiobutton: Story = {
  name: 'Radiobutton（ラジオボタン）',
  args: { modelValue: 'radiobutton' },
}

export const Selectbox: Story = {
  name: 'Selectbox（セレクトボックス）',
  args: { modelValue: 'selectbox' },
}

export const File: Story = {
  name: 'File（ファイル添付）',
  args: { modelValue: 'file' },
}

/** Controls パネルで type をリアルタイムに切り替えられるインタラクティブ Story */
export const Interactive: Story = {
  name: 'Interactive',
  args: { modelValue: 'default' },
}
