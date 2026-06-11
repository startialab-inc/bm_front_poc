<script setup lang="ts">
// ブロック編集メニューのセルコンポーネント
// ダークブルー背景にアイコン + テキストを縦並びで表示
// ホバー/フォーカス時に背景が明るい青に変化する

interface Props {
  /** FontAwesome クラス文字列（例: 'fa-solid fa-plus'）省略時は非表示 */
  icon?: string
  /** ラベルテキスト。省略時は非表示 */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  label: '',
})

const emit = defineEmits<{
  /** クリック時 */
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="w-[112px] h-[80px] flex flex-col items-center justify-center p-2 gap-1 bg-[#1b4187] hover:bg-[#2862cb] focus:bg-[#2862cb] transition-colors duration-200 ease-in-out cursor-pointer"
    @click="emit('click')"
  >
    <i v-if="props.icon" :class="[props.icon, 'text-white text-base']" />
    <span v-if="props.label" class="text-white text-xs font-bold leading-4 text-center" v-html="props.label" />
  </button>
</template>
