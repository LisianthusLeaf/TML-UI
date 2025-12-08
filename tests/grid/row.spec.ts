import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TmlRow } from '../../src/components/grid'

describe('TmlRow', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(TmlRow, {
      slots: {
        default: '<div>Content</div>'
      }
    })
    
    expect(wrapper.classes()).toContain('tml-row')
    expect(wrapper.html()).toContain('Content')
  })
  
  it('应该应用默认样式', () => {
    const wrapper = mount(TmlRow)
    const style = wrapper.attributes('style')
    
    expect(style).toContain('justify-content: flex-start')
    expect(style).toContain('align-items: flex-start')
    expect(style).toContain('flex-wrap: wrap')
  })
  
  describe('justify prop', () => {
    it('应该支持 start 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'start' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: flex-start')
    })
    
    it('应该支持 center 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'center' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: center')
    })
    
    it('应该支持 end 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'end' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: flex-end')
    })
    
    it('应该支持 space-between 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'space-between' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: space-between')
    })
    
    it('应该支持 space-around 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'space-around' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: space-around')
    })
    
    it('应该支持 space-evenly 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { justify: 'space-evenly' }
      })
      expect(wrapper.attributes('style')).toContain('justify-content: space-evenly')
    })
  })
  
  describe('align prop', () => {
    it('应该支持 top 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { align: 'top' }
      })
      expect(wrapper.attributes('style')).toContain('align-items: flex-start')
    })
    
    it('应该支持 middle 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { align: 'middle' }
      })
      expect(wrapper.attributes('style')).toContain('align-items: center')
    })
    
    it('应该支持 bottom 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { align: 'bottom' }
      })
      expect(wrapper.attributes('style')).toContain('align-items: flex-end')
    })
    
    it('应该支持 stretch 对齐', () => {
      const wrapper = mount(TmlRow, {
        props: { align: 'stretch' }
      })
      expect(wrapper.attributes('style')).toContain('align-items: stretch')
    })
  })
  
  describe('wrap prop', () => {
    it('应该默认换行', () => {
      const wrapper = mount(TmlRow)
      expect(wrapper.attributes('style')).toContain('flex-wrap: wrap')
    })
    
    it('应该支持禁用换行', () => {
      const wrapper = mount(TmlRow, {
        props: { wrap: false }
      })
      expect(wrapper.attributes('style')).toContain('flex-wrap: nowrap')
    })
  })
  
  describe('gutter prop', () => {
    it('应该支持单个数字的 gutter', () => {
      const wrapper = mount(TmlRow, {
        props: { gutter: 16 }
      })
      const style = wrapper.attributes('style')
      
      expect(style).toContain('margin-left: -8px')
      expect(style).toContain('margin-right: -8px')
    })
    
    it('应该支持数组形式的 gutter', () => {
      const wrapper = mount(TmlRow, {
        props: { gutter: [16, 8] }
      })
      const style = wrapper.attributes('style')
      
      // Vue 可能会合并 margin 简写形式
      expect(style).toMatch(/margin.*-8px/)
      expect(style).toMatch(/margin.*-4px/)
    })
    
    it('gutter 为 0 时不应有 margin', () => {
      const wrapper = mount(TmlRow, {
        props: { gutter: 0 }
      })
      const style = wrapper.attributes('style')
      
      expect(style).not.toContain('margin-left')
      expect(style).not.toContain('margin-right')
      expect(style).not.toContain('margin-top')
      expect(style).not.toContain('margin-bottom')
    })
  })
})
