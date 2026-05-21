import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSnackbar from './AppSnackbar.vue'

describe('AppSnackbar', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('type="success" でエラーなくマウントできる', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.exists()).toBe(true)
    })

    it('border クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('border')
    })

    it('rounded-[6px] クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('rounded-[6px]')
    })

    it('w-[388px] クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('w-[388px]')
    })

    it('FontAwesome アイコン要素が存在する', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.find('i.fa-solid').exists()).toBe(true)
    })

    it('タイトル p 要素が存在する', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      const ps = wrapper.findAll('p')
      expect(ps.length).toBeGreaterThanOrEqual(1)
    })
  })

  // --- props - type ---
  describe('props - type', () => {
    it('type="success" のとき bg-[#ecfdf5] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('bg-[#ecfdf5]')
    })

    it('type="success" のとき border-[#34d399] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('border-[#34d399]')
    })

    it('type="success" のとき fa-circle-check アイコンが使用される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('fa-circle-check')
    })

    it('type="success" のとき アイコン色 text-[#059669] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('text-[#059669]')
    })

    it('type="info" のとき bg-[#f0f9ff] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'info', title: 'タイトル' } })
      expect(wrapper.html()).toContain('bg-[#f0f9ff]')
    })

    it('type="info" のとき border-[#0ea5e9] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'info', title: 'タイトル' } })
      expect(wrapper.html()).toContain('border-[#0ea5e9]')
    })

    it('type="info" のとき fa-circle-info アイコンが使用される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'info', title: 'タイトル' } })
      expect(wrapper.html()).toContain('fa-circle-info')
    })

    it('type="info" のとき アイコン色 text-[#0ea5e9] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'info', title: 'タイトル' } })
      expect(wrapper.html()).toContain('text-[#0ea5e9]')
    })

    it('type="warning" のとき bg-[#fff7ed] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'warning', title: 'タイトル' } })
      expect(wrapper.html()).toContain('bg-[#fff7ed]')
    })

    it('type="warning" のとき border-[#fb923c] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'warning', title: 'タイトル' } })
      expect(wrapper.html()).toContain('border-[#fb923c]')
    })

    it('type="warning" のとき fa-circle-exclamation アイコンが使用される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'warning', title: 'タイトル' } })
      expect(wrapper.html()).toContain('fa-circle-exclamation')
    })

    it('type="warning" のとき アイコン色 text-[#ea580c] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'warning', title: 'タイトル' } })
      expect(wrapper.html()).toContain('text-[#ea580c]')
    })

    it('type="error" のとき bg-[#fef2f2] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'error', title: 'タイトル' } })
      expect(wrapper.html()).toContain('bg-[#fef2f2]')
    })

    it('type="error" のとき border-[#f87171] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'error', title: 'タイトル' } })
      expect(wrapper.html()).toContain('border-[#f87171]')
    })

    it('type="error" のとき fa-triangle-exclamation アイコンが使用される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'error', title: 'タイトル' } })
      expect(wrapper.html()).toContain('fa-triangle-exclamation')
    })

    it('type="error" のとき アイコン色 text-[#dc2626] が付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'error', title: 'タイトル' } })
      expect(wrapper.html()).toContain('text-[#dc2626]')
    })
  })

  // --- props - title ---
  describe('props - title', () => {
    it('title="保存しました" のとき "保存しました" が表示される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: '保存しました' } })
      expect(wrapper.text()).toContain('保存しました')
    })

    it('title="エラーが発生しました" のとき "エラーが発生しました" が表示される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'error', title: 'エラーが発生しました' } })
      expect(wrapper.text()).toContain('エラーが発生しました')
    })

    it('タイトル p 要素に font-bold クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('font-bold')
    })

    it('タイトル p 要素に text-[16px] クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      expect(wrapper.html()).toContain('text-[16px]')
    })
  })

  // --- props - description ---
  describe('props - description', () => {
    it('description を指定したとき説明文が表示される', () => {
      const wrapper = mount(AppSnackbar, {
        props: { type: 'success', title: 'タイトル', description: '詳細説明テキスト' },
      })
      expect(wrapper.text()).toContain('詳細説明テキスト')
    })

    it('description を省略したとき説明文エリアが存在しない', () => {
      const wrapper = mount(AppSnackbar, { props: { type: 'success', title: 'タイトル' } })
      // description なしのとき p 要素はタイトル分の 1 つのみ
      expect(wrapper.findAll('p')).toHaveLength(1)
    })

    it('description あり のとき p 要素が 2 つ存在する', () => {
      const wrapper = mount(AppSnackbar, {
        props: { type: 'success', title: 'タイトル', description: '説明文' },
      })
      expect(wrapper.findAll('p')).toHaveLength(2)
    })

    it('description エリアに pl-6 クラスが付与される', () => {
      const wrapper = mount(AppSnackbar, {
        props: { type: 'success', title: 'タイトル', description: '説明文' },
      })
      expect(wrapper.html()).toContain('pl-6')
    })
  })
})
