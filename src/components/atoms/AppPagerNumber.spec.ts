import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagerNumber from './AppPagerNumber.vue'

describe('AppPagerNumber', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('active=true でエラーなくマウントできる', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: true },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('active=false でエラーなくマウントできる', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // --- active=true（現在ページ） ---
  describe('active=true（現在ページ）', () => {
    it('div 要素としてレンダリングされる', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 2, active: true },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('bg-[#143166] クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 2, active: true },
      })
      expect(wrapper.html()).toContain('bg-[#143166]')
    })

    it('text-white クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 2, active: true },
      })
      expect(wrapper.html()).toContain('text-white')
    })

    it('rounded-full クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 2, active: true },
      })
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('h-6 w-6 クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 2, active: true },
      })
      expect(wrapper.html()).toContain('h-6')
      expect(wrapper.html()).toContain('w-6')
    })
  })

  // --- active=false（通常ページ） ---
  describe('active=false（通常ページ）', () => {
    it('button 要素としてレンダリングされる', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      // v-if/v-else フラグメントのため find で button を探す
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('bg-[#f8fafc] クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.html()).toContain('bg-[#f8fafc]')
    })

    it('text-[#0d2144] クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.html()).toContain('text-[#0d2144]')
    })

    it('border border-[#e5e5e5] クラスが付与される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.html()).toContain('border-[#e5e5e5]')
    })

    it('bg-[#143166] クラスが付与されない', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.html()).not.toContain('bg-[#143166]')
    })
  })

  // --- props: page ---
  describe('props - page', () => {
    it('page=1 のとき "1" が表示される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      expect(wrapper.text()).toContain('1')
    })

    it('page=5 のとき "5" が表示される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 5, active: true },
      })
      expect(wrapper.text()).toContain('5')
    })

    it('page=10 のとき "10" が表示される', () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 10, active: false },
      })
      expect(wrapper.text()).toContain('10')
    })
  })

  // --- emits ---
  describe('emits', () => {
    it('active=false のとき button クリックで click イベントが emit される', async () => {
      const wrapper = mount(AppPagerNumber, {
        props: { page: 1, active: false },
      })
      // v-if/v-else フラグメントのため button を直接クリック
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })
})
