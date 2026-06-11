<script setup lang="ts">
import { ref } from 'vue'
import AppPageSettingStatus from '@/components/molecules/AppPageSettingStatus.vue'

const interactiveStatus = ref<'on' | 'off'>('on')

function toggle() {
  interactiveStatus.value = interactiveStatus.value === 'on' ? 'off' : 'on'
}
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-2xl font-bold text-[#0d2144]">AppPageSettingStatus</h1>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-[#0d2144]">バリアント</h2>
      <div class="flex gap-4 items-center">
        <AppPageSettingStatus status="on" />
        <span class="text-sm text-[#64748b]">status="on"</span>
      </div>
      <div class="flex gap-4 items-center">
        <AppPageSettingStatus status="off" />
        <span class="text-sm text-[#64748b]">status="off"</span>
      </div>
      <div class="flex gap-4 items-center">
        <AppPageSettingStatus />
        <span class="text-sm text-[#64748b]">デフォルト（status 未指定）</span>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-[#0d2144]">インタラクティブ</h2>
      <div class="flex gap-4 items-center">
        <AppPageSettingStatus :status="interactiveStatus" />
        <button
          class="px-3 py-1 text-sm bg-[#2862cb] text-white rounded hover:bg-[#143166]"
          @click="toggle"
        >
          切り替え
        </button>
        <span class="text-sm text-[#64748b]">現在: {{ interactiveStatus.toUpperCase() }}</span>
      </div>
    </section>
  </div>
</template>
