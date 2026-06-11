<script setup lang="ts">
// AppSwitch（Atom）に左右ラベルを付けた Molecule コンポーネント
// Figma 対応なし（新設）

import AppSwitch from '@/components/atoms/AppSwitch.vue'
import BaseControlLabel from '@/components/atoms/BaseControlLabel.vue'

interface Props {
  // 左側ラベルテキスト
  leftLabel?: string
  // 右側ラベルテキスト
  rightLabel?: string
  // 無効状態
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const model = defineModel<boolean>({ default: false })

function toggle() {
  if (!props.disabled) {
    model.value = !model.value
  }
}
</script>

<template>
  <!--
    全体をクリックでトグル。
    AppSwitch ボタンのクリックは @click.stop で伝播を止め、
    AppSwitch 内部の toggle に任せる。
    disabled 時は pointer-events-none で AppSwitch のクリックを無効化し、
    toggle() 内の guard でラベル部分のクリックも無効化。
  -->
  <div
    class="inline-flex items-center gap-2 select-none"
    :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
    @click="toggle"
  >
    <BaseControlLabel v-if="leftLabel" :label="leftLabel" />
    <AppSwitch
      v-model="model"
      :class="{ 'pointer-events-none': disabled }"
      @click.stop
    />
    <BaseControlLabel v-if="rightLabel" :label="rightLabel" />
  </div>
</template>
