<script setup lang="ts">
import { ref } from 'vue'
import AppPasswordStrength from '@/components/atoms/AppPasswordStrength.vue'
import AppProgressBar from '@/components/atoms/AppProgressBar.vue'

type StrengthType = 'short' | 'weak' | 'normal' | 'strong'

const variants: { type: StrengthType; label: string }[] = [
  { type: 'short',  label: 'short — 幅 auto / 赤（#ef4444）' },
  { type: 'weak',   label: 'weak — 幅 180px / オレンジ（#f97316）' },
  { type: 'normal', label: 'normal — 幅 180px / 茶（#713f12）' },
  { type: 'strong', label: 'strong — 幅 180px / 緑（#22c55e）' },
]

// ProgressBar とのセット使用例
const progressExamples: { type: StrengthType; progress: number; status: 'danger' | 'warning' | 'success' }[] = [
  { type: 'short',  progress: 10, status: 'danger' },
  { type: 'weak',   progress: 30, status: 'danger' },
  { type: 'normal', progress: 60, status: 'warning' },
  { type: 'strong', progress: 90, status: 'success' },
]

// インタラクティブデモ
const selectedType = ref<StrengthType>('weak')
const progressMap: Record<StrengthType, number> = { short: 10, weak: 30, normal: 60, strong: 90 }
const statusMap: Record<StrengthType, 'danger' | 'warning' | 'success'> = {
  short: 'danger', weak: 'danger', normal: 'warning', strong: 'success',
}
</script>

<template>
  <div class="p-8 space-y-10 font-sans">
    <h1 class="text-2xl font-bold text-slate-800">AppPasswordStrength</h1>
    <p class="text-sm text-slate-600">
      パスワード強度を示すラベルバッジ。4段階のバリアント（short / weak / normal / strong）。
    </p>

    <!-- 全バリアント -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-700">全バリアント</h2>
      <div class="space-y-3">
        <div
          v-for="variant in variants"
          :key="variant.type"
          class="flex items-center gap-4"
        >
          <AppPasswordStrength :type="variant.type" />
          <span class="text-xs text-slate-500">{{ variant.label }}</span>
        </div>
      </div>
    </section>

    <!-- ProgressBar とのセット使用例 -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-700">ProgressBar とのセット使用例</h2>
      <p class="text-sm text-slate-500">
        パスワード強度インジケーターとして AppProgressBar と組み合わせて使用する。
      </p>
      <div class="space-y-4 w-64">
        <div
          v-for="example in progressExamples"
          :key="example.type"
          class="space-y-1"
        >
          <AppProgressBar :progress="example.progress" :status="example.status" />
          <AppPasswordStrength :type="example.type" />
        </div>
      </div>
    </section>

    <!-- インタラクティブデモ -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-slate-700">インタラクティブデモ</h2>
      <div class="space-y-3 w-64">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="v in (['short', 'weak', 'normal', 'strong'] as StrengthType[])"
            :key="v"
            class="px-3 py-1 text-xs rounded border cursor-pointer"
            :class="selectedType === v ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300'"
            @click="selectedType = v"
          >
            {{ v }}
          </button>
        </div>
        <AppProgressBar :progress="progressMap[selectedType]" :status="statusMap[selectedType]" />
        <AppPasswordStrength :type="selectedType" />
      </div>
    </section>
  </div>
</template>
