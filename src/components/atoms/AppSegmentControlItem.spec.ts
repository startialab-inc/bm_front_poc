import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSegmentControlItem from './AppSegmentControlItem.vue'

describe('AppSegmentControlItem', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('selected=true でエラーなくマウントできる', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('selected=false でエラーなくマウントできる', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.exists()).toBe(true)
    })
  })

  // --- selected=true（選択中） ---
  describe('selected=true（選択中）', () => {
    it('div 要素としてレンダリングされる', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('bg-white クラスが付与される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('rounded-[6px] クラスが付与される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.html()).toContain('rounded-[6px]')
    })

    it('label テキストが text-[#0d2144] クラスで表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.html()).toContain('text-[#0d2144]')
    })

    it('h-[31px] クラスが付与される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: true },
      })
      expect(wrapper.html()).toContain('h-[31px]')
    })
  })

  // --- selected=false（非選択） ---
  describe('selected=false（非選択）', () => {
    it('button 要素としてレンダリングされる', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      // v-if/v-else の fragment ルートのため find で button を探す
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('bg-transparent クラスが付与される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.html()).toContain('bg-transparent')
    })

    it('rounded-[8px] クラスが付与される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.html()).toContain('rounded-[8px]')
    })

    it('label テキストが text-[#64748b] クラスで表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.html()).toContain('text-[#64748b]')
    })
  })

  // --- props: label ---
  describe('props - label', () => {
    it('label="すべて" のとき "すべて" が表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.text()).toContain('すべて')
    })

    it('label="公開中" のとき "公開中" が表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: '公開中', count: 3, selected: false },
      })
      expect(wrapper.text()).toContain('公開中')
    })
  })

  // --- props: count ---
  describe('props - count', () => {
    it('count=8 のとき "(8)" が表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      expect(wrapper.text()).toContain('(8)')
    })

    it('count=0 のとき "(0)" が表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: '下書き', count: 0, selected: false },
      })
      expect(wrapper.text()).toContain('(0)')
    })

    it('count=100 のとき "(100)" が表示される', () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 100, selected: false },
      })
      expect(wrapper.text()).toContain('(100)')
    })
  })

  // --- emits ---
  describe('emits', () => {
    it('selected=false のとき button クリックで click イベントが emit される', async () => {
      const wrapper = mount(AppSegmentControlItem, {
        props: { label: 'すべて', count: 8, selected: false },
      })
      // v-if/v-else の fragment ルートのため button を直接クリック
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })
})
