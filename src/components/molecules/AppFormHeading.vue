<script setup lang="ts">
// フォームセクションの見出しと説明文コンポーネント

interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <!-- 見出し: 18px / Bold / 行高 28px -->
    <p class="w-full text-lg font-bold leading-7 text-[#0d2144]">{{ title }}</p>
    <!-- 説明文（任意）: 12px / Regular / 行高 16px。HTML タグを含む文字列も受け付ける -->
    <p v-if="description" class="w-full text-xs font-normal leading-4 text-[#0d2144]" v-html="description" />
  </div>
</template>
