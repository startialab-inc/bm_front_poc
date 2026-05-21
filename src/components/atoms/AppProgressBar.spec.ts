import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppProgressBar from './AppProgressBar.vue'

describe('AppProgressBar', () => {
  // --- レンダリング ---
  describe('レンダリング', () => {
    it('エラーなくマウントできる', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('トラック div が存在する', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.find('div').exists()).toBe(true)
    })
  })

  // --- props: progress ---
  describe('props - progress', () => {
    it('progress=0 のとき フィル div の style が width: 0%', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 0 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.attributes('style')).toContain('width: 0%')
    })

    it('progress=50 のとき フィル div の style が width: 50%', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.attributes('style')).toContain('width: 50%')
    })

    it('progress=100 のとき フィル div の style が width: 100%', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 100 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.attributes('style')).toContain('width: 100%')
    })
  })

  // --- クラス確認（status 指定なし = default） ---
  describe('クラス確認（status 未指定）', () => {
    it('トラック div に h-2 クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.html()).toContain('h-2')
    })

    it('トラック div に w-full クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.html()).toContain('w-full')
    })

    it('トラック div に overflow-hidden クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.html()).toContain('overflow-hidden')
    })

    it('トラック div に bg-[#e2e8f0] クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      expect(wrapper.html()).toContain('bg-[#e2e8f0]')
    })

    it('フィル div に bg-btn-primary クラスが付与される（デフォルト色）', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('bg-btn-primary')
    })

    it('フィル div に absolute クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('absolute')
    })

    it('フィル div に h-full クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('h-full')
    })
  })

  // --- props: status ---
  describe('props - status', () => {
    it('status="info" のとき フィル div に bg-cyan-500 クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, status: 'info' },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('bg-cyan-500')
    })

    it('status="success" のとき フィル div に bg-green-500 クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, status: 'success' },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('bg-green-500')
    })

    it('status="warning" のとき フィル div に bg-yellow-500 クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, status: 'warning' },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('bg-yellow-500')
    })

    it('status="danger" のとき フィル div に bg-red-500 クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, status: 'danger' },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('bg-red-500')
    })

    it('status="info" のとき bg-btn-primary クラスが付与されない', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, status: 'info' },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).not.toContain('bg-btn-primary')
    })
  })

  // --- props: animated ---
  describe('props - animated', () => {
    it('animated 未指定のとき progress-animated クラスが付与されない', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50 },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).not.toContain('progress-animated')
    })

    it('animated=true のとき フィル div に progress-animated クラスが付与される', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, animated: true },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).toContain('progress-animated')
    })

    it('animated=false のとき progress-animated クラスが付与されない', () => {
      const wrapper = mount(AppProgressBar, {
        props: { progress: 50, animated: false },
      })
      // wrapper.find('div > div') はトラック div を返すため findAll で index 指定
      const fill = wrapper.findAll('div')[1]
      expect(fill.html()).not.toContain('progress-animated')
    })
  })
})
