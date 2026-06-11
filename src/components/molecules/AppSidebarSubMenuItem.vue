<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

type NotificationType = 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    /** メニューテキスト */
    label: string
    /** 現在地状態（内側コンテナに bg-[#e2e8f0] が付く） */
    current?: boolean
    /** リンク先。指定時は RouterLink、未指定時は button + click emit */
    to?: RouteLocationRaw
    /** 通知バッジに表示する値（文字列・数値→テキスト付きバッジ、true→ドット通知、未指定・false・空文字はバッジ非表示） */
    notification?: string | number | boolean
    /** 通知バッジの種類（色を決定する）。DESIGN.md の「ステータス種別色」参照 */
    notificationType?: NotificationType
  }>(),
  {
    current: false,
    notificationType: 'info',
  },
)

defineEmits<{
  /** to が未指定の場合にクリックで発火 */
  click: []
}>()

/** 内側コンテナの背景クラス（current 状態で切り替え） */
const innerClass = computed(() => (props.current ? 'bg-[#e2e8f0]' : ''))

/** 通知バッジを表示するか（空文字・undefined・false は非表示） */
const hasNotification = computed(
  () => props.notification != null && props.notification !== '' && props.notification !== false,
)

/** ドット通知（12×12px の円、テキストなし）を表示するか */
const isDotNotification = computed(() => props.notification === true)

/** 通知バッジの背景色（notificationType に応じて切り替え） */
const badgeColorClass = computed(() => {
  const map: Record<NotificationType, string> = {
    info:    'bg-cyan-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger:  'bg-red-500',
  }
  return map[props.notificationType ?? 'info']
})
</script>

<template>
  <!-- to あり: RouterLink（クリック = ページ遷移） -->
  <RouterLink
    v-if="to"
    :to="to"
    class="block w-full rounded-[8px] hover:bg-[#ddeaff]"
  >
    <div
      class="flex h-9 items-center rounded-[8px] px-3"
      :class="innerClass"
    >
      <p class="min-w-0 flex-1 truncate text-sm font-normal text-[#0d2144]">{{ label }}</p>
      <!-- ドット通知（12×12px 円、テキストなし） -->
      <span
        v-if="isDotNotification"
        :class="['w-3 h-3 rounded-full', badgeColorClass]"
      />
      <!-- テキスト付きバッジ -->
      <span
        v-else-if="hasNotification"
        :class="['flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[12px] font-semibold leading-4 text-[#fafafa]', badgeColorClass]"
      >{{ notification }}</span>
    </div>
  </RouterLink>

  <!-- to なし: button（クリック = click emit） -->
  <button
    v-else
    type="button"
    class="block w-full rounded-[8px] text-left hover:bg-[#ddeaff]"
    @click="$emit('click')"
  >
    <div
      class="flex h-9 items-center rounded-[8px] px-3"
      :class="innerClass"
    >
      <p class="min-w-0 flex-1 truncate text-sm font-normal text-[#0d2144]">{{ label }}</p>
      <!-- ドット通知（12×12px 円、テキストなし） -->
      <span
        v-if="isDotNotification"
        :class="['w-3 h-3 rounded-full', badgeColorClass]"
      />
      <!-- テキスト付きバッジ -->
      <span
        v-else-if="hasNotification"
        :class="['flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[12px] font-semibold leading-4 text-[#fafafa]', badgeColorClass]"
      >{{ notification }}</span>
    </div>
  </button>
</template>
