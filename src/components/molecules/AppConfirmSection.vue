<script setup lang="ts">
interface Props {
  type?: 'information' | 'caution'
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'information',
})

// type に応じた見た目の定義
const typeConfig = {
  information: {
    bg: 'bg-[#eff6ff]',
    color: 'text-[#0d2144]',
    icon: 'fa-circle-info',
  },
  caution: {
    bg: 'bg-[#fef2f2]',
    color: 'text-[#dc2626]',
    icon: 'fa-circle-exclamation',
  },
} as const
</script>

<template>
  <div :class="['flex w-full flex-col gap-3 rounded-[6px] p-4', typeConfig[props.type].bg]">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex w-full items-center gap-2"
    >
      <i
        :class="['fa-solid shrink-0 text-[14px]', typeConfig[props.type].icon, typeConfig[props.type].color]"
      ></i>
      <span :class="['min-w-0 flex-1 text-xs font-normal leading-4', typeConfig[props.type].color]">
        {{ item }}
      </span>
    </div>
  </div>
</template>
