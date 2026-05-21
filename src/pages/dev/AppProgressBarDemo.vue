<script setup lang="ts">
import { ref } from 'vue'
import AppProgressBar from '@/components/atoms/AppProgressBar.vue'

// インタラクティブデモ用の状態
const demoProgress = ref(50)
const demoStatus = ref<'default' | 'info' | 'success' | 'warning' | 'danger'>('default')
const demoAnimated = ref(false)

const statuses = [
  { value: 'default', label: 'default' },
  { value: 'info',    label: 'info' },
  { value: 'success', label: 'success' },
  { value: 'warning', label: 'warning' },
  { value: 'danger',  label: 'danger' },
] as const

const statusItems = [
  { status: 'default' as const, label: 'default（#2862cb）' },
  { status: 'info'    as const, label: 'info（cyan-500）' },
  { status: 'success' as const, label: 'success（green-500）' },
  { status: 'warning' as const, label: 'warning（yellow-500）' },
  { status: 'danger'  as const, label: 'danger（red-500）' },
]
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-8 font-sans">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-800">AppProgressBar</h1>
      <p class="mt-1 text-sm text-slate-500">
        Figma node-id: <code class="rounded bg-slate-200 px-1 text-xs">955:48818</code>（ProgressBar）
      </p>
    </div>

    <!-- 進捗値バリエーション -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">進捗値バリエーション（status=default）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-4">
        <div v-for="pct in [0, 25, 50, 75, 100]" :key="pct" class="space-y-1">
          <p class="text-xs text-slate-500">{{ pct }}%</p>
          <AppProgressBar :progress="pct" />
        </div>
      </div>
    </section>

    <!-- ステータスバリエーション -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">ステータスバリエーション（progress=50）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-4">
        <div v-for="item in statusItems" :key="item.status" class="space-y-1">
          <p class="text-xs text-slate-500">{{ item.label }}</p>
          <AppProgressBar :progress="50" :status="item.status" />
        </div>
      </div>
    </section>

    <!-- アニメーションストライプ -->
    <section class="mb-8">
      <h2 class="mb-3 text-base font-semibold text-slate-700">アニメーションストライプ（animated=true）</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-4">
        <div v-for="item in statusItems" :key="item.status" class="space-y-1">
          <p class="text-xs text-slate-500">{{ item.label }}</p>
          <AppProgressBar :progress="60" :status="item.status" :animated="true" />
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section>
      <h2 class="mb-3 text-base font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-4">
        <!-- progress スライダー -->
        <div class="space-y-1">
          <label class="text-xs text-slate-500">progress: {{ demoProgress }}</label>
          <input type="range" min="0" max="100" v-model.number="demoProgress" class="w-full" />
        </div>

        <!-- status 切り替え -->
        <div class="space-y-1">
          <p class="text-xs text-slate-500">status</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in statuses"
              :key="s.value"
              @click="demoStatus = s.value"
              :class="[
                'px-3 py-1 text-xs rounded border transition-colors',
                demoStatus === s.value
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500',
              ]"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <!-- animated トグル -->
        <div class="flex items-center gap-2">
          <input
            id="demo-animated"
            type="checkbox"
            v-model="demoAnimated"
            class="h-4 w-4"
          />
          <label for="demo-animated" class="text-xs text-slate-500">animated</label>
        </div>

        <!-- プレビュー -->
        <AppProgressBar
          :progress="demoProgress"
          :status="demoStatus"
          :animated="demoAnimated"
        />
      </div>
    </section>
  </div>
</template>
