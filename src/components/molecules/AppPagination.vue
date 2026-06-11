<script setup lang="ts">
// ページネーション Molecule コンポーネント
// Figma node-id: 932:25039（Pagination）
// 総件数テキスト＋ナビゲーション矢印＋ページ番号で構成。
// AppPagerNav（矢印）と AppPagerNumber（ページ番号）を子として利用する。

import { computed } from 'vue'
import AppPagerNav from '@/components/atoms/AppPagerNav.vue'
import AppPagerNumber from '@/components/atoms/AppPagerNumber.vue'
import type { NavType } from '@/components/atoms/AppPagerNav.vue'

const props = defineProps<{
  /** 総件数（「全 N 件中」に表示） */
  totalCount: number
  /** 総ページ数 */
  totalPages: number
}>()

// 現在ページ（1-indexed）
const model = defineModel<number>()

/**
 * 表示するページ番号の配列を生成する。
 * null は省略記号「‥」に対応。
 *
 * 例: 現在=5・総=10 → [1, null, 4, 5, 6, null, 10]
 * 例: 現在=1・総=3  → [1, 2, 3]
 */
const pages = computed<(number | null)[]>(() => {
  const current = model.value ?? 1
  const total = props.totalPages

  if (total <= 7) {
    // 7ページ以内は省略なし
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  // 常に表示するページ番号のセット
  const always = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total))

  const sorted = Array.from(always).sort((a, b) => a - b)

  // 隙間が2以上のところに null を挿入
  const result: (number | null)[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push(null)
    }
    result.push(sorted[i])
  }
  return result
})

// 矢印ボタンクリック時のページ移動処理
const handleNav = (type: NavType) => {
  const current = model.value ?? 1
  if (type === 'first') model.value = 1
  else if (type === 'prev') model.value = Math.max(1, current - 1)
  else if (type === 'next') model.value = Math.min(props.totalPages, current + 1)
  else if (type === 'last') model.value = props.totalPages
}
</script>

<template>
  <!-- コンテナ: flex row、gap 24px、中央揃え -->
  <div class="flex items-center gap-[24px]">
    <!-- 総件数テキスト -->
    <span class="text-xs leading-none text-[#0d2144]">全 {{ totalCount }} 件中</span>

    <!-- ページャーセクション: gap 16px、左 padding 12px -->
    <div class="flex items-center gap-[16px] pl-[12px]">
      <!-- 先頭・前ページ矢印 -->
      <AppPagerNav
        type="first"
        :current="model ?? 1"
        :total="totalPages"
        @click="handleNav"
      />
      <AppPagerNav
        type="prev"
        :current="model ?? 1"
        :total="totalPages"
        @click="handleNav"
      />

      <!-- ページ番号・省略記号 -->
      <template v-for="p in pages" :key="p ?? `ellipsis-${Math.random()}`">
        <!-- ページ番号（AppPagerNumber A-14 を使用） -->
        <AppPagerNumber
          v-if="p !== null"
          :page="p"
          :active="p === (model ?? 1)"
          @click="model = p"
        />
        <!-- 省略記号「‥」（AppPagerNumber と同スタイル） -->
        <div
          v-else
          class="flex h-6 w-6 items-center justify-center rounded-full border border-[#e5e5e5] bg-[#f8fafc] text-xs leading-none text-[#0d2144]"
        >
          ‥
        </div>
      </template>

      <!-- 次ページ・末尾矢印 -->
      <AppPagerNav
        type="next"
        :current="model ?? 1"
        :total="totalPages"
        @click="handleNav"
      />
      <AppPagerNav
        type="last"
        :current="model ?? 1"
        :total="totalPages"
        @click="handleNav"
      />
    </div>
  </div>
</template>
