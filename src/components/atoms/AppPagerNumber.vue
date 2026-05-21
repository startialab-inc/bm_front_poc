<script setup lang="ts">
defineProps<{
  page: number
  active: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <!-- アクティブ（現在ページ）: div -->
  <div
    v-if="active"
    class="flex h-6 w-6 items-center justify-center rounded-full bg-[#143166]"
  >
    <p class="text-xs leading-none text-white">{{ page }}</p>
  </div>

  <!-- 非アクティブ: button -->
  <button
    v-else
    type="button"
    class="flex h-6 w-6 items-center justify-center rounded-full border border-[#e5e5e5] bg-[#f8fafc]"
    @click="$emit('click')"
  >
    <p class="text-xs leading-none text-[#0d2144]">{{ page }}</p>
  </button>
</template>
