<script setup lang="ts">
// お気に入りブロックコンポーネント
// ヘッダー行（タイトル + 編集/削除アイコン）+ ブロックプレビューエリアで構成
// selected prop で選択状態を切り替える

interface Props {
  /** ブロックタイトル */
  title?: string
  /** 選択状態 */
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ブロックタイトル',
  selected: false,
})

const emit = defineEmits<{
  /** ブロックエリアクリック時 */
  click: []
  /** 編集アイコンクリック時 */
  edit: []
  /** 削除アイコンクリック時 */
  delete: []
}>()
</script>

<template>
  <div class="flex flex-col gap-[10px] w-[232px]">
    <!-- ヘッダー行 -->
    <div class="flex flex-row items-center gap-2 pr-2">
      <!-- 左ボーダー -->
      <div class="w-0.5 self-stretch rounded-sm bg-[#143166]" />
      <!-- タイトル -->
      <p class="flex-1 text-sm font-medium leading-5 text-[#0d2144]">{{ props.title }}</p>
      <!-- アクションアイコン群 -->
      <div class="flex flex-row gap-1">
        <button
          type="button"
          class="w-5 h-5 flex items-center justify-center"
          @click.stop="emit('edit')"
        >
          <i class="fa-solid fa-pen" style="font-size: 12px; color: #64748b;" />
        </button>
        <button
          type="button"
          class="w-5 h-5 flex items-center justify-center"
          @click.stop="emit('delete')"
        >
          <i class="fa-solid fa-trash" style="font-size: 12px; color: #64748b;" />
        </button>
      </div>
    </div>
    <!-- ブロックエリア -->
    <div
      class="relative w-full h-40 rounded-[6px] cursor-pointer"
      :class="props.selected
        ? 'bg-[#eff6ff] border-2 border-[#2862cb]'
        : 'bg-[#f8fafc]'"
      @click="emit('click')"
    >
      <!-- 選択アイコン（circle-check） -->
      <i
        class="fa-solid fa-circle-check absolute"
        style="top: 10px; left: 10px; font-size: 16px;"
        :style="{ color: props.selected ? '#2862cb' : '#cbd5e1' }"
      />
    </div>
  </div>
</template>
