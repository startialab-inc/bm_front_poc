import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebarMenuItem from './AppSidebarMenuItem.vue'

// RouterLink はテスト環境でスタブ化
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to'],
}

describe('AppSidebarMenuItem', () => {
  describe('レンダリング', () => {
    it('label テキストが表示される', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.text()).toContain('ダッシュボード')
    })

    it('デフォルト状態で白背景クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-white')
    })
  })

  describe('sub-menu なし', () => {
    it('chevron アイコンが存在しない', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('fa-chevron')
    })

    it('to が指定された場合、RouterLink としてレンダリングされる', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', to: '/' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('a').exists()).toBe(true)
    })

    it('to が未指定の場合、button としてレンダリングされる', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('to が未指定の button をクリックすると click イベントが発火する', async () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('sub-menu あり', () => {
    const mountWithSubMenu = (props = {}) =>
      mount(AppSidebarMenuItem, {
        props: { label: 'ページ管理', ...props },
        slots: { default: '<p>サブメニュー項目</p>' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })

    it('chevron-down アイコンが存在する（初期状態・折りたたみ）', () => {
      const wrapper = mountWithSubMenu()
      expect(wrapper.html()).toContain('fa-chevron-down')
    })

    it('初期状態でサブメニューが折りたたまれている（expanded クラスなし）', () => {
      const wrapper = mountWithSubMenu()
      // CSS grid アニメーション: submenu-container--expanded がない = 折りたたみ状態
      expect(wrapper.find('.submenu-container--expanded').exists()).toBe(false)
    })

    it('ボタンクリックでサブメニューが展開される（expanded クラス付与）', async () => {
      const wrapper = mountWithSubMenu()
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('.submenu-container--expanded').exists()).toBe(true)
    })

    it('2回クリックでサブメニューが再び折りたたまれる（expanded クラス除去）', async () => {
      const wrapper = mountWithSubMenu()
      await wrapper.find('button').trigger('click')
      await wrapper.find('button').trigger('click')
      expect(wrapper.find('.submenu-container--expanded').exists()).toBe(false)
    })

    it('展開後は chevron アイコンに回転クラスが付与される', async () => {
      const wrapper = mountWithSubMenu()
      await wrapper.find('button').trigger('click')
      expect(wrapper.html()).toContain('chevron-icon--expanded')
    })

    it('slot の内容が描画される', () => {
      const wrapper = mountWithSubMenu()
      expect(wrapper.html()).toContain('サブメニュー項目')
    })

    it('サブメニューコンテナに左縦線の before 擬似要素クラスが付与される', () => {
      const wrapper = mountWithSubMenu()
      // before:border-l クラスによる左縦線（Figma: left:16px / border-left: 1px solid #e5e5e5）
      expect(wrapper.html()).toContain('before:border-l')
    })
  })

  describe('props/current', () => {
    it('current=true のとき青背景クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', current: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-[#2862cb]')
    })

    it('current=true かつ sub-menu あり: 初期状態でサブメニューが展開される（expanded クラス付与）', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ページ管理', current: true },
        slots: { default: '<p>サブメニュー項目</p>' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('.submenu-container--expanded').exists()).toBe(true)
    })

    it('current=true かつ sub-menu あり: chevron アイコンが初期状態で回転クラスを持つ', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ページ管理', current: true },
        slots: { default: '<p>サブメニュー項目</p>' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('chevron-icon--expanded')
    })
  })

  describe('props/notification', () => {
    it('notification 未指定のとき通知バッジが存在しない', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('rounded-full')
    })

    it('notification に文字列を渡すとバッジにその値が表示される', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: '5' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('5')
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('notification に数値を渡すとバッジにその値が表示される', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: 12 },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('12')
    })

    it('notificationType="info"（デフォルト）のとき bg-cyan-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: '1' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-cyan-500')
    })

    it('notificationType="info" のとき bg-cyan-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: '1', notificationType: 'info' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-cyan-500')
    })

    it('notificationType="warning" のとき bg-yellow-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: '1', notificationType: 'warning' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-yellow-500')
    })

    it('notificationType="danger" のとき bg-red-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: '1', notificationType: 'danger' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-red-500')
    })

    it('notification=false のとき通知バッジが存在しない', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: false },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('rounded-full')
    })

    it('notification=true のときドット通知（w-3 h-3 rounded-full）が表示される', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('w-3')
      expect(wrapper.html()).toContain('h-3')
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('notification=true のときバッジにテキストが含まれない', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      // ドット通知は span のみでテキストなし（label テキストのみ存在する）
      expect(wrapper.text()).toBe('ダッシュボード')
    })

    it('notification=true かつ notificationType="danger" のとき bg-red-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarMenuItem, {
        props: { label: 'ダッシュボード', notification: true, notificationType: 'danger' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-red-500')
    })
  })
})
