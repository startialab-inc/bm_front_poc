<script setup lang="ts">
import { computed } from 'vue'

type Status = 'default' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  /** 進捗パーセンテージ（0〜100） */
  progress: number
  /** フィルの色（省略時は default） */
  status?: Status
  /** アニメーションストライプを表示する */
  animated?: boolean
}>()

const fillClass = computed(() => {
  const map: Record<Status, string> = {
    default: 'bg-btn-primary',
    info:    'bg-cyan-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger:  'bg-red-500',
  }
  return map[props.status ?? 'default']
})
</script>

<template>
  <div class="relative h-2 w-full overflow-hidden bg-[#e2e8f0]">
    <div
      :class="['absolute left-0 top-0 h-full', fillClass, { 'progress-animated': props.animated }]"
      :style="{ width: `${props.progress}%` }"
    />
  </div>
</template>

<style scoped>
/* Tailwind ユーティリティで代替不可能なアニメーション定義 */
@keyframes progress-bar-stripes {
  0% { background-position-x: 1rem; }
}

.progress-animated::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent 100%
  );
  background-size: 1rem 1rem;
  animation: progress-bar-stripes 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .progress-animated::before {
    animation: none;
  }
}
</style>
