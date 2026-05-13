<script setup lang="ts">
// タグコンポーネント（Atom）
// Figma node-id: 911:50285
// バリアント: Deleteable（削除ボタンあり）/ Undelete（削除ボタンなし・ボーダーあり）

withDefaults(defineProps<{
  /** タグのラベルテキスト */
  label: string
  /** 削除ボタンを表示するか（true = Deleteable, false = Undelete） */
  deletable?: boolean
}>(), {
  deletable: false,
})

const emit = defineEmits<{
  /** 削除ボタンクリック時に発火 */
  delete: []
}>()
</script>

<template>
  <span
    class="inline-flex items-center h-9 px-3 py-1.5 gap-2 rounded-[6px] bg-[#e2e8f0] text-sm text-[#0d2144] font-normal leading-none"
    :class="{ 'border border-[#e5e5e5]': !deletable }"
  >
    <span>{{ label }}</span>
    <button
      v-if="deletable"
      type="button"
      class="flex items-center p-0 bg-transparent border-0 cursor-pointer text-[14px] leading-none text-[#64748b]"
      aria-label="削除"
      @click="emit('delete')"
    >
      <i class="fa-solid fa-circle-xmark" aria-hidden="true" />
    </button>
  </span>
</template>
