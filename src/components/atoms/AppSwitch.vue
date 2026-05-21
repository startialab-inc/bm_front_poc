<script setup lang="ts">
// Figma: Switch (Atoms) node-id: 849:2931
// バリアント: ON (prop1=true) / OFF (prop1=false)

const props = withDefaults(defineProps<{
  /** スイッチの状態（true = ON, false = OFF） */
  modelValue?: boolean
}>(), {
  modelValue: false,
})

const emit = defineEmits<{
  /** ON/OFF が切り替わったとき */
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <!--
    トラック: w-9(36px) × h-5(20px)、rounded-full、border-2 border-transparent（padding なし）
    つまみ: position: absolute で left を transition アニメーション
      基準: 親 button の padding box 内端（border 内側）
      OFF: left: 0px（左端）
      ON:  left: 16px（32px 内側幅 − 16px つまみ = 16px）
  -->
  <button
    type="button"
    role="switch"
    :aria-checked="props.modelValue"
    class="relative inline-block h-5 w-9 shrink-0 rounded-full border-2 border-transparent cursor-pointer transition-colors duration-200 ease-in-out"
    :class="props.modelValue ? 'bg-[#34d399]' : 'bg-[#e2e8f0]'"
    @click="toggle"
  >
    <span
      class="absolute top-0 size-4 rounded-full bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-[left] duration-200 ease-in-out"
      :class="props.modelValue ? 'left-4' : 'left-0'"
      aria-hidden="true"
    />
  </button>
</template>
