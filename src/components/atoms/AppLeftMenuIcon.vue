<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** サイドバーの開閉状態（close: 開いている / open: 閉じている） */
    status?: 'close' | 'open'
  }>(),
  { status: 'close' }
)

const emit = defineEmits<{
  /** クリック時に発火（親が状態を管理する） */
  toggle: []
}>()

// status に応じて SVG アセットのパスを切り替える
const src = computed(() => {
  const file = props.status === 'close' ? 'panel-left' : 'panel-left-close'
  return `${import.meta.env.BASE_URL}assets/images/icons/${file}.svg`
})

// CSS mask-image 用インラインスタイル（SVG を currentColor で色制御するため）
const maskStyle = computed(() => ({
  maskImage: `url(${src.value})`,
  WebkitMaskImage: `url(${src.value})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
}))

const ariaLabel = computed(() =>
  props.status === 'close' ? 'サイドバーを閉じる' : 'サイドバーを開く'
)
</script>

<template>
  <!--
    ghost スタイルに準拠したアイコンボタン（AppMenuIcon 準拠: 40×40px）
    - デフォルト: text-icon-primary（#143166）
    - ホバー: text-text-brand（#2862CB）= AppButton ghost の hover と同じ
    - SVG を mask-image + bg-current で描画することで CSS color を反映する
  -->
  <button
    type="button"
    :aria-label="ariaLabel"
    class="flex h-10 w-10 items-center justify-center bg-transparent border-0 outline-none cursor-pointer rounded text-icon-primary hover:bg-brand-50 hover:text-text-brand focus:bg-brand-50 focus:outline focus:outline-1 focus:outline-brand-500"
    @click="emit('toggle')"
  >
    <span
      class="block w-4 h-4 bg-current"
      :style="maskStyle"
      aria-hidden="true"
    />
  </button>
</template>
