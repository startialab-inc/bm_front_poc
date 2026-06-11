<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// Figma node: 621:12561
interface Props {
  status?: 'on' | 'off'
}

withDefaults(defineProps<Props>(), {
  status: 'off',
})

const { t } = useI18n()
</script>

<template>
  <div
    class="inline-flex items-center gap-1 px-2 py-1 bg-[#f8fafc] rounded w-16 h-7"
  >
    <div
      class="w-3 h-3 rounded-full flex-shrink-0"
      :class="status === 'on' ? 'bg-[#22c55e]' : 'bg-[#cbd5e1]'"
    />
    <span
      class="text-xs leading-4 font-normal"
      :class="status === 'on' ? 'text-[#0d2144]' : 'text-[#64748b]'"
    >
      {{ status === 'on' ? t('components.AppPageSettingStatus.on') : t('components.AppPageSettingStatus.off') }}
    </span>
  </div>
</template>
