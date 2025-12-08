import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { TmlCol, TmlRow } from '../../src/components/grid'

describe('TmlCol', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(TmlCol, {
      slots: {
        default: '<div>Content</div>'
      }
    })
    
    expect(wrapper.classes()).toContain('tml-col')
    expect(wrapper.html()).toContain('Content')
  })
  
  describe('span prop', () => {
    it('应该生成正确的 span 类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 12 }
      })
      expect(wrapper.classes()).toContain('tml-col-12')
    })
    
    it('span 为 0 时应该添加隐藏类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 0 }
      })
      expect(wrapper.classes()).toContain('tml-col-0')
    })
    
    it('未设置 span 时不应有 span 类', () => {
      const wrapper = mount(TmlCol)
      const classes = wrapper.classes()
      expect(classes.some(c => c.match(/^tml-col-\d+$/))).toBe(false)
    })
  })
  
  describe('offset prop', () => {
    it('应该生成正确的 offset 类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 12, offset: 4 }
      })
      expect(wrapper.classes()).toContain('tml-col-offset-4')
    })
    
    it('offset 为 0 时不应生成 offset 类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 12, offset: 0 }
      })
      expect(wrapper.classes().some(c => c.includes('offset'))).toBe(false)
    })
  })
  
  describe('push prop', () => {
    it('应该生成正确的 push 类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 12, push: 4 }
      })
      expect(wrapper.classes()).toContain('tml-col-push-4')
    })
  })
  
  describe('pull prop', () => {
    it('应该生成正确的 pull 类', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 12, pull: 4 }
      })
      expect(wrapper.classes()).toContain('tml-col-pull-4')
    })
  })
  
  describe('响应式 props', () => {
    it('应该支持 sm 断点 (数字形式)', () => {
      const wrapper = mount(TmlCol, {
        props: { span: 24, sm: 12 }
      })
      expect(wrapper.classes()).toContain('tml-col-24')
      expect(wrapper.classes()).toContain('tml-col-sm-12')
    })
    
    it('应该支持 sm 断点 (对象形式)', () => {
      const wrapper = mount(TmlCol, {
        props: { 
          span: 24, 
          sm: { span: 12, offset: 2 } 
        }
      })
      expect(wrapper.classes()).toContain('tml-col-sm-12')
      expect(wrapper.classes()).toContain('tml-col-sm-offset-2')
    })
    
    it('应该支持 md 断点', () => {
      const wrapper = mount(TmlCol, {
        props: { md: 8 }
      })
      expect(wrapper.classes()).toContain('tml-col-md-8')
    })
    
    it('应该支持 lg 断点', () => {
      const wrapper = mount(TmlCol, {
        props: { lg: 6 }
      })
      expect(wrapper.classes()).toContain('tml-col-lg-6')
    })
    
    it('应该支持 xl 断点', () => {
      const wrapper = mount(TmlCol, {
        props: { xl: 4 }
      })
      expect(wrapper.classes()).toContain('tml-col-xl-4')
    })
    
    it('应该支持 xxl 断点', () => {
      const wrapper = mount(TmlCol, {
        props: { xxl: 3 }
      })
      expect(wrapper.classes()).toContain('tml-col-xxl-3')
    })
    
    it('应该支持多个响应式断点组合', () => {
      const wrapper = mount(TmlCol, {
        props: {
          span: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
          xxl: 3
        }
      })
      expect(wrapper.classes()).toContain('tml-col-24')
      expect(wrapper.classes()).toContain('tml-col-sm-12')
      expect(wrapper.classes()).toContain('tml-col-md-8')
      expect(wrapper.classes()).toContain('tml-col-lg-6')
      expect(wrapper.classes()).toContain('tml-col-xl-4')
      expect(wrapper.classes()).toContain('tml-col-xxl-3')
    })
    
    it('应该支持响应式断点的完整配置', () => {
      const wrapper = mount(TmlCol, {
        props: {
          md: {
            span: 8,
            offset: 2,
            push: 1,
            pull: 0
          }
        }
      })
      expect(wrapper.classes()).toContain('tml-col-md-8')
      expect(wrapper.classes()).toContain('tml-col-md-offset-2')
      expect(wrapper.classes()).toContain('tml-col-md-push-1')
    })
  })
  
  describe('gutter 支持', () => {
    it('应该从父 TmlRow 接收 gutter 并应用 padding', () => {
      const wrapper = mount(TmlRow, {
        props: { gutter: 16 },
        slots: {
          default: '<TmlCol :span="12">Content</TmlCol>'
        },
        global: {
          components: { TmlCol }
        }
      })
      
      const col = wrapper.findComponent(TmlCol)
      const style = col.attributes('style')
      
      expect(style).toContain('padding-left: 8px')
      expect(style).toContain('padding-right: 8px')
    })
    
    it('应该支持垂直 gutter', () => {
      const wrapper = mount(TmlRow, {
        props: { gutter: [16, 8] },
        slots: {
          default: '<TmlCol :span="12">Content</TmlCol>'
        },
        global: {
          components: { TmlCol }
        }
      })
      
      const col = wrapper.findComponent(TmlCol)
      const style = col.attributes('style')
      
      // Vue 可能会合并 padding 简写形式
      expect(style).toMatch(/padding.*8px/)
      expect(style).toMatch(/padding.*4px/)
    })
  })
  
  describe('嵌套栅格', () => {
    it('应该支持嵌套使用', () => {
      const wrapper = mount({
        template: `
          <TmlRow>
            <TmlCol :span="12">
              <TmlRow>
                <TmlCol :span="12">Nested</TmlCol>
              </TmlRow>
            </TmlCol>
          </TmlRow>
        `,
        components: { TmlCol, TmlRow }
      })
      
      const nestedRow = wrapper.findAllComponents(TmlRow)
      expect(nestedRow.length).toBe(2) // 外层和内层
      
      const nestedCol = wrapper.findAllComponents(TmlCol)
      expect(nestedCol.length).toBe(2) // 外层和内层
    })
  })
})
