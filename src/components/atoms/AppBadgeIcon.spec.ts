import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBadgeIcon from './AppBadgeIcon.vue'

describe('AppBadgeIcon', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    const types = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'BowNow', 'Curation'] as const

    types.forEach((type) => {
      it(`type="${type}" active=true でエラーなくマウントできる`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: true } })
        expect(wrapper.exists()).toBe(true)
      })

      it(`type="${type}" active=false でエラーなくマウントできる`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: false } })
        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  // --- props: 背景色クラス ---
  // wrapper.classes() は VueWrapper のルート要素参照の差異により空配列になる場合があるため
  // wrapper.html()（outerHTML 文字列）でクラス名の存在を確認する
  describe('props - 背景色クラス', () => {
    // active=true かつ通常タイプ（BowNow/BowNowScript 以外）は #143166
    const normalActiveTypes = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'Curation'] as const
    normalActiveTypes.forEach((type) => {
      it(`type="${type}" active=true: bg-[#143166] クラスが付与される`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: true } })
        expect(wrapper.html()).toContain('bg-[#143166]')
      })
    })

    // BowNow / BowNowScript の active 時は深紅 #5a0000
    it('type="BowNow" active=true: bg-[#5a0000] クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: true } })
      expect(wrapper.html()).toContain('bg-[#5a0000]')
    })

    it('type="BowNowScript" active=true: bg-[#5a0000] クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNowScript', active: true } })
      expect(wrapper.html()).toContain('bg-[#5a0000]')
    })

    // inactive 時は全タイプ共通で #e2e8f0
    const allTypes = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'BowNow', 'Curation'] as const
    allTypes.forEach((type) => {
      it(`type="${type}" active=false: bg-[#e2e8f0] クラスが付与される`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: false } })
        expect(wrapper.html()).toContain('bg-[#e2e8f0]')
      })
    })
  })

  // --- props: FontAwesome アイコンクラス ---
  describe('props - アイコンクラス（FontAwesome）', () => {
    it('type="Contact": fa-envelope クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'Contact', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-envelope')
    })

    it('type="Editable": fa-users クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'Editable', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-users')
    })

    it('type="PageSetting": fa-gears クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'PageSetting', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-gears')
    })

    it('type="OpenTerm": fa-calendar クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'OpenTerm', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-calendar')
    })

    it('type="BowNowScript": fa-code クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNowScript', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-code')
    })

    it('type="Curation": fa-quote-left クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'Curation', active: true } })
      expect(wrapper.find('i').classes()).toContain('fa-quote-left')
    })
  })

  // --- props: アイコン色クラス ---
  describe('props - アイコン色クラス', () => {
    // 通常タイプの active 時は白
    const normalActiveTypes = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'Curation'] as const
    normalActiveTypes.forEach((type) => {
      it(`type="${type}" active=true: text-white クラスが付与される`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: true } })
        expect(wrapper.find('i').classes()).toContain('text-white')
      })
    })

    // BowNowScript の active 時は赤
    it('type="BowNowScript" active=true: text-[#fe0100] クラスが付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNowScript', active: true } })
      expect(wrapper.find('i').classes()).toContain('text-[#fe0100]')
    })

    // inactive 時は全タイプ共通で ic-disable (#cbd5e1)
    const fontAwesomeTypes = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'Curation'] as const
    fontAwesomeTypes.forEach((type) => {
      it(`type="${type}" active=false: text-[#cbd5e1] クラスが付与される`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: false } })
        expect(wrapper.find('i').classes()).toContain('text-[#cbd5e1]')
      })
    })
  })

  // --- BowNow 固有 ---
  describe('BowNow 固有', () => {
    it('type="BowNow" active=true: <img> 要素が存在し src に bow-now-active.svg が含まれる', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: true } })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toContain('bow-now-active.svg')
    })

    it('type="BowNow" active=false: <img> src に bow-now-inactive.svg が含まれる', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: false } })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toContain('bow-now-inactive.svg')
    })

    it('type="BowNow": <i> 要素は存在しない', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: true } })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    // FontAwesome タイプでは <img> が存在しないことを確認
    const fontAwesomeTypes = ['Contact', 'Editable', 'PageSetting', 'OpenTerm', 'BowNowScript', 'Curation'] as const
    fontAwesomeTypes.forEach((type) => {
      it(`type="${type}": <img> 要素は存在しない`, () => {
        const wrapper = mount(AppBadgeIcon, { props: { type, active: true } })
        expect(wrapper.find('img').exists()).toBe(false)
      })
    })
  })

  // --- アクセシビリティ ---
  describe('アクセシビリティ', () => {
    it('<i> 要素に aria-hidden="true" が付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'Contact', active: true } })
      expect(wrapper.find('i').attributes('aria-hidden')).toBe('true')
    })

    it('<img> 要素に aria-hidden="true" が付与される', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: true } })
      expect(wrapper.find('img').attributes('aria-hidden')).toBe('true')
    })

    it('<img> 要素の alt が空文字', () => {
      const wrapper = mount(AppBadgeIcon, { props: { type: 'BowNow', active: true } })
      expect(wrapper.find('img').attributes('alt')).toBe('')
    })
  })
})
