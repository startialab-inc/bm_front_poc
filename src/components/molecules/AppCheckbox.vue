<script setup lang="ts">
import BaseCheckboxInput from '@/components/atoms/BaseCheckboxInput.vue'

// チェックボックス Molecule コンポーネント
// BaseCheckboxInput（Atom）にラベルを付加する
// Figma: Checkbox（917:53263）

interface Props {
  // ラベルテキスト
  label: string
  // このチェックボックスが表す値（boolean トグルの場合は true を指定）
  value?: string | number | boolean
  // 無効状態
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: true,
  disabled: false,
})

// v-model バインディング（defineModel マクロ使用）
const model = defineModel<string | number | boolean>()
</script>

<template>
  <!-- クリックで内包する BaseCheckboxInput を切り替え -->
  <label
    :class="[
      'inline-flex items-center gap-[6px] px-[2px] cursor-pointer select-none',
      disabled && 'cursor-not-allowed opacity-50',
    ]"
  >
    <BaseCheckboxInput
      v-model="model"
      :value="value"
      :disabled="disabled"
    />
    <span class="text-sm text-text-primary leading-none font-normal">
      {{ label }}
    </span>
  </label>
</template>
