<script setup lang="ts">
import { ref } from 'vue'
import AppPagination from '@/components/molecules/AppPagination.vue'

// 各デモのページ状態
const page1 = ref(1)    // 1ページ目（先頭矢印 disabled）
const page5 = ref(5)    // 中間ページ（省略記号あり）
const page10 = ref(10)  // 最終ページ（末尾矢印 disabled）
const pageFew = ref(1)  // 少数ページ（省略記号なし）
const pageInteractive = ref(1)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="mb-6 text-2xl font-bold text-[#0d2144]">AppPagination デモ</h1>
    <p class="mb-8 text-sm text-gray-500">Figma: Pagination（932:25039）</p>

    <!-- 1ページ目: first/prev が disabled -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-700">1ページ目（先頭矢印 disabled）</h2>
      <AppPagination v-model="page1" :total-count="42" :total-pages="10" />
      <p class="mt-3 text-xs text-gray-400">現在ページ: {{ page1 }}</p>
    </section>

    <!-- 中間ページ: 省略記号あり -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-700">中間ページ（5/10・省略記号あり）</h2>
      <AppPagination v-model="page5" :total-count="42" :total-pages="10" />
      <p class="mt-3 text-xs text-gray-400">現在ページ: {{ page5 }}</p>
    </section>

    <!-- 最終ページ: next/last が disabled -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-700">最終ページ（10/10・末尾矢印 disabled）</h2>
      <AppPagination v-model="page10" :total-count="42" :total-pages="10" />
      <p class="mt-3 text-xs text-gray-400">現在ページ: {{ page10 }}</p>
    </section>

    <!-- 少数ページ: 省略記号なし -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-700">少数ページ（3件・省略記号なし）</h2>
      <AppPagination v-model="pageFew" :total-count="15" :total-pages="3" />
      <p class="mt-3 text-xs text-gray-400">現在ページ: {{ pageFew }}</p>
    </section>

    <!-- インタラクティブ: 外部ボタンでページ変更 -->
    <section class="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-sm font-semibold text-gray-700">インタラクティブ（外部ボタンでページ変更）</h2>
      <AppPagination v-model="pageInteractive" :total-count="42" :total-pages="10" />
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          v-for="p in 10"
          :key="p"
          :class="[
            'rounded px-2 py-1 text-xs',
            pageInteractive === p
              ? 'bg-[#143166] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
          @click="pageInteractive = p"
        >
          {{ p }}
        </button>
      </div>
      <p class="mt-3 text-xs text-gray-400">現在ページ: {{ pageInteractive }}</p>
    </section>
  </div>
</template>
