import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TmlButton from '../src/components/button/tml-button.vue'

describe('TmlButton', () => {
  describe('基础功能', () => {
    it('应该正确渲染', () => {
      const wrapper = mount(TmlButton, {
        slots: {
          default: 'Click Me'
        }
      })
      expect(wrapper.text()).toContain('Click Me')
      expect(wrapper.classes()).toContain('tml-button')
    })

    it('应该渲染空按钮', () => {
      const wrapper = mount(TmlButton)
      expect(wrapper.find('.tml-button').exists()).toBe(true)
    })
  })

  describe('Props 测试', () => {
    it('应该应用正确的 type class', () => {
      const types = ['default', 'primary', 'success', 'warning', 'danger'] as const
      types.forEach((type) => {
        const wrapper = mount(TmlButton, {
          props: { type }
        })
        expect(wrapper.classes()).toContain(`tml-button--${type}`)
      })
    })

    it('应该应用正确的 size class', () => {
      const sizes = ['small', 'medium', 'large'] as const
      sizes.forEach((size) => {
        const wrapper = mount(TmlButton, {
          props: { size }
        })
        expect(wrapper.classes()).toContain(`tml-button--${size}`)
      })
    })

    it('应该在 disabled 时禁用按钮', () => {
      const wrapper = mount(TmlButton, {
        props: { disabled: true }
      })
      expect(wrapper.classes()).toContain('is-disabled')
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('应该在 loading 时显示加载状态', () => {
      const wrapper = mount(TmlButton, {
        props: { loading: true }
      })
      expect(wrapper.classes()).toContain('is-loading')
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.find('.tml-button__loading-icon').exists()).toBe(true)
    })
  })

  describe('事件测试', () => {
    it('应该在点击时触发 click 事件', async () => {
      const wrapper = mount(TmlButton)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('disabled 时不应该触发 click 事件', async () => {
      const wrapper = mount(TmlButton, {
        props: { disabled: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('loading 时不应该触发 click 事件', async () => {
      const wrapper = mount(TmlButton, {
        props: { loading: true }
      })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('应该传递正确的事件对象', async () => {
      const wrapper = mount(TmlButton)
      await wrapper.trigger('click')
      const clickEvent = wrapper.emitted('click')?.[0]?.[0]
      expect(clickEvent).toBeInstanceOf(MouseEvent)
    })
  })

  describe('插槽测试', () => {
    it('应该正确渲染 default 插槽', () => {
      const wrapper = mount(TmlButton, {
        slots: {
          default: '<span>Button Text</span>'
        }
      })
      expect(wrapper.html()).toContain('<span>Button Text</span>')
      expect(wrapper.find('.tml-button__text').exists()).toBe(true)
    })

    it('应该正确渲染 icon 插槽', () => {
      const wrapper = mount(TmlButton, {
        slots: {
          icon: '<i class="test-icon">→</i>'
        }
      })
      expect(wrapper.html()).toContain('<i class="test-icon">→</i>')
    })

    it('应该同时支持 icon 和 default 插槽', () => {
      const wrapper = mount(TmlButton, {
        slots: {
          icon: '<i>→</i>',
          default: 'Submit'
        }
      })
      expect(wrapper.html()).toContain('<i>→</i>')
      expect(wrapper.text()).toContain('Submit')
    })
  })

  describe('组合场景测试', () => {
    it('应该支持 primary + large 组合', () => {
      const wrapper = mount(TmlButton, {
        props: {
          type: 'primary',
          size: 'large'
        }
      })
      expect(wrapper.classes()).toContain('tml-button--primary')
      expect(wrapper.classes()).toContain('tml-button--large')
    })

    it('loading 状态下应该禁用点击并显示加载图标', async () => {
      const wrapper = mount(TmlButton, {
        props: {
          loading: true
        },
        slots: {
          default: 'Loading...'
        }
      })
      expect(wrapper.classes()).toContain('is-loading')
      expect(wrapper.find('.tml-button__loading-icon').exists()).toBe(true)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })
})
