import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AppContactItemType from './AppContactItemType.vue'
import ja from '@/locales/ja'

const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  messages: { ja },
})

const mountComponent = (props = {}) =>
  mount(AppContactItemType, {
    props,
    global: { plugins: [i18n] },
  })

describe('AppContactItemType', () => {
  describe('レンダリング', () => {
    it('type="default" のとき、オプションエリアが表示されない', () => {
      const wrapper = mountComponent({ modelValue: 'default' })
      // bg-[#f8fafc] のオプションエリアが存在しない
      expect(wrapper.html()).not.toContain('bg-[#f8fafc]')
    })

    it('type="date" のとき、オプションエリアが表示される', () => {
      const wrapper = mountComponent({ modelValue: 'date' })
      expect(wrapper.html()).toContain('bg-[#f8fafc]')
    })

    it('type="textbox" のとき、オプションエリアが表示される', () => {
      const wrapper = mountComponent({ modelValue: 'textbox' })
      expect(wrapper.html()).toContain('bg-[#f8fafc]')
    })

    it('ヘッダー行に「入力タイプ」ラベルが表示される', () => {
      const wrapper = mountComponent({ modelValue: 'default' })
      expect(wrapper.text()).toContain('入力タイプ')
    })

    it('ドロップダウン（select 要素）が表示される', () => {
      const wrapper = mountComponent({ modelValue: 'default' })
      expect(wrapper.find('select').exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('modelValue="date" のとき、input[type="checkbox"] が存在する', () => {
      const wrapper = mountComponent({ modelValue: 'date' })
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    })

    it('modelValue="textbox" のとき、input[type="radio"] が 3 件存在する', () => {
      const wrapper = mountComponent({ modelValue: 'textbox' })
      expect(wrapper.findAll('input[type="radio"]').length).toBe(3)
    })

    it('modelValue="file" のとき、input[type="radio"] が 3 件存在する', () => {
      const wrapper = mountComponent({ modelValue: 'file' })
      expect(wrapper.findAll('input[type="radio"]').length).toBe(3)
    })

    it('modelValue="textarea" のとき、input[type="radio"] が 6 件存在する（幅3 + 高さ3）', () => {
      const wrapper = mountComponent({ modelValue: 'textarea' })
      expect(wrapper.findAll('input[type="radio"]').length).toBe(6)
    })

    it('modelValue="checkbox" のとき、textarea が存在する', () => {
      const wrapper = mountComponent({ modelValue: 'checkbox' })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('modelValue="radiobutton" のとき、textarea が存在する', () => {
      const wrapper = mountComponent({ modelValue: 'radiobutton' })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('modelValue="selectbox" のとき、textarea が存在する', () => {
      const wrapper = mountComponent({ modelValue: 'selectbox' })
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('modelValue="year" のとき、number 型の input が存在する', () => {
      const wrapper = mountComponent({ modelValue: 'year' })
      expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    })
  })

  describe('v-model', () => {
    it('select を変更すると update:modelValue が emit される', async () => {
      const wrapper = mountComponent({ modelValue: 'default' })
      await wrapper.find('select').setValue('date')
      expect(wrapper.emitted('update:modelValue')).toBeDefined()
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('date')
    })

    it('select の値変更に応じてオプションエリアが切り替わる', async () => {
      const wrapper = mountComponent({ modelValue: 'default' })
      // default → textarea に変更
      await wrapper.find('select').setValue('textarea')
      // textarea バリアント: radio が 6 件
      expect(wrapper.findAll('input[type="radio"]').length).toBe(6)
    })
  })
})
