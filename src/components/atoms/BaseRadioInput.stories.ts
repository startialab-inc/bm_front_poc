import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BaseRadioInput from './BaseRadioInput.vue'

const meta: Meta<typeof BaseRadioInput> = {
  component: BaseRadioInput,
  title: 'Atoms/BaseRadioInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ラジオボタンの基礎入力コンポーネント（Atom）。\n\n`value` で選択値を、`name` でグループを指定する。`v-model` で選択中の値を双方向バインディングできる。\n\n選択時は青い丸（`bg-btn-primary`）＋内側に白い丸（box-shadow）で表現。disabled 状態では半透明になり操作不可となる。\n\nMolecule の `AppRadioButton.vue` がこのコンポーネントをラップして Text / Box バリアントを実現する。',
      },
    },
  },
  argTypes: {
    value: { control: 'text' },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    modelValue: { control: 'text' },
  },
  args: {
    value: 'option1',
    name: 'demo',
    disabled: false,
    modelValue: '',
  },
}

export default meta
type Story = StoryObj<typeof BaseRadioInput>

// =====================================================
// 基本状態
// =====================================================

export const Default: Story = {
  name: 'Default（未選択）',
  args: {
    modelValue: '',
    value: 'option1',
    name: 'default-group',
  },
}

export const Checked: Story = {
  name: 'Checked（選択済み）',
  args: {
    modelValue: 'option1',
    value: 'option1',
    name: 'checked-group',
  },
}

export const Disabled: Story = {
  name: 'Disabled（未選択・操作不可）',
  args: {
    modelValue: '',
    value: 'option1',
    name: 'disabled-group',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'DisabledChecked（選択済み・操作不可）',
  args: {
    modelValue: 'option1',
    value: 'option1',
    name: 'disabled-checked-group',
    disabled: true,
  },
}

// =====================================================
// グループ選択デモ
// =====================================================

export const RadioGroup: Story = {
  name: 'グループ選択（同一 name で相互排他）',
  render: () => ({
    components: { BaseRadioInput },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div class="flex flex-col gap-3 p-4">
        <p class="text-sm text-slate-600">選択中: <strong>{{ selected }}</strong></p>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseRadioInput v-model="selected" value="option1" name="group-demo" />
          <span>オプション 1</span>
        </label>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseRadioInput v-model="selected" value="option2" name="group-demo" />
          <span>オプション 2</span>
        </label>
        <label class="flex items-center gap-2 text-sm cursor-pointer">
          <BaseRadioInput v-model="selected" value="option3" name="group-demo" />
          <span>オプション 3</span>
        </label>
      </div>
    `,
  }),
}
