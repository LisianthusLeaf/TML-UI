import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { createPermissionDirective } from '../../src/directives/permission'

describe('permission 指令', () => {
  it('whenDenied hide：无权限时隐藏元素', async () => {
    const vPermission = createPermissionDirective({
      rules: {
        'order.submit': {
          whenDenied: { mode: 'hide' }
        }
      },
      resolvePermission: () => false
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        template: '<div id="target" v-permission="\'order.submit\'">content</div>'
      })
    )

    await nextTick()

    const el = wrapper.find('#target').element as HTMLElement
    expect(el.style.display).toBe('none')
  })

  it('whenDenied disable：无权限时禁用交互', async () => {
    const vPermission = createPermissionDirective({
      rules: {
        'order.submit': {
          whenDenied: { mode: 'disable' }
        }
      },
      resolvePermission: () => false
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        template: '<button id="btn" v-permission="\'order.submit\'">Submit</button>'
      })
    )

    await nextTick()

    const btn = wrapper.find('#btn').element as HTMLButtonElement
    expect(btn.disabled).toBe(true)
    expect(btn.style.pointerEvents).toBe('none')
    expect(btn.getAttribute('aria-disabled')).toBe('true')
  })

  it('replace：仅替换带标识属性的子元素内容', async () => {
    const vPermission = createPermissionDirective({
      rules: {
        'product.price': {
          whenDenied: { mode: 'replace', replaceText: '***' }
        }
      },
      resolvePermission: () => false
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        template: `
          <div id="host" v-permission="'product.price'">
            <span id="masked" data-permission-replace>100</span>
            <span id="keep">keep</span>
          </div>
        `
      })
    )

    await nextTick()

    expect(wrapper.find('#masked').text()).toBe('***')
    expect(wrapper.find('#keep').text()).toBe('keep')
  })

  it('byLevel：不同 level 显示不同替换文案，full 恢复原文', async () => {
    const level = ref<'none' | 'masked' | 'full'>('none')

    const vPermission = createPermissionDirective({
      rules: {
        'product.price': {
          byLevel: {
            none: { mode: 'replace', replaceText: '***' },
            masked: { mode: 'replace', replaceText: '**.**' },
            full: { mode: 'allow' }
          }
        }
      },
      resolvePermission: () => level.value
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        setup() {
          return { level }
        },
        template: `
          <div v-permission="'product.price'">
            <span id="masked" data-permission-replace>100</span>
            <span class="level">{{ level }}</span>
          </div>
        `
      })
    )

    await nextTick()
    expect(wrapper.find('#masked').text()).toBe('***')

    level.value = 'masked'
    await nextTick()
    expect(wrapper.find('#masked').text()).toBe('**.**')

    level.value = 'full'
    await nextTick()
    expect(wrapper.find('#masked').text()).toBe('100')
  })

  it('binding value 更新：触发重算并恢复旧状态', async () => {
    const key = ref<'a' | 'b' | 'c'>('a')

    const vPermission = createPermissionDirective({
      rules: {
        a: { whenDenied: { mode: 'hide' } },
        b: { whenDenied: { mode: 'replace', replaceText: '***' } }
      },
      resolvePermission: () => false
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        setup() {
          return { key }
        },
        template: `
          <div id="host" v-permission="key">
            <span id="masked" data-permission-replace>100</span>
            <span class="key">{{ key }}</span>
          </div>
        `
      })
    )

    await nextTick()
    const host = wrapper.find('#host').element as HTMLElement
    expect(host.style.display).toBe('none')

    key.value = 'b'
    await nextTick()
    expect(host.style.display).toBe('')
    expect(wrapper.find('#masked').text()).toBe('***')

    key.value = 'c'
    await nextTick()
    expect(host.style.display).toBe('')
    expect(wrapper.find('#masked').text()).toBe('100')
  })
})
