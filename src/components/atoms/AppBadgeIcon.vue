<script setup lang="ts">
import { computed } from 'vue'

// バッジアイコンのタイプを表す型（Figma: Badge/PageSettingIcon node-id: 538:11930）
type BadgeIconType = 'Contact' | 'Editable' | 'PageSetting' | 'OpenTerm' | 'BowNowScript' | 'BowNow' | 'Curation'

const props = withDefaults(defineProps<{
  /** バッジのタイプ */
  type: BadgeIconType
  /** アクティブ状態（true: 有効、false: 無効） */
  active?: boolean
}>(), {
  active: true,
})

// BowNow/BowNowScript の active 時は深紅（#5a0000）、その他の active 時は brand/blue-monkey/800（#143166）
// inactive 時は全タイプ共通で bg-sf-tertiary（#e2e8f0）
const bgClass = computed(() => {
  if (!props.active) return 'bg-[#e2e8f0]'
  if (props.type === 'BowNow' || props.type === 'BowNowScript') return 'bg-[#5a0000]'
  return 'bg-[#143166]'
})

// タイプ別 FontAwesome クラスマップ（BowNow は画像アセットのため除外）
const iconClassMap: Record<Exclude<BadgeIconType, 'BowNow'>, string> = {
  Contact:      'fa-envelope',
  Editable:     'fa-users',
  PageSetting:  'fa-gears',
  OpenTerm:     'fa-calendar',
  BowNowScript: 'fa-code',
  Curation:     'fa-quote-left',
}

// アイコンの FontAwesome クラス（BowNow の場合は空文字）
const iconClass = computed(() => {
  if (props.type === 'BowNow') return ''
  return iconClassMap[props.type]
})

// アイコン色クラス
// BowNowScript の active 時は赤（#fe0100）、その他の active 時は white
// inactive 時は全タイプ共通で ic-disable（#cbd5e1）
const iconColorClass = computed(() => {
  if (!props.active) return 'text-[#cbd5e1]'
  if (props.type === 'BowNowScript') return 'text-[#fe0100]'
  return 'text-white'
})

// BowNow 画像アセットの参照パス（Vite base: '/bm_front_componentlist/' に合わせた相対パス）
const bowNowSrc = computed(() => {
  return props.active
    ? `${import.meta.env.BASE_URL}assets/images/bow-now-active.svg`
    : `${import.meta.env.BASE_URL}assets/images/bow-now-inactive.svg`
})
</script>

<template>
  <!-- 24px 丸型アイコンバッジ（Figma: Badge/PageSettingIcon） -->
  <span
    class="inline-flex items-center justify-center w-6 h-6 rounded-[20px] shrink-0"
    :class="bgClass"
  >
    <!-- BowNow のみ画像アセットを使用（アイコンのみ SVG、背景は親 span で表示） -->
    <img
      v-if="type === 'BowNow'"
      :src="bowNowSrc"
      alt=""
      class="w-6 h-6 object-contain"
      aria-hidden="true"
    />
    <!-- その他のタイプは FontAwesome アイコン -->
    <i
      v-else
      class="fa-solid text-[12px]"
      :class="[iconClass, iconColorClass]"
      aria-hidden="true"
    />
  </span>
</template>
