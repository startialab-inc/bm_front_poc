<script setup lang="ts">
import { ref, computed, useSlots, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import AppMenuIcon from '../atoms/AppMenuIcon.vue'

type NotificationType = 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    /** メニューテキスト */
    label: string
    /** アイコン名（FontAwesome。例: 'grip-horizontal'） */
    icon?: string
    /** アクティブ状態（青背景・展開済みの視覚スタイル） */
    current?: boolean
    /** 通知バッジに表示する値（文字列・数値→テキスト付きバッジ、true→ドット通知、未指定・false・空文字はバッジ非表示） */
    notification?: string | number | boolean
    /** 通知バッジの種類（色を決定する）。DESIGN.md の「ステータス種別色」参照 */
    notificationType?: NotificationType
    /** sub-menu がない場合のリンク先。未指定時は click emit */
    to?: RouteLocationRaw
  }>(),
  {
    icon: 'grip-horizontal',
    current: false,
    notificationType: 'info',
  },
)

defineEmits<{
  /** to が未指定かつ sub-menu なしの場合に発火 */
  click: []
}>()

const slots = useSlots()

/** デフォルト slot に sub-menu が挿入されているか */
const hasSubMenu = computed(() => !!slots.default)

/** 展開/閉じ込み状態（sub-menu あり時のみ使用） */
const expanded = ref(props.current ?? false)

// current=true になった場合は自動展開
watch(
  () => props.current,
  (val) => {
    if (val) expanded.value = true
  },
)

/** 展開トグル（sub-menu あり時のボタンクリックで呼び出す） */
const toggle = () => {
  expanded.value = !expanded.value
}

/** 行のスタイル（current 状態で切り替え） */
const rowClass = computed(() =>
  props.current
    ? 'bg-[#2862cb] text-white'
    : 'bg-white text-[#0d2144] hover:bg-[#ddeaff] hover:text-[#2862cb]',
)

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
  return map[props.notificationType ?? 'success']
})

/** 行の共通クラス（ボタン・RouterLink 両方で使用）。group により子の AppMenuIcon の hover が連動する */
const baseRowClass =
  'group flex h-10 w-[224px] items-center gap-2 rounded-[8px] px-3 py-2 text-left'
</script>

<template>
  <div>
    <!-- sub-menu あり: button（クリック = 展開/閉じ込みトグル） -->
    <button
      v-if="hasSubMenu"
      type="button"
      :class="[baseRowClass, rowClass]"
      @click="toggle"
    >
      <AppMenuIcon :icon="icon" :current="current" />
      <span class="flex-1 text-sm font-normal">{{ label }}</span>
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
      <!-- chevron: 展開中は 180deg 回転 -->
      <i :class="['fa-solid fa-chevron-down text-[10px] chevron-icon', { 'chevron-icon--expanded': expanded }]" />
    </button>

    <!-- sub-menu なし + to あり: RouterLink（クリック = ページ遷移） -->
    <RouterLink
      v-else-if="to"
      :to="to"
      :class="[baseRowClass, rowClass]"
    >
      <AppMenuIcon :icon="icon" :current="current" />
      <span class="flex-1 text-sm font-normal">{{ label }}</span>
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
      <!-- chevron なし -->
    </RouterLink>

    <!-- sub-menu なし + to なし: button（click emit） -->
    <button
      v-else
      type="button"
      :class="[baseRowClass, rowClass]"
      @click="$emit('click')"
    >
      <AppMenuIcon :icon="icon" :current="current" />
      <span class="flex-1 text-sm font-normal">{{ label }}</span>
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
      <!-- chevron なし -->
    </button>

    <!-- sub-menu スロット（CSS grid で高さアニメーション。展開中は左縦線を表示） -->
    <div
      v-if="hasSubMenu"
      :class="['submenu-container', { 'submenu-container--expanded': expanded }]"
    >
      <div class="relative pl-6 before:absolute before:left-4 before:top-0 before:bottom-0 before:border-l before:border-[#e5e5e5] before:content-['']">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* DESIGN.md アニメーショントークン: duration-interaction (200ms) + easing-standard */
.chevron-icon {
  transform-origin: 50% 50%;
  transition: transform 200ms ease-in-out;
}
.chevron-icon--expanded {
  transform: rotate(180deg);
}

/* DESIGN.md アニメーショントークン: duration-expand (300ms) + easing-standard */
/* CSS grid による高さアニメーション（height: 0 → auto の滑らかな遷移） */
.submenu-container {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-in-out;
}
.submenu-container--expanded {
  grid-template-rows: 1fr;
}
.submenu-container > div {
  overflow: hidden;
}
</style>
