import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTabItem from './AppTabItem.vue'

describe('AppTabItem', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('selected=true でエラーなくマウントできる', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('selected=false でエラーなくマウントできる', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // --- selected=true（選択中） ---
  describe('selected=true（選択中）', () => {
    it('div 要素としてレンダリングされる', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('bg-white クラスが付与される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('border-b-2 クラスが付与される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.html()).toContain('border-b-2')
    })

    it('border-[#2862cb] クラスが付与される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.html()).toContain('border-[#2862cb]')
    })

    it('label テキストが text-[#0d2144] クラスで表示される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.html()).toContain('text-[#0d2144]')
    })

    it('h-11 クラスが付与される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: true },
      })
      expect(wrapper.html()).toContain('h-11')
    })
  })

  // --- selected=false（非選択） ---
  describe('selected=false（非選択）', () => {
    it('button 要素としてレンダリングされる', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      // v-if/v-else の fragment ルートのため find で button を探す
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('bg-white クラスが付与される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('border-b-2 クラスが付与されない', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      expect(wrapper.html()).not.toContain('border-b-2')
    })

    it('label テキストが text-[#64748b] クラスで表示される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      expect(wrapper.html()).toContain('text-[#64748b]')
    })
  })

  // --- props: label ---
  describe('props - label', () => {
    it('label="タブ1" のとき "タブ1" が表示される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      expect(wrapper.text()).toContain('タブ1')
    })

    it('label="詳細設定" のとき "詳細設定" が表示される', () => {
      const wrapper = mount(AppTabItem, {
        props: { label: '詳細設定', selected: false },
      })
      expect(wrapper.text()).toContain('詳細設定')
    })
  })

  // --- emits ---
  describe('emits', () => {
    it('selected=false のとき button クリックで click イベントが emit される', async () => {
      const wrapper = mount(AppTabItem, {
        props: { label: 'タブ1', selected: false },
      })
      // v-if/v-else の fragment ルートのため button を直接クリック
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })
})
