<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * 表示タイプ
     * - 'inline': AppSidebarMenuItem のスロット内インライン展開（左縦ボーダーは親に委ねる）
     * - 'popup': 白背景＋drop-shadow のポップアップ形式（独立コンポーネントとして機能）
     */
    type?: 'inline' | 'popup'
    /**
     * 単体使用モード（inline type 専用）
     * true の場合、AppSidebarMenuItem 外で単体使用する想定で
     * 独自の py-3 / pl-6 / pr-4 / before:border-l を自前で適用する
     * デフォルト false（AppSidebarMenuItem のスロット内での使用を前提）
     */
    standalone?: boolean
    /**
     * popup type 専用: コンテナの横幅
     * デフォルト '240px'（Figma: 520:6437）
     */
    width?: string
  }>(),
  {
    type: 'inline',
    standalone: false,
    width: '240px',
  },
)

/** コンテナのクラスを type と standalone に応じて切り替える */
const containerClass = computed(() => {
  if (props.type === 'popup') {
    // popup type: 白背景 + drop-shadow + 完全なボックスモデル（Figma: 520:6437）
    // 横幅は width prop でインラインスタイルとして適用する
    return 'flex flex-col gap-2 rounded-[8px] bg-white p-3 shadow-[0_20px_25px_rgba(0,0,0,0.1),0_8px_10px_rgba(0,0,0,0.1)]'
  }
  if (props.standalone) {
    // inline type・単体使用: border と padding を自前で持つ（Figma: 308:6469）
    // 横幅は親コンテナに対して 100%
    return "relative flex w-full flex-col gap-2 py-3 pl-6 pr-4 before:absolute before:left-4 before:top-0 before:bottom-0 before:border-l before:border-[#e5e5e5] before:content-['']"
  }
  // inline type・AppSidebarMenuItem スロット内:
  // 親（AppSidebarMenuItem）が pl-6 と before:border-l を適用しているため、pr と gap のみ付与
  // 横幅は親コンテナに対して 100%
  return 'flex w-full flex-col gap-2 py-3 pr-4'
})

/** popup type 専用: width prop をインラインスタイルとして適用する */
const containerStyle = computed(() =>
  props.type === 'popup' ? { width: props.width } : undefined,
)
</script>

<template>
  <!-- サブメニューコンテナ（type と standalone に応じてスタイルを切り替え） -->
  <div :class="containerClass" :style="containerStyle">
    <slot />
  </div>
</template>
