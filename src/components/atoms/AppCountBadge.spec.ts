import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCountBadge from './AppCountBadge.vue'

describe('AppCountBadge', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('count=1 でエラーなくマウントできる', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.exists()).toBe(true)
    })

    it('rounded-[8px] クラスが付与される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.html()).toContain('rounded-[8px]')
    })

    it('bg-[#e2e8f0] クラスが付与される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.html()).toContain('bg-[#e2e8f0]')
    })

    it('text-[#0d2144] クラスが付与される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.html()).toContain('text-[#0d2144]')
    })

    it('font-semibold クラスが付与される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.html()).toContain('font-semibold')
    })

    it('text-xs クラスが付与される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.html()).toContain('text-xs')
    })
  })

  // --- props: count ---
  describe('props - count', () => {
    it('count=1 のとき、"1" が表示される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 1 } })
      expect(wrapper.text()).toBe('1')
    })

    it('count=42 のとき、"42" が表示される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 42 } })
      expect(wrapper.text()).toBe('42')
    })

    it('count=999 のとき、"999" が表示される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 999 } })
      expect(wrapper.text()).toBe('999')
    })

    it('count=9999 のとき、"9999" が表示される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 9999 } })
      expect(wrapper.text()).toBe('9999')
    })

    it('count=0 のとき、"0" が表示される', () => {
      const wrapper = mount(AppCountBadge, { props: { count: 0 } })
      expect(wrapper.text()).toBe('0')
    })
  })
})
