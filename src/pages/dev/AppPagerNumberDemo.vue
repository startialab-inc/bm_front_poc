<script setup lang="ts">
import { ref } from 'vue'
import AppPagerNumber from '@/components/atoms/AppPagerNumber.vue'

// インタラクティブデモ用の状態
const currentPage = ref(2)
const totalPages = [1, 2, 3, 4, 5]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppPagerNumber</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="rounded bg-slate-200 px-1 text-xs">932:25025</code>（PagerNubmer ※Figma typo, 正: PagerNumber）
      </p>
    </div>

    <!-- Active（現在ページ）バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">現在ページ（active=true）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <AppPagerNumber :page="2" :active="true" />
      </div>
    </section>

    <!-- Default（通常ページ）バリアント -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">通常ページ（active=false）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <AppPagerNumber :page="1" :active="false" />
      </div>
    </section>

    <!-- ページネーション風横並びデモ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">ページネーション風横並び</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-6">
        <div>
          <p class="mb-2 text-xs text-slate-400">2ページ目がアクティブ</p>
          <div class="flex items-center gap-1">
            <AppPagerNumber :page="1" :active="false" />
            <AppPagerNumber :page="2" :active="true" />
            <AppPagerNumber :page="3" :active="false" />
            <AppPagerNumber :page="4" :active="false" />
            <AppPagerNumber :page="5" :active="false" />
          </div>
        </div>
        <div>
          <p class="mb-2 text-xs text-slate-400">3ページ目がアクティブ</p>
          <div class="flex items-center gap-1">
            <AppPagerNumber :page="1" :active="false" />
            <AppPagerNumber :page="2" :active="false" />
            <AppPagerNumber :page="3" :active="true" />
            <AppPagerNumber :page="4" :active="false" />
            <AppPagerNumber :page="5" :active="false" />
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p class="mb-3 text-xs text-slate-500">番号をクリックしてページを切り替え</p>
        <div class="flex items-center gap-1">
          <AppPagerNumber
            v-for="page in totalPages"
            :key="page"
            :page="page"
            :active="currentPage === page"
            @click="currentPage = page"
          />
        </div>
        <p class="mt-3 text-xs text-slate-500">現在ページ: {{ currentPage }}</p>
      </div>
    </section>
  </div>
</template>
