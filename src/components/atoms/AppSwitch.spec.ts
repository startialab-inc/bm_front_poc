import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSwitch from './AppSwitch.vue'

describe('AppSwitch', () => {
  // =====================================================
  // レンダリング
  // =====================================================
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(AppSwitch)
      expect(wrapper.exists()).toBe(true)
    })

    it('button 要素が存在する', () => {
      const wrapper = mount(AppSwitch)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('role="switch" 属性が付与されている', () => {
      const wrapper = mount(AppSwitch)
      expect(wrapper.find('button').attributes('role')).toBe('switch')
    })

    it('modelValue=false のとき aria-checked="false"', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: false },
      })
      expect(wrapper.find('button').attributes('aria-checked')).toBe('false')
    })

    it('modelValue=true のとき aria-checked="true"', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: true },
      })
      expect(wrapper.find('button').attributes('aria-checked')).toBe('true')
    })
  })

  // =====================================================
  // props によるスタイル切り替え
  // =====================================================
  describe('props', () => {
    it('modelValue=false のとき OFF 背景色クラスが付与される', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: false },
      })
      expect(wrapper.find('button').classes()).toContain('bg-[#e2e8f0]')
      expect(wrapper.find('button').classes()).not.toContain('bg-[#34d399]')
    })

    it('modelValue=true のとき ON 背景色クラスが付与される', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: true },
      })
      expect(wrapper.find('button').classes()).toContain('bg-[#34d399]')
      expect(wrapper.find('button').classes()).not.toContain('bg-[#e2e8f0]')
    })

    it('modelValue=false のとき つまみが left-0 クラスを持つ', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: false },
      })
      const thumb = wrapper.find('span')
      expect(thumb.classes()).toContain('left-0')
      expect(thumb.classes()).not.toContain('left-4')
    })

    it('modelValue=true のとき つまみが left-4 クラスを持つ', () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: true },
      })
      const thumb = wrapper.find('span')
      expect(thumb.classes()).toContain('left-4')
      expect(thumb.classes()).not.toContain('left-0')
    })
  })

  // =====================================================
  // v-model（emits）
  // =====================================================
  describe('v-model', () => {
    it('クリックで update:modelValue が emit される（false → true）', async () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: false },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    })

    it('クリックで update:modelValue が emit される（true → false）', async () => {
      const wrapper = mount(AppSwitch, {
        props: { modelValue: true },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    })
  })
})
