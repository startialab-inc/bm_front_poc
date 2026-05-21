import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTooltip from './AppTooltip.vue'

describe('AppTooltip', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('slot のコンテンツが表示される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'ツールチップ' },
        slots: { default: '<button>ホバーしてね</button>' },
      })
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('ホバーしてね')
    })

    it('初期状態でツールチップが非表示（display:none が設定されている）', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).toBe('none')
    })
  })

  describe('props - text', () => {
    it('text="テキスト" のとき "テキスト" が表示される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').text()).toBe('テキスト')
    })

    it('text="別のテキスト" のとき "別のテキスト" が表示される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: '別のテキスト' },
      })
      expect(wrapper.find('p').text()).toBe('別のテキスト')
    })
  })

  describe('props - placement', () => {
    it('placement 未指定のとき data-placement="top" が矢印要素に付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('span[data-placement]').attributes('data-placement')).toBe('top')
    })

    it('placement="bottom" のとき data-placement="bottom" が付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', placement: 'bottom' },
      })
      expect(wrapper.find('span[data-placement]').attributes('data-placement')).toBe('bottom')
    })

    it('placement="left" のとき data-placement="left" が付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', placement: 'left' },
      })
      expect(wrapper.find('span[data-placement]').attributes('data-placement')).toBe('left')
    })

    it('placement="right" のとき data-placement="right" が付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', placement: 'right' },
      })
      expect(wrapper.find('span[data-placement]').attributes('data-placement')).toBe('right')
    })
  })

  describe('props - width', () => {
    it('width 未指定のとき tooltip の style に width が設定されない', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      const style = wrapper.find('[role="tooltip"]').attributes('style') ?? ''
      expect(style).not.toMatch(/width/)
    })

    it('width="146px" のとき tooltip の style.width が "146px" になる', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', width: '146px' },
      })
      expect(wrapper.find('[role="tooltip"]').attributes('style')).toMatch(/width:\s*146px/)
    })
  })

  describe('props - offset', () => {
    it('offset 未指定のとき tooltip の位置が calc(100% + 5px) になる', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', placement: 'top' },
      })
      expect(wrapper.find('[role="tooltip"]').attributes('style')).toMatch(/calc\(100% \+ 5px\)/)
    })

    it('offset=4 のとき tooltip の位置が calc(100% + 9px) になる', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', placement: 'top', offset: 4 },
      })
      expect(wrapper.find('[role="tooltip"]').attributes('style')).toMatch(/calc\(100% \+ 9px\)/)
    })
  })

  describe('trigger - hover', () => {
    it('trigger="hover" のとき hover でツールチップが表示される', async () => {
      // 内部実装は mouseover + relatedTarget チェック（JSDOM の mouseenter 制限を回避）
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'hover' },
        slots: { default: '<button id="btn">ホバー</button>' },
      })
      await wrapper.find('#btn').trigger('mouseover')
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).not.toBe('none')
    })

    it('trigger="hover" のとき hover 解除でツールチップが非表示になる', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'hover' },
        slots: { default: '<button id="btn">ホバー</button>' },
      })
      await wrapper.find('#btn').trigger('mouseover')
      await wrapper.find('#btn').trigger('mouseout')
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).toBe('none')
    })
  })

  describe('trigger - click', () => {
    it('trigger="click" のとき click でツールチップが表示される', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'click' },
        slots: { default: '<button id="btn">クリック</button>' },
      })
      await wrapper.find('#btn').trigger('click')
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).not.toBe('none')
    })

    it('trigger="click" のとき 再 click でツールチップが非表示になる', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'click' },
        slots: { default: '<button id="btn">クリック</button>' },
      })
      await wrapper.find('#btn').trigger('click')
      await wrapper.find('#btn').trigger('click')
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).toBe('none')
    })
  })

  describe('trigger - manual', () => {
    it('show() でツールチップが表示される', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'manual' },
      })
      wrapper.vm.show()
      await wrapper.vm.$nextTick()
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).not.toBe('none')
    })

    it('hide() でツールチップが非表示になる', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'manual' },
      })
      wrapper.vm.show()
      await wrapper.vm.$nextTick()
      wrapper.vm.hide()
      await wrapper.vm.$nextTick()
      const el = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(el.style.display).toBe('none')
    })

    it('toggle() でツールチップの表示が切り替わる', async () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト', trigger: 'manual' },
      })
      wrapper.vm.toggle()
      await wrapper.vm.$nextTick()
      const elAfterToggle = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(elAfterToggle.style.display).not.toBe('none')
      wrapper.vm.toggle()
      await wrapper.vm.$nextTick()
      const elAfterToggle2 = wrapper.find('[role="tooltip"]').element as HTMLElement
      expect(elAfterToggle2.style.display).toBe('none')
    })
  })

  describe('スタイル', () => {
    it('ツールチップ要素に rounded-[4px] クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('[role="tooltip"]').classes()).toContain('rounded-[4px]')
    })

    it('テキスト p 要素に whitespace-nowrap クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').classes()).toContain('whitespace-nowrap')
    })

    it('テキスト p 要素に font-semibold クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').classes()).toContain('font-semibold')
    })

    it('テキスト p 要素に text-[#fafafa] クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').classes()).toContain('text-[#fafafa]')
    })

    it('テキスト p 要素に text-[10px] クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').classes()).toContain('text-[10px]')
    })

    it('テキスト p 要素に leading-[16px] クラスが付与される', () => {
      const wrapper = mount(AppTooltip, {
        props: { text: 'テキスト' },
      })
      expect(wrapper.find('p').classes()).toContain('leading-[16px]')
    })
  })
})
