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

// v-model を使わず :checked + @change で明示的に制御する。
// v-model を使うとブラウザのネイティブ :checked 状態更新と Vue のリアクティブ更新が
// 非同期に走り、同グループ内で選択を切り替えた際にチラつきが発生するため。
const model = defineModel<string | number | boolean>()
</script>

<template>
  <input
    type="radio"
    :value="props.value"
    :name="props.name"
    :disabled="props.disabled"
    :checked="model === props.value"
    @change="model = props.value"
    :class="[
      'appearance-none w-4 h-4 rounded-full cursor-pointer',
      model === props.value
        ? 'bg-white [box-shadow:inset_0_0_0_5.33px_var(--color-btn-primary)]'
        : 'bg-btn-disable',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary focus-visible:ring-offset-2',
    ]"
  />
</template>
