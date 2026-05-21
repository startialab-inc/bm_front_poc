<script setup lang="ts">
// スナックバーコンポーネント（Atom）
// Figma node-id: 2051:66855
// 4種類のタイプ（success / info / warning / error）に応じた色・アイコンを表示する通知バナー

type SnackbarType = 'success' | 'info' | 'warning' | 'error'

defineProps<{
  /** スナックバーの種類 */
  type: SnackbarType
  /** タイトル */
  title: string
  /** 説明文（省略可） */
  description?: string
}>()

// 背景色マップ
const bgMap: Record<SnackbarType, string> = {
  success: 'bg-[#ecfdf5]',
  info:    'bg-[#f0f9ff]',
  warning: 'bg-[#fff7ed]',
  error:   'bg-[#fef2f2]',
}

// 枠線色マップ
const borderMap: Record<SnackbarType, string> = {
  success: 'border-[#34d399]',
  info:    'border-[#0ea5e9]',
  warning: 'border-[#fb923c]',
  error:   'border-[#f87171]',
}

// アイコン名マップ（FontAwesome）
const iconMap: Record<SnackbarType, string> = {
  success: 'fa-circle-check',
  info:    'fa-circle-info',
  warning: 'fa-circle-exclamation',
  error:   'fa-triangle-exclamation',
}

// アイコン色マップ
const iconColorMap: Record<SnackbarType, string> = {
  success: 'text-[#059669]',
  info:    'text-[#0ea5e9]',
  warning: 'text-[#ea580c]',
  error:   'text-[#dc2626]',
}
</script>

<template>
  <!-- 外枠：背景色・枠線色は type に応じて切り替え -->
  <div
    class="flex flex-col gap-1 px-4 py-3 rounded-[6px] border border-solid w-[388px]"
    :class="[bgMap[type], borderMap[type]]"
  >
    <!-- タイトル行：アイコン + タイトルテキスト -->
    <div class="flex gap-2 items-center w-full">
      <i
        class="fa-solid shrink-0 text-[16px] leading-[1.4]"
        :class="[iconMap[type], iconColorMap[type]]"
        aria-hidden="true"
      />
      <p class="flex-1 font-bold text-[16px] leading-[24px] text-[rgba(0,0,0,0.85)] min-w-0 break-words">
        {{ title }}
      </p>
    </div>
    <!-- 説明文（description prop が渡されたときのみ表示） -->
    <div v-if="description" class="flex items-start pl-6 w-full">
      <p class="flex-1 font-normal text-[12px] leading-[16px] text-[rgba(0,0,0,0.85)] min-w-0 break-words">
        {{ description }}
      </p>
    </div>
  </div>
</template>
