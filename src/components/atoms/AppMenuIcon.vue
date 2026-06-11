<script setup lang="ts">
withDefaults(
  defineProps<{
    /** FontAwesome アイコン名（例: 'grip-horizontal'） */
    icon?: string
    /** Current 状態（現在地表示）かどうか */
    current?: boolean
  }>(),
  {
    icon: 'grip-horizontal',
    current: false,
  },
)

defineEmits<{
  click: []
}>()
</script>

<template>
  <!-- Current 状態: div（現在地表示、クリック不要）-->
  <div
    v-if="current"
    class="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#2862cb] text-white"
  >
    <i :class="`fa-solid fa-${icon}`" class="text-[16px]" />
  </div>

  <!-- Default / Hover 状態: button（クリック可能）-->
  <button
    v-else
    type="button"
    class="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-[#2862cb] hover:bg-[#ddeaff] group-hover:bg-[#ddeaff]"
    @click="$emit('click')"
  >
    <i :class="`fa-solid fa-${icon}`" class="text-[16px]" />
  </button>
</template>
