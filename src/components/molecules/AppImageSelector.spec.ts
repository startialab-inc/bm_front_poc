import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AppImageSelector from './AppImageSelector.vue'
import ja from '@/locales/ja'

const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  messages: { ja },
})

const mountWithI18n = (props = {}) =>
  mount(AppImageSelector, {
    props,
    global: { plugins: [i18n] },
  })

describe('AppImageSelector', () => {
  describe('レンダリング', () => {
    it('modelValue が null のとき、未選択状態が描画される', () => {
      const wrapper = mountWithI18n({ modelValue: null })
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.text()).toContain('画像を選択')
    })

    it('modelValue が URL のとき、選択済み状態が描画される', () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      expect(wrapper.find('img').exists()).toBe(true)
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/image.png')
    })

    it('選択済み状態のとき、「画像を変更」「画像を削除」ボタンが表示される', () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      expect(wrapper.text()).toContain('画像を変更')
      expect(wrapper.text()).toContain('画像を削除')
    })

    it('未選択状態のとき、input[type=file] が存在する', () => {
      const wrapper = mountWithI18n({ modelValue: null })
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    })

    it('選択済み状態のとき、input[type=file] が存在する', () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('modelValue = null で未選択レイアウトが描画される', () => {
      const wrapper = mountWithI18n({ modelValue: null })
      // 未選択状態は bg-[#f8fafc] クラスを持つ div が最上位
      expect(wrapper.html()).toContain('bg-[#f8fafc]')
    })

    it('modelValue に URL を渡すと選択済みレイアウトが描画される', () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      // 選択済み状態は img 要素が存在する
      expect(wrapper.find('img').exists()).toBe(true)
    })
  })

  describe('イベント', () => {
    it('削除ボタンをクリックすると delete イベントが発火する', async () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      // 「画像を削除」ボタンを探してクリック
      const buttons = wrapper.findAll('button')
      const deleteButton = buttons.find(b => b.text().includes('画像を削除'))
      expect(deleteButton).toBeDefined()
      await deleteButton!.trigger('click')
      expect(wrapper.emitted('delete')).toHaveLength(1)
    })

    it('削除ボタンをクリックすると modelValue が null になる', async () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      const buttons = wrapper.findAll('button')
      const deleteButton = buttons.find(b => b.text().includes('画像を削除'))
      await deleteButton!.trigger('click')
      // update:modelValue が null で発火されることを確認
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeDefined()
      expect(emitted![0][0]).toBeNull()
    })

    it('ファイル選択後に select イベントが発火する', async () => {
      // URL.createObjectURL をモック
      const mockObjectURL = 'blob:mock-url'
      global.URL.createObjectURL = vi.fn().mockReturnValue(mockObjectURL)

      const wrapper = mountWithI18n({ modelValue: null })
      const input = wrapper.find('input[type="file"]')
      const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' })

      // input の files プロパティをモック
      Object.defineProperty(input.element, 'files', {
        value: [mockFile],
        writable: false,
      })

      await input.trigger('change')
      expect(wrapper.emitted('select')).toBeDefined()
      expect(wrapper.emitted('select')![0][0]).toBe(mockFile)
    })
  })

  describe('v-model', () => {
    it('削除後に update:modelValue(null) が発火する', async () => {
      const wrapper = mountWithI18n({ modelValue: 'https://example.com/image.png' })
      const buttons = wrapper.findAll('button')
      const deleteButton = buttons.find(b => b.text().includes('画像を削除'))
      await deleteButton!.trigger('click')
      const updateEmits = wrapper.emitted('update:modelValue')
      expect(updateEmits).toBeDefined()
      expect(updateEmits![0][0]).toBeNull()
    })
  })
})
