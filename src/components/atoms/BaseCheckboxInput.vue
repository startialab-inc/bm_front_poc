<script setup lang="ts">
import { computed } from 'vue'

// チェックボックスの基礎入力コンポーネント（Atom）
// Molecule の AppCheckbox.vue がこのコンポーネントをラップして使用する

// img_src/check.svg を raw 文字列として取得し、白塗りの data URI に変換する
// （background-image では外部 SVG の currentColor が機能しないため、fill を white に置換して埋め込む）
import checkSvgRaw from '../../../img_src/check.svg?raw'
const checkWhiteDataUri = (() => {
  const whiteSvg = checkSvgRaw.replace(/fill="currentColor"/g, 'fill="white"')
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(whiteSvg)))}`
})()

// サイズバリアント
type Size = 'sm' | 'md'

interface Props {
  // このチェックボックスが表す値
  value: string | number | boolean
  // 無効状態
  disabled?: boolean
  // サイズ（sm: 16px / md: 20px）。Figma 準拠のデフォルトは md
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md',
})

// v-model バインディング（defineModel マクロ使用）
const model = defineModel<string | number | boolean>()

// サイズクラス
const sizeClass = computed(() => props.size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')
</script>

<template>
  <input
    type="checkbox"
    :value="props.value"
    :disabled="props.disabled"
    :checked="model === props.value"
    @change="model = ($event.target as HTMLInputElement).checked ? props.value : undefined"
    :style="(model === props.value) ? {
      backgroundImage: `url(${checkWhiteDataUri})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    } : {}"
    :class="[
      sizeClass,
      'appearance-none rounded cursor-pointer transition-colors',
      'bg-btn-disable',
      'checked:bg-btn-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary focus-visible:ring-offset-2',
    ]"
  />
</template>
