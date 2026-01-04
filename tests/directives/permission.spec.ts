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
    expect(btn.style.cursor).toBe('not-allowed')
    expect(btn.getAttribute('aria-disabled')).toBe('true')
  })

  it('disable：阻止 click 默认行为与事件传播（含元素自身 @click）', async () => {
    const vPermission = createPermissionDirective({
      rules: {
        'order.submit': {
          whenDenied: { mode: 'disable' }
        }
      },
      resolvePermission: () => false
    })

    const parentClicks = ref(0)
    const selfClicks = ref(0)

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        setup() {
          return { parentClicks, selfClicks }
        },
        template: `
          <div id="parent" @click="parentClicks++">
            <a id="target" href="#" v-permission="'order.submit'" @click="selfClicks++">Link</a>
          </div>
        `
      })
    )

    await nextTick()

    await wrapper.find('#target').trigger('click')

    expect(parentClicks.value).toBe(0)
    expect(selfClicks.value).toBe(0)
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

  it('byLevel：不同 level 可配置 hide/disable/allow 并可恢复', async () => {
    const level = ref<'none' | 'readonly' | 'full'>('none')

    const vPermission = createPermissionDirective({
      rules: {
        'order.submit': {
          byLevel: {
            none: { mode: 'hide' },
            readonly: { mode: 'disable' },
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
          <div>
            <button id="btn" v-permission="'order.submit'">Submit</button>
            <span class="level">{{ level }}</span>
          </div>
        `
      })
    )

    await nextTick()
    const btn = wrapper.find('#btn').element as HTMLButtonElement
    expect(btn.style.display).toBe('none')

    level.value = 'readonly'
    await nextTick()
    expect(btn.style.display).toBe('')
    expect(btn.disabled).toBe(true)
    expect(btn.style.cursor).toBe('not-allowed')
    expect(btn.getAttribute('aria-disabled')).toBe('true')

    level.value = 'full'
    await nextTick()
    expect(btn.style.display).toBe('')
    expect(btn.disabled).toBe(false)
    expect(btn.style.cursor).toBe('')
    expect(btn.getAttribute('aria-disabled')).toBe(null)
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

  it('disable：支持 denied tooltip，且在恢复/卸载时清理', async () => {
    const allowed = ref(false)

    const vPermission = createPermissionDirective({
      rules: {
        'order.submit': {
          whenDenied: {
            mode: 'disable',
            disableTooltip: {
              text: 'No permission'
            }
          }
        }
      },
      resolvePermission: () => allowed.value
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        setup() {
          return { allowed }
        },
        template: `
          <div>
            <div id="wrap">
              <button id="btn" v-permission="'order.submit'">Submit</button>
            </div>
            <span class="allowed">{{ allowed }}</span>
          </div>
        `
      })
    )

    await nextTick()

    await wrapper.find('#wrap').trigger('mouseenter')
    const tooltip = document.body.querySelector('[data-tml-permission-tooltip="true"]') as
      | HTMLDivElement
      | null
    expect(tooltip?.textContent).toBe('No permission')
    expect(tooltip?.style.visibility).toBe('visible')

    allowed.value = true
    await nextTick()

    expect(document.body.querySelector('[data-tml-permission-tooltip="true"]')).toBe(null)

    wrapper.unmount()
    expect(document.body.querySelector('[data-tml-permission-tooltip="true"]')).toBe(null)
  })

  it('replace：支持 showOriginal/strikeOriginal，并可恢复原文', async () => {
    const allowed = ref(false)

    const vPermission = createPermissionDirective({
      rules: {
        'product.price': {
          whenDenied: {
            mode: 'replace',
            replaceText: '80',
            showOriginal: true,
            strikeOriginal: true
          }
        }
      },
      resolvePermission: () => allowed.value
    })

    const wrapper = mount(
      defineComponent({
        directives: { permission: vPermission },
        setup() {
          return { allowed }
        },
        template: `
          <div v-permission="'product.price'">
            <span id="masked" data-permission-replace>100</span>
            <span class="allowed">{{ allowed }}</span>
          </div>
        `
      })
    )

    await nextTick()

    const maskedEl = wrapper.find('#masked').element as HTMLElement
    expect(maskedEl.textContent).toBe('100 80')

    const spans = maskedEl.querySelectorAll('span')
    expect(spans.length).toBe(2)
    expect((spans[0] as HTMLSpanElement).style.textDecoration).toBe('line-through')
    expect(spans[1]?.textContent).toBe('80')

    allowed.value = true
    await nextTick()
    expect(wrapper.find('#masked').text()).toBe('100')
  })
})
