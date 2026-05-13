import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BaseCheckboxInput from './BaseCheckboxInput.vue'

const meta: Meta<typeof BaseCheckboxInput> = {
  component: BaseCheckboxInput,
  title: 'Atoms/BaseCheckboxInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'チェックボックスの基礎入力コンポーネント（Atom）。\n\n`value` でチェックボックスが表す値を指定する。`v-model` で選択中の値を双方向バインディングできる。\n\nチェック済みの場合はブランド青（`bg-btn-primary`）＋白いチェックマーク、未チェックはグレー（`bg-btn-disable`）で表現。disabled 状態では半透明になり操作不可となる。\n\nMolecule の `AppCheckbox.vue` がこのコンポーネントをラップして、Font Awesome アイコン＋ラベルのビジュアルを実現する。',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    modelValue: { control: 'text' },
  },
  args: {
    value: 'option1',
    disabled: false,
    modelValue: '',
  },
}

export default meta
type Story = StoryObj<typeof BaseCheckboxInput>

// =====================================================
// 基本状態
// =====================================================

export const Default: Story = {
  name: 'Default（未チェック）',
  args: {
    modelValue: '',
    value: 'option1',
  },
}

export const Checked: Story = {
  name: 'Checked（チェック済み）',
  args: {
    modelValue: 'option1',
    value: 'option1',
  },
}

export const Disabled: Story = {
  name: 'Disabled（未チェック・操作不可）',
  args: {
    modelValue: '',
    value: 'option1',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'DisabledChecked（チェック済み・操作不可）',
  args: {
    modelValue: 'option1',
    value: 'option1',
    disabled: true,
  },
}

// =====================================================
// グループ選択デモ（複数チェックボックスで独立選択可）
// =====================================================

export const CheckboxGroup: Story = {
  name: 'グループ選択（複数同時チェック可）',
  render: () => ({
    components: { BaseCheckboxInput },
    setup() {
      const checkedA = ref('optionA')
      const checkedB = ref('')
      const checkedC = ref('optionC')
      return { checkedA, checkedB, checkedC }
    },
    template: `
      <div class="flex flex-col gap-3 p-4">
        <p class="text-sm text-slate-600 mb-2">複数のチェックボックスは互いに独立して選択できます</p>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseCheckboxInput v-model="checkedA" value="optionA" />
          <span>オプション A（初期: チェック済み）</span>
        </label>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseCheckboxInput v-model="checkedB" value="optionB" />
          <span>オプション B（初期: 未チェック）</span>
        </label>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseCheckboxInput v-model="checkedC" value="optionC" />
          <span>オプション C（初期: チェック済み）</span>
        </label>
        <p class="text-xs text-slate-400 mt-2">
          A: {{ checkedA || '（未選択）' }} / B: {{ checkedB || '（未選択）' }} / C: {{ checkedC || '（未選択）' }}
        </p>
      </div>
    `,
  }),
}
