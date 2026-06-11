<script setup lang="ts">
// フォーム項目タイトルコンポーネント
// variant='default': 左端アクセント縦線あり（標準フォーム画面）
// variant='login':   アクセント縦線なし（ログイン画面）

interface Props {
  title: string
  variant?: 'default' | 'login'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- アクセント縦線: default バリアントのみ表示（2px × 20px / #0d2144 / border-radius 2px） -->
    <div v-if="variant === 'default'" class="h-5 w-0.5 shrink-0 rounded-[2px] bg-[#0d2144]"></div>
    <!-- タイトルテキスト: 16px / Bold / 行高 24px / nowrap -->
    <p class="whitespace-nowrap text-base font-bold leading-6 text-[#0d2144]">{{ title }}</p>
  </div>
</template>
