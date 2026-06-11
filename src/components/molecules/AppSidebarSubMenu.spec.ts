import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import AppSidebarSubMenu from './AppSidebarSubMenu.vue'
import AppSidebarSubMenuItem from './AppSidebarSubMenuItem.vue'

/** RouterLink スタブ（AppSidebarSubMenuItem が RouterLink を使うため） */
const RouterLinkStub = defineComponent({
  name: 'RouterLink',
  props: ['to'],
  template: '<a><slot /></a>',
})

describe('AppSidebarSubMenu', () => {
  describe('レンダリング', () => {
    it('デフォルトでコンテナ div が描画される', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('slot の内容が描画される', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        slots: { default: '<p>テスト項目</p>' },
      })
      expect(wrapper.text()).toContain('テスト項目')
    })
  })

  describe('props/type', () => {
    it('type="inline"（デフォルト）のとき flex-col クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.html()).toContain('flex-col')
    })

    it('type="inline"（デフォルト）のとき w-full クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.html()).toContain('w-full')
    })

    it('type="inline" + standalone=true のとき w-full クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu, { props: { standalone: true } })
      expect(wrapper.html()).toContain('w-full')
    })

    it('type="inline"（デフォルト）のとき flex クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.html()).toContain('flex')
    })

    it('type="inline"（デフォルト）のとき gap-2 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.html()).toContain('gap-2')
    })

    it('type="inline"（デフォルト）のとき py-3 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.html()).toContain('py-3')
    })

    it('type="inline" + standalone=false のとき before:border-l が付かない（親に委ねる）', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'inline', standalone: false },
      })
      expect(wrapper.html()).not.toContain('before:border-l')
    })

    it('type="inline" + standalone=false のとき pl-6 が付かない（親に委ねる）', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'inline', standalone: false },
      })
      expect(wrapper.html()).not.toContain('pl-6')
    })

    it('type="inline" + standalone=true のとき before:border-l が付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'inline', standalone: true },
      })
      expect(wrapper.html()).toContain('before:border-l')
    })

    it('type="inline" + standalone=true のとき pl-6 が付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'inline', standalone: true },
      })
      expect(wrapper.html()).toContain('pl-6')
    })

    it('type="inline" + standalone=true のとき before:left-4 が付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'inline', standalone: true },
      })
      expect(wrapper.html()).toContain('before:left-4')
    })

    it('type="popup" のとき bg-white クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup' },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('type="popup" のとき rounded-[8px] クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup' },
      })
      expect(wrapper.html()).toContain('rounded-[8px]')
    })

    it('type="popup" のとき デフォルトで width: 240px がインラインスタイルに付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup' },
      })
      expect(wrapper.html()).toContain('width: 240px')
    })

    it('type="popup" + width="320px" のとき width: 320px がインラインスタイルに付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup', width: '320px' },
      })
      expect(wrapper.html()).toContain('width: 320px')
    })

    it('type="popup" のとき shadow-[ で始まるクラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup' },
      })
      expect(wrapper.html()).toContain('shadow-[')
    })

    it('type="popup" のとき inline 用の before:border-l が付かない', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        props: { type: 'popup' },
      })
      expect(wrapper.html()).not.toContain('before:border-l')
    })
  })

  describe('スロット', () => {
    it('複数の子要素が全て描画される', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        slots: { default: '<p>項目A</p><p>項目B</p><p>項目C</p>' },
      })
      expect(wrapper.text()).toContain('項目A')
      expect(wrapper.text()).toContain('項目B')
      expect(wrapper.text()).toContain('項目C')
    })

    it('slot が空の場合でもコンテナが描画される', () => {
      const wrapper = mount(AppSidebarSubMenu)
      expect(wrapper.find('div').exists()).toBe(true)
    })
  })

  describe('AppSidebarSubMenuItem との組み合わせ', () => {
    it('AppSidebarSubMenuItem の label が描画される', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        slots: {
          default: {
            template: '<AppSidebarSubMenuItem label="ページ一覧" />',
            components: { AppSidebarSubMenuItem },
          },
        },
        global: {
          stubs: { RouterLink: RouterLinkStub },
        },
      })
      expect(wrapper.text()).toContain('ページ一覧')
    })

    it('複数の AppSidebarSubMenuItem が全て描画される', () => {
      const wrapper = mount(AppSidebarSubMenu, {
        slots: {
          default: {
            template: `
              <AppSidebarSubMenuItem label="ページ一覧" />
              <AppSidebarSubMenuItem label="新規作成" />
              <AppSidebarSubMenuItem label="設定" />
            `,
            components: { AppSidebarSubMenuItem },
          },
        },
        global: {
          stubs: { RouterLink: RouterLinkStub },
        },
      })
      expect(wrapper.text()).toContain('ページ一覧')
      expect(wrapper.text()).toContain('新規作成')
      expect(wrapper.text()).toContain('設定')
    })
  })
})
