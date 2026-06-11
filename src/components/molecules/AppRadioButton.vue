<script setup lang="ts">
import { computed } from 'vue'
import BaseRadioInput from '@/components/atoms/BaseRadioInput.vue'
import BaseControlLabel from '@/components/atoms/BaseControlLabel.vue'

// ラジオボタン Molecule コンポーネント
// BaseRadioInput（Atom）にラベルとボックス装飾を付加する
// Figma: RadioButton/Text（917:52673）・RadioButton/Box（917:53007）

interface Props {
  // テキスト形式（ラベルのみ）またはボックス形式（枠付き）
  variant?: 'text' | 'box'
  // ラベルテキスト
  label: string
  // このラジオボタンが表す値
  value: string | number | boolean
  // グループ識別子（同グループのボタンで共通にする）
  name: string
  // 無効状態
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'text',
  disabled: false,
})

// v-model バインディング（defineModel マクロ使用）
const model = defineModel<string | number | boolean>()

// 選択中かどうか（ボックス variant のスタイル切り替えに使用）
const isSelected = computed(() => model.value === props.value)
</script>

<template>
  <!-- クリックで内包する BaseRadioInput を切り替え -->
  <label
    :class="[
      'inline-flex items-center gap-2 cursor-pointer select-none h-9 px-3',
      variant === 'box' && [
        'w-[180px] rounded-[6px] border',
        isSelected
          ? 'border-btn-primary bg-surface-selected'
          : 'border-[#e5e5e5] bg-white',
      ],
      disabled && 'cursor-not-allowed opacity-50',
    ]"
  >
    <BaseRadioInput
      v-model="model"
      :value="value"
      :name="name"
      :disabled="disabled"
    />
    <!-- ラベルテキスト: text=normal(400)、box=medium(500) -->
    <BaseControlLabel
      :label="label"
      :weight="variant === 'box' ? 'medium' : 'normal'"
    />
  </label>
</template>
