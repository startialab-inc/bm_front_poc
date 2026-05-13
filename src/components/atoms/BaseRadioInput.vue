<script setup lang="ts">
// ラジオボタンの基礎入力コンポーネント（Atom）
// Molecule の AppRadioButton.vue がこのコンポーネントをラップして使用する
interface Props {
  // このラジオボタンが表す値
  value: string | number | boolean
  // input[type="radio"] の name 属性（同グループのボタンで共通にする）
  name: string
  // 無効状態
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// v-model バインディング（defineModel マクロ使用）
const model = defineModel<string | number | boolean>()
</script>

<template>
  <input
    type="radio"
    :value="props.value"
    :name="props.name"
    :disabled="props.disabled"
    v-model="model"
    class="appearance-none w-4 h-4 rounded-full cursor-pointer transition-colors
           bg-btn-disable
           checked:bg-white checked:[box-shadow:inset_0_0_0_5.33px_var(--color-btn-primary)]
           disabled:cursor-not-allowed disabled:opacity-50
           focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary focus-visible:ring-offset-2"
  />
</template>
