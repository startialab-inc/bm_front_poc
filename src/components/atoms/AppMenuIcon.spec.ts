import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppMenuIcon from './AppMenuIcon.vue'

describe('AppMenuIcon', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('current=false でエラーなくマウントできる', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('current=true でエラーなくマウントできる', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: true },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // --- current=false（通常状態） ---
  describe('current=false（通常状態）', () => {
    it('button 要素としてレンダリングされる', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      // v-if/v-else フラグメントのため find で button を探す
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('bg-white クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('text-[#2862cb] クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('text-[#2862cb]')
    })

    it('hover:bg-[#ddeaff] クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('hover:bg-[#ddeaff]')
    })

    it('bg-[#2862cb] クラスが付与されない', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).not.toContain('bg-[#2862cb]')
    })
  })

  // --- current=true（現在地状態） ---
  describe('current=true（現在地状態）', () => {
    it('div 要素としてレンダリングされる', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: true },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('bg-[#2862cb] クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: true },
      })
      expect(wrapper.html()).toContain('bg-[#2862cb]')
    })

    it('text-white クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: true },
      })
      expect(wrapper.html()).toContain('text-white')
    })

    it('bg-white クラスが付与されない', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: true },
      })
      expect(wrapper.html()).not.toContain('bg-white')
    })
  })

  // --- props: icon ---
  describe('props - icon', () => {
    it('デフォルトで fa-grip-horizontal クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('fa-grip-horizontal')
    })

    it('icon="house" のとき fa-house クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { icon: 'house', current: false },
      })
      expect(wrapper.html()).toContain('fa-house')
    })

    it('icon="gear" のとき fa-gear クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { icon: 'gear', current: true },
      })
      expect(wrapper.html()).toContain('fa-gear')
    })
  })

  // --- サイズ・形状 ---
  describe('サイズ・形状', () => {
    it('w-10 h-10 クラスが付与される（40×40px）', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('w-10')
      expect(wrapper.html()).toContain('h-10')
    })

    it('rounded-[8px] クラスが付与される', () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      expect(wrapper.html()).toContain('rounded-[8px]')
    })
  })

  // --- emits ---
  describe('emits', () => {
    it('current=false のとき button クリックで click イベントが emit される', async () => {
      const wrapper = mount(AppMenuIcon, {
        props: { current: false },
      })
      // v-if/v-else フラグメントのため button を直接クリック
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })
})
