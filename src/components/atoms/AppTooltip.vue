<script setup lang="ts">
// ツールチップコンポーネント（Atom）
// Figma node-id: 619:13590
// ラッパー要素でトリガーとツールチップをまとめ、表示制御を行う

import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** ツールチップに表示するテキスト */
  text: string
  /** トリガーに対するツールチップの表示位置（矢印はこの逆方向に向く）
   *  top（デフォルト）: トリガー上に表示・矢印↓
   *  bottom: トリガー下に表示・矢印↑（Figma の形状）
   *  left: トリガー左に表示・矢印→
   *  right: トリガー右に表示・矢印←
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** ツールチップの表示トリガー
   *  hover（デフォルト）: マウスオーバーで表示
   *  click: クリックで表示/非表示トグル
   *  manual: show()/hide()/toggle() を外から呼び出して制御
   */
  trigger?: 'hover' | 'click' | 'manual'
  /** ツールチップの幅。未指定 = auto（Figma 準拠検証時は "146px" を指定） */
  width?: string
  /** トリガー要素とツールチップの追加オフセット（px 数値）。矢印の 5px に加算される。デフォルト 0 */
  offset?: number
}>(), {
  placement: 'top',
  trigger: 'hover',
  offset: 0,
})

// 表示状態
const isVisible = ref(false)

function show() { isVisible.value = true }
function hide() { isVisible.value = false }
function toggle() { isVisible.value = !isVisible.value }

// manual トリガー時に外から呼び出せるよう公開
defineExpose({ show, hide, toggle })

// イベントハンドラ（trigger に応じて処理を切り替え）
// mouseover/mouseout + relatedTarget チェックで mouseenter/mouseleave 相当の動作を実現
// （JSDOM での mouseenter の addEventListener 互換性問題を回避するため）
function handleMouseover(e: MouseEvent) {
  if (props.trigger !== 'hover') return
  const el = e.currentTarget as HTMLElement
  if (!el.contains(e.relatedTarget as Node)) show()
}
function handleMouseout(e: MouseEvent) {
  if (props.trigger !== 'hover') return
  const el = e.currentTarget as HTMLElement
  if (!el.contains(e.relatedTarget as Node)) hide()
}
function handleClick() { if (props.trigger === 'click') toggle() }

// ツールチップの位置スタイル（placement + offset から算出）
const tooltipPositionStyle = computed(() => {
  const gap = `calc(100% + ${5 + props.offset}px)`
  switch (props.placement) {
    case 'bottom':
      return { top: gap, left: '50%', transform: 'translateX(-50%)' }
    case 'left':
      return { right: gap, top: '50%', transform: 'translateY(-50%)' }
    case 'right':
      return { left: gap, top: '50%', transform: 'translateY(-50%)' }
    default: // 'top'
      return { bottom: gap, left: '50%', transform: 'translateX(-50%)' }
  }
})

// 矢印のスタイル（placement に応じた CSS border-trick）
const arrowStyle = computed(() => {
  const base = {
    position: 'absolute' as const,
    width: '0',
    height: '0',
    borderStyle: 'solid',
  }
  switch (props.placement) {
    case 'bottom': // 矢印が上向き（↑）
      return {
        ...base,
        top: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #0d2144 transparent',
      }
    case 'left': // 矢印が右向き（→）
      return {
        ...base,
        right: '-5px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #0d2144',
      }
    case 'right': // 矢印が左向き（←）
      return {
        ...base,
        left: '-5px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #0d2144 transparent transparent',
      }
    default: // 'top' - 矢印が下向き（↓）
      return {
        ...base,
        bottom: '-5px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '5px 5px 0 5px',
        borderColor: '#0d2144 transparent transparent transparent',
      }
  }
})

// ツールチップ本体のスタイル（位置・幅・表示状態）
const tooltipBodyStyle = computed(() => ({
  position: 'absolute' as const,
  zIndex: '10',
  display: isVisible.value ? '' : 'none',
  ...tooltipPositionStyle.value,
  ...(props.width ? { width: props.width } : {}),
}))
</script>

<template>
  <!-- ラッパー: position:relative でツールチップの基準点になる -->
  <div
    class="relative inline-block"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout"
    @click="handleClick"
  >
    <!-- トリガー要素（外から任意の要素を差し込む） -->
    <slot></slot>

    <!-- ツールチップ本体 -->
    <div
      role="tooltip"
      :style="tooltipBodyStyle"
      class="flex items-center justify-center gap-1 px-2 py-1 rounded-[4px] bg-[#0d2144] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1),0px_2px_4px_0px_rgba(0,0,0,0.1)]"
    >
      <!-- 矢印（CSS border-trick で三角形を表現） -->
      <span
        :style="arrowStyle"
        :data-placement="placement"
        aria-hidden="true"
      />
      <!-- テキスト -->
      <p class="font-semibold leading-[16px] relative shrink-0 text-[10px] text-[#fafafa] whitespace-nowrap">
        {{ text }}
      </p>
    </div>
  </div>
</template>
