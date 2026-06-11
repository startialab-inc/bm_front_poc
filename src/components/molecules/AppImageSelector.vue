<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/atoms/AppButton.vue'

const { t } = useI18n()

// null = 未選択、string = 選択済み画像 URL
const modelValue = defineModel<string | null>({ default: null })

const emit = defineEmits<{
  // ファイル選択時（親で URL を永続化したい場合に利用）
  select: [file: File]
  // 削除ボタン押下時
  delete: []
}>()

const fileInput = ref<HTMLInputElement | null>(null)

// ファイル選択ダイアログを開く
const openFileDialog = () => {
  fileInput.value?.click()
}

// ファイル選択後の処理
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  // ObjectURL を生成してプレビュー表示
  modelValue.value = URL.createObjectURL(file)
  emit('select', file)
  // input をリセットして同ファイルの再選択に対応
  ;(event.target as HTMLInputElement).value = ''
}

// 削除ボタン押下の処理
const handleDelete = () => {
  modelValue.value = null
  emit('delete')
}
</script>

<template>
  <!-- 未選択状態：グレー領域全体がクリッカブル -->
  <div
    v-if="modelValue === null"
    class="group w-[320px] aspect-[920/523] bg-[#f8fafc] border border-[#e5e5e5] rounded-lg flex items-center justify-center cursor-pointer hover:bg-brand-50"
    @click="openFileDialog"
  >
    <!-- 非表示のファイル入力 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    <!-- アイコン＋テキスト（クリックイベントは親 div で受け取る） -->
    <div class="flex items-center gap-2 h-8 py-1 pl-3 pr-4 pointer-events-none">
      <i class="fa-solid fa-image text-base text-icon-primary group-hover:text-icon-brand" aria-hidden="true" />
      <span class="text-sm text-text-primary group-hover:text-text-brand group-hover:font-bold">
        {{ t('components.AppImageSelector.selectImage') }}
      </span>
    </div>
  </div>

  <!-- 選択済み状態 -->
  <div v-else class="flex flex-row items-end gap-[10px]">
    <!-- 非表示のファイル入力 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileChange"
    />
    <!-- 画像プレビュー -->
    <img
      :src="modelValue"
      class="w-[320px] aspect-[920/523] object-cover rounded-lg"
      alt=""
    />
    <!-- アクションボタン群（横並び） -->
    <div class="flex flex-row gap-2">
      <!-- 「画像を変更」ボタン -->
      <AppButton
        variant="ghost"
        :label="t('components.AppImageSelector.changeImage')"
        iconLeft="image"
        @click="openFileDialog"
      />
      <!-- 「画像を削除」ボタン -->
      <AppButton
        variant="ghost-danger"
        :label="t('components.AppImageSelector.deleteImage')"
        iconLeft="trash"
        @click="handleDelete"
      />
    </div>
  </div>
</template>
