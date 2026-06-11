import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton', () => {
  describe('レンダリング', () => {
    it('デフォルト props でレンダリングされる', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost' },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('label prop が指定されたとき、テキストが表示される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', label: '保存する' },
      })
      expect(wrapper.text()).toContain('保存する')
    })

    it('iconLeft が指定されたとき、左アイコン要素が存在する', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost', iconLeft: 'star' },
      })
      expect(wrapper.find('i').exists()).toBe(true)
    })

    it('iconLeft が未指定のとき、アイコン要素が存在しない', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', label: 'テスト' },
      })
      expect(wrapper.find('i').exists()).toBe(false)
    })

    it('iconRight が指定されたとき、アイコン要素が存在する', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', iconRight: 'arrow-right' },
      })
      expect(wrapper.find('i').exists()).toBe(true)
    })
  })

  describe('props / variant', () => {
    it('variant="ghost" のとき、text-text-primary クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost' },
      })
      expect(wrapper.classes()).toContain('text-text-primary')
    })

    it('variant="primary" のとき、bg-btn-primary クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary' },
      })
      expect(wrapper.classes()).toContain('bg-btn-primary')
    })

    it('variant="submit" のとき、bg-btn-submit クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'submit' },
      })
      expect(wrapper.classes()).toContain('bg-btn-submit')
    })

    it('variant="destructive" のとき、bg-btn-destructive クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'destructive' },
      })
      expect(wrapper.classes()).toContain('bg-btn-destructive')
    })

    it('variant="secondary" のとき、bg-surface-primary クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'secondary' },
      })
      expect(wrapper.classes()).toContain('bg-surface-primary')
    })

    it('variant="sort" のとき、デフォルトの右アイコンが表示される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'sort' },
      })
      // sort はデフォルトで iconRight が付与される
      expect(wrapper.find('i').exists()).toBe(true)
      expect(wrapper.find('i').classes()).toContain('fa-arrow-down-wide-short')
    })

    it('variant="filter" のとき、デフォルトの右アイコンが表示される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'filter' },
      })
      // filter はデフォルトで iconRight が付与される
      expect(wrapper.find('i').exists()).toBe(true)
      expect(wrapper.find('i').classes()).toContain('fa-sliders')
    })

    it('variant="sort" のとき、デフォルトラベル「更新日順に表示」が表示される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'sort' },
      })
      expect(wrapper.text()).toContain('更新日順に表示')
    })

    it('variant="filter" のとき、デフォルトラベル「絞り込み検索」が表示される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'filter' },
      })
      expect(wrapper.text()).toContain('絞り込み検索')
    })

    it('variant="ghost-danger" のとき、赤テキストクラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost-danger', label: '削除' },
      })
      expect(wrapper.html()).toContain('text-[#dc2626]')
    })
  })

  describe('サイズ', () => {
    it('variant="ghost-danger" のとき、デフォルトで sm サイズ（h-8）が適用される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost-danger', label: '削除' },
      })
      expect(wrapper.classes()).toContain('h-8')
    })

    it('variant="ghost" のとき、デフォルトで sm サイズ（h-8）が適用される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost' },
      })
      expect(wrapper.classes()).toContain('h-8')
    })

    it('variant="primary" のとき、デフォルトで md サイズ（h-10）が適用される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary' },
      })
      expect(wrapper.classes()).toContain('h-10')
    })

    it('size="sm" を明示指定したとき、h-8 クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', size: 'sm' },
      })
      expect(wrapper.classes()).toContain('h-8')
    })

    it('size="md" を明示指定したとき、h-10 クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost', size: 'md' },
      })
      expect(wrapper.classes()).toContain('h-10')
    })
  })

  describe('disabled', () => {
    it('disabled=true のとき、disabled 属性が付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', disabled: true },
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('disabled=false のとき、disabled 属性が付与されない', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'primary', disabled: false },
      })
      expect(wrapper.attributes('disabled')).toBeUndefined()
    })

    it('disabled=true のとき、アイコンに text-icon-disable クラスが付与される', () => {
      const wrapper = mount(AppButton, {
        props: { variant: 'ghost', disabled: true, iconLeft: 'star' },
      })
      expect(wrapper.find('i').classes()).toContain('text-icon-disable')
    })
  })
})
