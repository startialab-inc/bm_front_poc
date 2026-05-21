<script setup lang="ts">
import { ref } from 'vue'
import AppMenuIcon from '@/components/atoms/AppMenuIcon.vue'

// インタラクティブデモ用の状態
const activeIndex = ref(0)
const menuItems = [
  { icon: 'grip-horizontal', label: 'メニュー' },
  { icon: 'house', label: 'ホーム' },
  { icon: 'gear', label: '設定' },
  { icon: 'user', label: 'ユーザー' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppMenuIcon</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="rounded bg-slate-200 px-1 text-xs">308:6380</code>（side-bar/menu-icon）
      </p>
    </div>

    <!-- Default 状態 -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">通常状態（Default）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <AppMenuIcon />
      </div>
    </section>

    <!-- Hover 状態 -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">ホバー状態（Hover）</h2>
      <p class="mb-3 text-xs text-slate-500">上のアイコンにマウスを乗せると薄青背景（#ddeaff）になります</p>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <AppMenuIcon />
      </div>
    </section>

    <!-- Current 状態 -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">現在地状態（Current）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <AppMenuIcon :current="true" />
      </div>
    </section>

    <!-- 全バリアント横並び -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">全バリアント比較</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <div class="flex items-end gap-8">
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon :current="false" />
            <span class="text-[10px] text-slate-400">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon :current="false" />
            <span class="text-[10px] text-slate-400">Hover（マウスオーバー）</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon :current="true" />
            <span class="text-[10px] text-slate-400">Current</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 各種アイコン -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">各種アイコン</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="grip-horizontal" :current="false" />
            <span class="text-[10px] text-slate-400">grip-horizontal</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="house" :current="false" />
            <span class="text-[10px] text-slate-400">house</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="gear" :current="false" />
            <span class="text-[10px] text-slate-400">gear</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="user" :current="false" />
            <span class="text-[10px] text-slate-400">user</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="bars" :current="false" />
            <span class="text-[10px] text-slate-400">bars</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AppMenuIcon icon="grip-horizontal" :current="true" />
            <span class="text-[10px] text-slate-400">current</span>
          </div>
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p class="mb-3 text-xs text-slate-500">アイコンをクリックして Current 状態を切り替え</p>
        <div class="flex items-center gap-2">
          <AppMenuIcon
            v-for="(item, i) in menuItems"
            :key="i"
            :icon="item.icon"
            :current="activeIndex === i"
            @click="activeIndex = i"
          />
        </div>
        <p class="mt-3 text-xs text-slate-500">現在地: {{ menuItems[activeIndex].label }}</p>
      </div>
    </section>
  </div>
</template>
