import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppModalFooter from './AppModalFooter.vue'

describe('AppModalFooter', () => {
  describe('レンダリング', () => {
    it('ルート要素が div でレンダリングされること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('justify-end クラスが付与されること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.classes()).toContain('justify-end')
    })

    it('border-t クラスが付与されること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.classes()).toContain('border-t')
    })

    it('bg-white クラスが付与されること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.classes()).toContain('bg-white')
    })

    it('p-4 クラスが付与されること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.classes()).toContain('p-4')
    })

    it('gap-3 クラスが付与されること', () => {
      const wrapper = mount(AppModalFooter)
      expect(wrapper.classes()).toContain('gap-3')
    })
  })

  describe('スロット', () => {
    it('デフォルト slot のコンテンツが描画されること', () => {
      const wrapper = mount(AppModalFooter, {
        slots: {
          default: '<button>保存する</button>',
        },
      })
      expect(wrapper.text()).toContain('保存する')
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })
})
