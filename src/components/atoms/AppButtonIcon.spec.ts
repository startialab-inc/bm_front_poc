import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButtonIcon from './AppButtonIcon.vue'

describe('AppButtonIcon', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('アイコン要素（<i>）が存在する', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.find('i').exists()).toBe(true)
    })

    it('ルート要素に rounded-full クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.classes()).toContain('rounded-full')
    })

    it('ルート要素に w-8 クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.classes()).toContain('w-8')
    })

    it('ルート要素に h-8 クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.classes()).toContain('h-8')
    })
  })

  describe('props/icon', () => {
    it('icon="arrow-left" のとき fa-arrow-left クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-arrow-left')
    })

    it('icon="xmark" のとき fa-xmark クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'xmark' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-xmark')
    })

    it('icon="magnifying-glass" のとき fa-magnifying-glass クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'magnifying-glass' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-magnifying-glass')
    })
  })

  describe('props/fontType', () => {
    it('デフォルトで fa-solid クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-solid')
    })

    it('fontType="fa-regular" のとき fa-regular クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'circle', fontType: 'fa-regular' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-regular')
    })

    it('fontType="fa-brands" のとき fa-brands クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'github', fontType: 'fa-brands' },
      })
      expect(wrapper.find('i').classes()).toContain('fa-brands')
    })

    it('fontType="fa-regular" のとき fa-solid クラスが付与されない', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'circle', fontType: 'fa-regular' },
      })
      expect(wrapper.find('i').classes()).not.toContain('fa-solid')
    })
  })

  describe('props/disabled', () => {
    it('disabled=true のとき disabled 属性が付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left', disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('disabled=false のとき disabled 属性が付与されない', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left', disabled: false },
      })
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })

    it('disabled=true のとき text-icon-disable クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left', disabled: true },
      })
      expect(wrapper.find('i').classes()).toContain('text-icon-disable')
    })

    it('disabled=false のとき text-icon-primary クラスが付与される', () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left', disabled: false },
      })
      expect(wrapper.find('i').classes()).toContain('text-icon-primary')
    })

    it('disabled=true のとき click イベントが発火しない', async () => {
      const wrapper = mount(AppButtonIcon, {
        props: { icon: 'arrow-left', disabled: true },
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })
})
