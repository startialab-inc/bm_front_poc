<script setup lang="ts">
// フォームコントロール（radio / checkbox / switch）に付属するテキストラベル Atom
// Molecule の AppRadioButton / AppCheckbox / AppSwitchLabel がこのコンポーネントを使用する

interface Props {
  // ラベルテキスト
  label: string
  // フォントウェイト（'normal': 400 / 'medium': 500）
  // AppRadioButton box variant のみ 'medium'、その他は 'normal'
  weight?: 'normal' | 'medium'
}

withDefaults(defineProps<Props>(), {
  weight: 'normal',
})
</script>

<template>
  <span
    :class="[
      'text-sm text-text-primary leading-none',
      weight === 'medium' ? 'font-medium' : 'font-normal',
    ]"
  >
    {{ label }}
  </span>
</template>
