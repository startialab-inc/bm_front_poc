import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPagination from './AppPagination.vue'
import AppPagerNav from '@/components/atoms/AppPagerNav.vue'

describe('AppPagination', () => {
  describe('レンダリング', () => {
    it('総件数テキストが「全 42 件中」と表示される', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 42, totalPages: 10, modelValue: 1 },
      })
      expect(wrapper.text()).toContain('全 42 件中')
    })

    it('AppPagerNav が 4 つ描画される', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 42, totalPages: 10, modelValue: 1 },
      })
      expect(wrapper.findAllComponents(AppPagerNav)).toHaveLength(4)
    })
  })

  describe('ページ番号表示', () => {
    it('totalPages=3 のとき 3 つのページ番号ボタンが描画される', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 30, totalPages: 3, modelValue: 1 },
      })
      // AppPagerNumber は button か div で描画される
      const pageButtons = wrapper.findAll('button[type="button"]').filter(
        (el) => el.classes().includes('rounded-full') && el.classes().includes('h-6'),
      )
      expect(pageButtons).toHaveLength(2) // 非アクティブの 2・3（アクティブの1はdiv）
    })

    it('totalPages=10 かつ中間ページ(5)のとき省略記号「‥」が表示される', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 100, totalPages: 10, modelValue: 5 },
      })
      expect(wrapper.text()).toContain('‥')
    })

    it('totalPages=3 のとき省略記号「‥」は表示されない', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 30, totalPages: 3, modelValue: 1 },
      })
      expect(wrapper.text()).not.toContain('‥')
    })
  })

  describe('v-model', () => {
    it('ページ番号ボタンをクリックすると update:modelValue が emit される', async () => {
      const wrapper = mount(AppPagination, {
        props: {
          totalCount: 30,
          totalPages: 3,
          modelValue: 1,
          'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
        },
      })
      // 非アクティブのボタン（page=2）をクリック
      const btn = wrapper.findAll('button').find((el) =>
        el.classes().includes('rounded-full') && el.classes().includes('h-6'),
      )
      await btn!.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('prev 矢印をクリックするとページが 1 つ前に移動する', async () => {
      const wrapper = mount(AppPagination, {
        props: {
          totalCount: 100,
          totalPages: 10,
          modelValue: 5,
          'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
        },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const prevNav = navComponents.find((c) => c.props('type') === 'prev')
      await prevNav!.find('button').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe(4)
    })

    it('next 矢印をクリックするとページが 1 つ後に移動する', async () => {
      const wrapper = mount(AppPagination, {
        props: {
          totalCount: 100,
          totalPages: 10,
          modelValue: 5,
          'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
        },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const nextNav = navComponents.find((c) => c.props('type') === 'next')
      await nextNav!.find('button').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe(6)
    })

    it('first 矢印をクリックすると 1 ページ目に移動する', async () => {
      const wrapper = mount(AppPagination, {
        props: {
          totalCount: 100,
          totalPages: 10,
          modelValue: 5,
          'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
        },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const firstNav = navComponents.find((c) => c.props('type') === 'first')
      await firstNav!.find('button').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe(1)
    })

    it('last 矢印をクリックすると最終ページに移動する', async () => {
      const wrapper = mount(AppPagination, {
        props: {
          totalCount: 100,
          totalPages: 10,
          modelValue: 5,
          'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }),
        },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const lastNav = navComponents.find((c) => c.props('type') === 'last')
      await lastNav!.find('button').trigger('click')
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe(10)
    })
  })

  describe('矢印 disabled 状態', () => {
    it('1ページ目のとき first/prev の AppPagerNav は disabled', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 100, totalPages: 10, modelValue: 1 },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const firstNav = navComponents.find((c) => c.props('type') === 'first')
      const prevNav = navComponents.find((c) => c.props('type') === 'prev')
      expect(firstNav!.find('button').attributes('disabled')).toBeDefined()
      expect(prevNav!.find('button').attributes('disabled')).toBeDefined()
    })

    it('最終ページのとき next/last の AppPagerNav は disabled', () => {
      const wrapper = mount(AppPagination, {
        props: { totalCount: 100, totalPages: 10, modelValue: 10 },
      })
      const navComponents = wrapper.findAllComponents(AppPagerNav)
      const nextNav = navComponents.find((c) => c.props('type') === 'next')
      const lastNav = navComponents.find((c) => c.props('type') === 'last')
      expect(nextNav!.find('button').attributes('disabled')).toBeDefined()
      expect(lastNav!.find('button').attributes('disabled')).toBeDefined()
    })
  })
})
