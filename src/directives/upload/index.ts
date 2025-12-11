/**
 * v-upload 指令 - 通用文件上传验证指令
 */

import type { Directive, DirectiveBinding } from 'vue'
import type { UploadOptions, UploadSuccessEventDetail, UploadErrorEventDetail } from './types'
import { parseUploadOptions, validateFiles } from './utils'

/**
 * 存储在元素上的上传指令状态
 */
interface UploadDirectiveState {
  options: UploadOptions
  hiddenInput?: HTMLInputElement
  observer?: MutationObserver
  changeHandler?: (e: Event) => void
  clickHandler?: (e: Event) => void
}

// 使用 WeakMap 存储每个元素的状态
const stateMap = new WeakMap<HTMLElement, UploadDirectiveState>()

/**
 * 触发自定义事件
 */
function emitEvent(el: HTMLElement, eventName: string, detail: any) {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true
  })
  el.dispatchEvent(event)
}

/**
 * 处理文件选择变化
 */
function handleFileChange(
  el: HTMLElement,
  input: HTMLInputElement,
  options: UploadOptions
) {
  return (event: Event) => {
    const files = input.files
    if (!files || files.length === 0) {
      return
    }

    // 验证文件
    const error = validateFiles(files, options)

    if (error) {
      // 验证失败：先触发错误事件，再阻止原始事件传播
      // 触发错误事件
      emitEvent(el, 'upload-error', error as UploadErrorEventDetail)
      
      // 阻止事件传播并取消默认行为
      event.stopPropagation()
      event.preventDefault()
      
      // 清空 input value，允许重新选择相同文件
      input.value = ''
    } else {
      // 验证成功：触发成功事件
      emitEvent(el, 'upload-success', files as UploadSuccessEventDetail)
    }
  }
}

/**
 * 查找元素或其子元素中的 file input
 */
function findFileInput(el: HTMLElement): HTMLInputElement | null {
  // 如果元素本身就是 file input
  if (el instanceof HTMLInputElement && el.type === 'file') {
    return el
  }

  // 查找子元素中的 file input
  return el.querySelector('input[type="file"]')
}

/**
 * 为原生 input 或第三方组件绑定事件
 */
function bindToInput(el: HTMLElement, input: HTMLInputElement, state: UploadDirectiveState) {
  const handler = handleFileChange(el, input, state.options)
  state.changeHandler = handler
  
  // 绑定事件处理器
  input.addEventListener('change', handler)
}

/**
 * 创建隐藏的 file input 用于编程式上传
 */
function createHiddenInput(el: HTMLElement, state: UploadDirectiveState): HTMLInputElement {
  const input = document.createElement('input')
  input.type = 'file'
  input.style.display = 'none'
  
  // 设置属性
  if (state.options.accept && state.options.accept.length > 0) {
    input.accept = state.options.accept.join(',')
  }
  if (state.options.multiple) {
    input.multiple = true
  }

  // 添加到 DOM
  document.body.appendChild(input)

  // 绑定 change 事件
  const handler = handleFileChange(el, input, state.options)
  state.changeHandler = handler
  input.addEventListener('change', handler)

  // 为元素添加点击事件触发 file input
  const clickHandler = () => {
    input.click()
  }
  state.clickHandler = clickHandler
  el.addEventListener('click', clickHandler)

  return input
}

/**
 * 使用 MutationObserver 监听动态创建的 input
 */
function observeForInput(el: HTMLElement, state: UploadDirectiveState) {
  const observer = new MutationObserver(() => {
    const input = findFileInput(el)
    if (input && !state.changeHandler) {
      bindToInput(el, input, state)
      observer.disconnect()
    }
  })

  observer.observe(el, {
    childList: true,
    subtree: true
  })

  state.observer = observer
}

/**
 * 初始化指令
 */
function initUploadDirective(el: HTMLElement, binding: DirectiveBinding<number | UploadOptions>) {
  const options = parseUploadOptions(binding.value)
  const state: UploadDirectiveState = { options }
  stateMap.set(el, state)

  // 查找 file input
  const input = findFileInput(el)

  if (input) {
    // 场景 1 & 2: 原生 input 或第三方组件中已有的 input
    bindToInput(el, input, state)
  } else {
    // 尝试观察是否有动态创建的 input（第三方组件异步渲染的情况）
    observeForInput(el, state)

    // 同时创建隐藏 input 用于编程式上传（场景 3）
    // 如果后续发现有真实的 input，observer 会接管
    state.hiddenInput = createHiddenInput(el, state)
  }
}

/**
 * 清理指令资源
 */
function cleanupUploadDirective(el: HTMLElement) {
  const state = stateMap.get(el)
  if (!state) return

  // 移除事件监听器
  if (state.changeHandler) {
    const input = findFileInput(el) || state.hiddenInput
    if (input) {
      input.removeEventListener('change', state.changeHandler)
    }
  }

  if (state.clickHandler) {
    el.removeEventListener('click', state.clickHandler)
  }

  // 清理 MutationObserver
  if (state.observer) {
    state.observer.disconnect()
  }

  // 移除隐藏 input
  if (state.hiddenInput && state.hiddenInput.parentNode) {
    state.hiddenInput.parentNode.removeChild(state.hiddenInput)
  }

  stateMap.delete(el)
}

/**
 * v-upload 指令定义
 */
export const vUpload: Directive<HTMLElement, number | UploadOptions> = {
  mounted(el, binding) {
    initUploadDirective(el, binding)
  },

  updated(el, binding) {
    // 如果配置发生变化，重新初始化
    const state = stateMap.get(el)
    if (state) {
      const newOptions = parseUploadOptions(binding.value)
      const oldOptions = state.options
      
      // 比较配置是否变化
      if (JSON.stringify(newOptions) !== JSON.stringify(oldOptions)) {
        cleanupUploadDirective(el)
        initUploadDirective(el, binding)
      }
    }
  },

  unmounted(el) {
    cleanupUploadDirective(el)
  }
}

// 默认导出
export default vUpload
