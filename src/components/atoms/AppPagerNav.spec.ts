import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagerNav from './AppPagerNav.vue'
import type { NavType } from './AppPagerNav.vue'

describe('AppPagerNav', () => {
  describe('アイコン表示', () => {
    const iconCases: { type: NavType; expectedClass: string }[] = [
      { type: 'first', expectedClass: 'fa-angles-left' },
      { type: 'prev', expectedClass: 'fa-angle-left' },
      { type: 'next', expectedClass: 'fa-angle-right' },
      { type: 'last', expectedClass: 'fa-angles-right' },
    ]

    iconCases.forEach(({ type, expectedClass }) => {
      it(`type="${type}" のとき ${expectedClass} アイコンが描画される`, () => {
        const wrapper = mount(AppPagerNav, {
          props: { type, current: 5, total: 10 },
        })
        expect(wrapper.find('i').classes()).toContain(expectedClass)
      })
    })
  })

  describe('自動 disabled 判定', () => {
    it('first は current=1 のとき disabled になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'first', current: 1, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('prev は current=1 のとき disabled になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'prev', current: 1, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('next は current=total のとき disabled になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 10, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('last は current=total のとき disabled になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'last', current: 10, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('first は current=2 のとき有効になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'first', current: 2, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })

    it('next は current < total のとき有効になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 5, total: 10 },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })
  })

  describe('明示的な disabled prop', () => {
    it('disabled=true のとき強制的に無効になる', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 5, total: 10, disabled: true },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('disabled=false のとき有効のまま', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 5, total: 10, disabled: false },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })
  })

  describe('クリックイベント', () => {
    it('有効なボタンをクリックすると click イベントが emit される', async () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 5, total: 10 },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')![0]).toEqual(['next'])
    })

    it('emit された type が props の type と一致する', async () => {
      const types: NavType[] = ['first', 'prev', 'next', 'last']
      for (const type of types) {
        const wrapper = mount(AppPagerNav, {
          props: { type, current: 5, total: 10 },
        })
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted('click')![0]).toEqual([type])
      }
    })

    it('disabled 状態のとき click イベントが emit されない', async () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'prev', current: 1, total: 10 },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('スタイル', () => {
    it('有効なとき text-[#0d2144] クラスが付く', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'next', current: 5, total: 10 },
      })
      expect(wrapper.html()).toContain('text-[#0d2144]')
    })

    it('disabled のとき text-[#cbd5e1] クラスが付く', () => {
      const wrapper = mount(AppPagerNav, {
        props: { type: 'prev', current: 1, total: 10 },
      })
      expect(wrapper.html()).toContain('text-[#cbd5e1]')
    })
  })
})
