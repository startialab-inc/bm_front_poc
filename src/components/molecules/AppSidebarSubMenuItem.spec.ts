import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebarSubMenuItem from './AppSidebarSubMenuItem.vue'

// RouterLink はテスト環境でスタブ化
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to'],
}

describe('AppSidebarSubMenuItem', () => {
  describe('レンダリング', () => {
    it('label テキストが表示される', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.text()).toContain('ページ一覧')
    })
  })

  describe('to なし（button）', () => {
    it('button としてレンダリングされる', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('クリックで click イベントが発火する', async () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      await wrapper.find('button').trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('to あり（RouterLink）', () => {
    it('RouterLink（a タグ）としてレンダリングされる', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', to: '/' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('a').exists()).toBe(true)
    })

    it('button が存在しない', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', to: '/' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.find('button').exists()).toBe(false)
    })
  })

  describe('props/current', () => {
    it('current=true のとき内側コンテナに bg-[#e2e8f0] が付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', current: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-[#e2e8f0]')
    })

    it('current=false（デフォルト）のとき bg-[#e2e8f0] が付かない', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('bg-[#e2e8f0]')
    })
  })

  describe('props/notification', () => {
    it('notification 未指定のとき通知バッジが存在しない', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('rounded-full')
    })

    it('notification に文字列を渡すとバッジにその値が表示される', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: '5' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('5')
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('notification に数値を渡すとバッジにその値が表示される', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: 12 },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('12')
    })

    it('notificationType="info"（デフォルト）のとき bg-cyan-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: '1' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-cyan-500')
    })

    it('notificationType="success" のとき bg-green-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: '1', notificationType: 'success' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-green-500')
    })

    it('notificationType="warning" のとき bg-yellow-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: '1', notificationType: 'warning' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-yellow-500')
    })

    it('notificationType="danger" のとき bg-red-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: '1', notificationType: 'danger' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-red-500')
    })

    it('notification=false のとき通知バッジが存在しない', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: false },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).not.toContain('rounded-full')
    })

    it('notification=true のときドット通知（w-3 h-3 rounded-full）が表示される', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('w-3')
      expect(wrapper.html()).toContain('h-3')
      expect(wrapper.html()).toContain('rounded-full')
    })

    it('notification=true のときバッジにテキストが含まれない', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: true },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      // ドット通知は span のみでテキストなし（label テキストのみ存在する）
      expect(wrapper.text()).toBe('ページ一覧')
    })

    it('notification=true かつ notificationType="danger" のとき bg-red-500 クラスが付く', () => {
      const wrapper = mount(AppSidebarSubMenuItem, {
        props: { label: 'ページ一覧', notification: true, notificationType: 'danger' },
        global: { stubs: { RouterLink: RouterLinkStub } },
      })
      expect(wrapper.html()).toContain('bg-red-500')
    })
  })
})
