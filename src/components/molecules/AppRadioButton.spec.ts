import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppRadioButton from './AppRadioButton.vue'

describe('AppRadioButton', () => {
  describe('レンダリング', () => {
    it('label 要素として描画される', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'オプション A', value: 'a', name: 'group' },
      })
      expect(wrapper.find('label').exists()).toBe(true)
    })

    it('ラベルテキストが表示される', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'オプション A', value: 'a', name: 'group' },
      })
      expect(wrapper.text()).toContain('オプション A')
    })

    it('BaseRadioInput（input[type="radio"]）が内包される', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'オプション A', value: 'a', name: 'group' },
      })
      expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    })

    it('デフォルト variant は text', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'オプション A', value: 'a', name: 'group' },
      })
      // text variant は w-[180px] クラスを持たない
      expect(wrapper.html()).not.toContain('w-[180px]')
    })
  })

  describe('props/variant', () => {
    it('variant="text" のとき w-[180px] クラスが付かない', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'text', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.html()).not.toContain('w-[180px]')
    })

    it('variant="box" のとき w-[180px] クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'box', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.html()).toContain('w-[180px]')
    })

    it('variant="box" のとき rounded-[6px] クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'box', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.html()).toContain('rounded-[6px]')
    })

    it('variant="box" のとき border クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'box', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.html()).toContain('border')
    })

    it('variant="text" のときラベルは font-normal', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'text', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.find('span').html()).toContain('font-normal')
    })

    it('variant="box" のときラベルは font-medium', () => {
      const wrapper = mount(AppRadioButton, {
        props: { variant: 'box', label: 'A', value: 'a', name: 'group' },
      })
      expect(wrapper.find('span').html()).toContain('font-medium')
    })
  })

  describe('v-model / 選択状態', () => {
    it('modelValue と value が一致するとき input は checked', () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: 'a',
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
    })

    it('modelValue と value が異なるとき input は未チェック', () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: 'b',
          'onUpdate:modelValue': () => {},
        },
      })
      expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
    })

    it('variant="box" で選択時に border-btn-primary クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          variant: 'box',
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: 'a',
          'onUpdate:modelValue': () => {},
        },
      })
      expect(wrapper.html()).toContain('border-btn-primary')
    })

    it('variant="box" で選択時に bg-surface-selected クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          variant: 'box',
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: 'a',
          'onUpdate:modelValue': () => {},
        },
      })
      expect(wrapper.html()).toContain('bg-surface-selected')
    })

    it('variant="box" で非選択時に bg-white クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          variant: 'box',
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: 'b',
          'onUpdate:modelValue': () => {},
        },
      })
      expect(wrapper.html()).toContain('bg-white')
    })

    it('input の change で update:modelValue が発行される', async () => {
      const wrapper = mount(AppRadioButton, {
        props: {
          label: 'A',
          value: 'a',
          name: 'group',
          modelValue: '',
          'onUpdate:modelValue': () => {},
        },
      })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  describe('props/disabled', () => {
    it('disabled=true のとき cursor-not-allowed クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'A', value: 'a', name: 'group', disabled: true },
      })
      expect(wrapper.html()).toContain('cursor-not-allowed')
    })

    it('disabled=true のとき opacity-50 クラスが付く', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'A', value: 'a', name: 'group', disabled: true },
      })
      expect(wrapper.html()).toContain('opacity-50')
    })

    it('disabled=true のとき BaseRadioInput に disabled が伝わる', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'A', value: 'a', name: 'group', disabled: true },
      })
      expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
    })

    it('disabled=false のデフォルト状態では input は disabled でない', () => {
      const wrapper = mount(AppRadioButton, {
        props: { label: 'A', value: 'a', name: 'group' },
      })
      expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(false)
    })
  })
})
