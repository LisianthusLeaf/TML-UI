/**
 * permission 指令 - 可复用权限控制指令（隐藏 / 禁用 / 替换）
 */

import type { Directive, DirectiveBinding } from 'vue'
import type {
  CreatePermissionDirectiveOptions,
  PermissionBehavior,
  PermissionDisableTooltipOptions,
  PermissionLevel,
  PermissionMode,
  PermissionRule
} from './types'

export const DEFAULT_PERMISSION_REPLACE_ATTR = 'data-permission-replace'

type PermissionSignature = {
  key: string
  mode: PermissionMode | 'noop'
  replaceText?: string
  showOriginal?: boolean
  strikeOriginal?: boolean

  disableTooltipText?: string
  disableTooltipClass?: string
  disableTooltipStyleKey?: string

  level?: string
  targetAttr: string
}

interface PermissionDirectiveState {
  signature?: PermissionSignature

  originalDisplay?: string

  originalCursor?: string
  originalAriaDisabled?: string | null
  originalDisabled?: boolean
  originalPointerEvents?: string

  clickHandler?: (event: MouseEvent) => void

  disableTooltipEl?: HTMLDivElement
  disableTooltipEventTarget?: HTMLElement
  disableTooltipHandlers?: {
    onShow: () => void
    onHide: () => void
    onScroll: () => void
    onResize: () => void
  }

  replacedTextMap?: Map<HTMLElement, string>
}

const stateMap = new WeakMap<HTMLElement, PermissionDirectiveState>()

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getTargetAttr<Level extends PermissionLevel>(
  options: CreatePermissionDirectiveOptions<Level>
): string {
  return options.replace?.targetAttr?.trim() || DEFAULT_PERMISSION_REPLACE_ATTR
}

function getRule<Level extends PermissionLevel>(
  options: CreatePermissionDirectiveOptions<Level>,
  key: string
): PermissionRule | undefined {
  if (!isPlainObject(options.rules)) return undefined
  return options.rules[key]
}

function normalizeBehavior(
  behavior: PermissionBehavior | undefined
): PermissionBehavior | undefined {
  if (!behavior) return undefined
  if (!behavior.mode) return undefined
  return behavior
}

function signatureEquals(a: PermissionSignature | undefined, b: PermissionSignature): boolean {
  if (!a) return false
  return (
    a.key === b.key &&
    a.mode === b.mode &&
    a.replaceText === b.replaceText &&
    a.showOriginal === b.showOriginal &&
    a.strikeOriginal === b.strikeOriginal &&
    a.disableTooltipText === b.disableTooltipText &&
    a.disableTooltipClass === b.disableTooltipClass &&
    a.disableTooltipStyleKey === b.disableTooltipStyleKey &&
    a.level === b.level &&
    a.targetAttr === b.targetAttr
  )
}

function computeStyleKey(style: PermissionDisableTooltipOptions['style']): string | undefined {
  if (!style) return undefined
  const record = style as unknown as Record<string, unknown>
  const keys = Object.keys(record).filter((k) => record[k] !== undefined)
  keys.sort()
  return keys.map((k) => `${k}:${String(record[k])}`).join(';')
}

function applyDefaultTooltipStyle(tooltipEl: HTMLDivElement) {
  tooltipEl.style.position = 'fixed'
  tooltipEl.style.zIndex = '9999'
  tooltipEl.style.padding = '6px 10px'
  tooltipEl.style.borderRadius = 'var(--tml-border-radius-base)'
  tooltipEl.style.background = 'var(--tml-bg-color-overlay)'
  tooltipEl.style.color = 'var(--tml-text-color-primary)'
  tooltipEl.style.border = '1px solid var(--tml-border-color-light)'
  tooltipEl.style.boxShadow = 'var(--tml-box-shadow-light)'
  tooltipEl.style.fontSize = 'var(--tml-font-size-extra-small)'
  tooltipEl.style.lineHeight = '1.4'
  tooltipEl.style.pointerEvents = 'none'
  tooltipEl.style.visibility = 'hidden'
  tooltipEl.style.maxWidth = 'min(320px, calc(100vw - 16px))'
  tooltipEl.style.wordBreak = 'break-word'
}

function positionTooltip(anchorEl: HTMLElement, tooltipEl: HTMLDivElement) {
  const anchorRect = anchorEl.getBoundingClientRect()
  const tooltipRect = tooltipEl.getBoundingClientRect()

  const viewportWidth = document.documentElement.clientWidth || window.innerWidth
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight

  const offset = 8
  const margin = 4

  let top = anchorRect.top - tooltipRect.height - offset
  const canPlaceTop = top >= margin
  if (!canPlaceTop) {
    top = anchorRect.bottom + offset
    if (top + tooltipRect.height > viewportHeight - margin) {
      top = Math.max(margin, viewportHeight - margin - tooltipRect.height)
    }
  }

  let left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2
  left = Math.min(viewportWidth - margin - tooltipRect.width, Math.max(margin, left))

  tooltipEl.style.top = `${Math.round(top)}px`
  tooltipEl.style.left = `${Math.round(left)}px`
}

function restoreDisableTooltip(state: PermissionDirectiveState) {
  const eventTarget = state.disableTooltipEventTarget
  const handlers = state.disableTooltipHandlers
  if (handlers) {
    eventTarget?.removeEventListener('mouseenter', handlers.onShow)
    eventTarget?.removeEventListener('mouseleave', handlers.onHide)
    eventTarget?.removeEventListener('focusin', handlers.onShow)
    eventTarget?.removeEventListener('focusout', handlers.onHide)

    window.removeEventListener('scroll', handlers.onScroll, true)
    window.removeEventListener('resize', handlers.onResize)

    state.disableTooltipHandlers = undefined
  }

  state.disableTooltipEventTarget = undefined

  if (state.disableTooltipEl) {
    state.disableTooltipEl.remove()
    state.disableTooltipEl = undefined
  }
}

function applyDisableTooltip(
  anchorEl: HTMLElement,
  eventTargetEl: HTMLElement,
  state: PermissionDirectiveState,
  tooltip: PermissionDisableTooltipOptions
) {
  const text = tooltip.text?.trim()
  if (!text) return

  if (state.disableTooltipEl) {
    if (state.disableTooltipEventTarget === eventTargetEl) return
    // created 阶段可能拿不到 parentElement，mounted 后需要重新绑定事件目标
    restoreDisableTooltip(state)
  }

  const tooltipEl = document.createElement('div')
  tooltipEl.setAttribute('data-tml-permission-tooltip', 'true')
  applyDefaultTooltipStyle(tooltipEl)

  if (tooltip.class) {
    tooltipEl.className = tooltip.class
  }
  if (tooltip.style) {
    Object.assign(tooltipEl.style, tooltip.style)
  }

  tooltipEl.textContent = text
  document.body.appendChild(tooltipEl)

  const onScroll = () => {
    if (tooltipEl.style.visibility !== 'visible') return
    positionTooltip(anchorEl, tooltipEl)
  }
  const onResize = () => {
    if (tooltipEl.style.visibility !== 'visible') return
    positionTooltip(anchorEl, tooltipEl)
  }

  const onShow = () => {
    if (tooltipEl.style.visibility === 'visible') return
    tooltipEl.textContent = text
    tooltipEl.style.visibility = 'visible'
    positionTooltip(anchorEl, tooltipEl)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onResize)
  }

  const onHide = () => {
    if (tooltipEl.style.visibility !== 'visible') return
    tooltipEl.style.visibility = 'hidden'
    window.removeEventListener('scroll', onScroll, true)
    window.removeEventListener('resize', onResize)
  }

  eventTargetEl.addEventListener('mouseenter', onShow)
  eventTargetEl.addEventListener('mouseleave', onHide)
  eventTargetEl.addEventListener('focusin', onShow)
  eventTargetEl.addEventListener('focusout', onHide)

  state.disableTooltipEl = tooltipEl
  state.disableTooltipEventTarget = eventTargetEl
  state.disableTooltipHandlers = { onShow, onHide, onScroll, onResize }
}

function restoreReplace(state: PermissionDirectiveState) {
  const map = state.replacedTextMap
  if (!map) return

  for (const [target, originalText] of map.entries()) {
    target.textContent = originalText
  }

  map.clear()
  state.replacedTextMap = undefined
}

function applyReplace(
  el: HTMLElement,
  state: PermissionDirectiveState,
  targetAttr: string,
  replaceText: string,
  showOriginal: boolean,
  strikeOriginal: boolean
) {
  if (!state.replacedTextMap) {
    state.replacedTextMap = new Map<HTMLElement, string>()
  }

  const targets = el.querySelectorAll<HTMLElement>(`[${targetAttr}]`)

  targets.forEach((target) => {
    if (!state.replacedTextMap?.has(target)) {
      state.replacedTextMap?.set(target, target.textContent ?? '')
    }

    const originalText = state.replacedTextMap?.get(target) ?? ''

    if (!showOriginal) {
      target.textContent = replaceText
      return
    }

    target.textContent = ''
    const originalSpan = document.createElement('span')
    originalSpan.textContent = originalText
    if (strikeOriginal) {
      originalSpan.style.textDecoration = 'line-through'
    }

    const replaceSpan = document.createElement('span')
    replaceSpan.textContent = replaceText

    target.appendChild(originalSpan)
    if (replaceText) {
      target.appendChild(document.createTextNode(' '))
    }
    target.appendChild(replaceSpan)
  })
}

function restoreHide(el: HTMLElement, state: PermissionDirectiveState) {
  if (state.originalDisplay === undefined) return
  el.style.display = state.originalDisplay
}

function applyHide(el: HTMLElement, state: PermissionDirectiveState) {
  if (state.originalDisplay === undefined) {
    state.originalDisplay = el.style.display
  }
  el.style.display = 'none'
}

function isDisableableFormControl(
  el: HTMLElement
): el is
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLOptGroupElement
  | HTMLOptionElement
  | HTMLFieldSetElement {
  return (
    el instanceof HTMLButtonElement ||
    el instanceof HTMLInputElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLOptGroupElement ||
    el instanceof HTMLOptionElement ||
    el instanceof HTMLFieldSetElement
  )
}

function restoreDisable(el: HTMLElement, state: PermissionDirectiveState) {
  restoreDisableTooltip(state)

  if (state.originalPointerEvents !== undefined) {
    el.style.pointerEvents = state.originalPointerEvents
  }

  if (state.originalCursor !== undefined) {
    el.style.cursor = state.originalCursor
  }

  if (state.clickHandler) {
    el.removeEventListener('click', state.clickHandler)
    state.clickHandler = undefined
  }

  if (state.originalAriaDisabled === undefined) {
    // 未记录表示没做过 disable
  } else if (state.originalAriaDisabled === null) {
    el.removeAttribute('aria-disabled')
  } else {
    el.setAttribute('aria-disabled', state.originalAriaDisabled)
  }

  if (state.originalDisabled !== undefined && isDisableableFormControl(el)) {
    el.disabled = state.originalDisabled
  }
}

function applyDisable(el: HTMLElement, state: PermissionDirectiveState) {
  if (state.originalCursor === undefined) {
    state.originalCursor = el.style.cursor
  }
  if (state.originalAriaDisabled === undefined) {
    state.originalAriaDisabled = el.getAttribute('aria-disabled')
  }

  if (state.originalDisabled === undefined && isDisableableFormControl(el)) {
    state.originalDisabled = el.disabled
  }

  if (state.originalPointerEvents === undefined) {
    state.originalPointerEvents = el.style.pointerEvents
  }

  el.style.cursor = 'not-allowed'
  el.setAttribute('aria-disabled', 'true')

  if (!state.clickHandler) {
    state.clickHandler = (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }
    el.addEventListener('click', state.clickHandler)
  }

  if (isDisableableFormControl(el)) {
    el.disabled = true
  }
}

function restoreAll(el: HTMLElement, state: PermissionDirectiveState) {
  restoreHide(el, state)
  restoreDisable(el, state)
  restoreReplace(state)
}

function resolveBehaviorFromRule<Level extends PermissionLevel>(
  rule: PermissionRule,
  resolved: boolean | Level
): { behavior?: PermissionBehavior; level?: string } {
  if (typeof resolved === 'boolean') {
    if (resolved) {
      return {}
    }

    if ('whenDenied' in rule) {
      return { behavior: normalizeBehavior(rule.whenDenied) }
    }

    return {}
  }

  if ('byLevel' in rule) {
    const levelKey = String(resolved)
    return {
      behavior: normalizeBehavior(rule.byLevel[levelKey]),
      level: levelKey
    }
  }

  // 注入返回了 level，但规则未配置 byLevel：默认不处理
  return {}
}

function computeAndApply<Level extends PermissionLevel>(
  el: HTMLElement,
  binding: DirectiveBinding<unknown>,
  options: CreatePermissionDirectiveOptions<Level>
) {
  const state = stateMap.get(el) ?? {}
  stateMap.set(el, state)

  const targetAttr = getTargetAttr(options)

  const key = typeof binding.value === 'string' ? binding.value.trim() : ''
  if (!key) {
    if (state.signature) {
      restoreAll(el, state)
      state.signature = undefined
    }
    return
  }

  const rule = getRule(options, key)
  if (!rule) {
    if (state.signature) {
      restoreAll(el, state)
      state.signature = undefined
    }
    return
  }

  const resolved = options.resolvePermission(key)
  const { behavior, level } = resolveBehaviorFromRule(rule, resolved)

  const normalized = normalizeBehavior(behavior)

  const tooltipText = normalized?.disableTooltip?.text?.trim() || undefined
  const tooltipClass = normalized?.disableTooltip?.class?.trim() || undefined
  const tooltipStyleKey = computeStyleKey(normalized?.disableTooltip?.style)

  const nextSignature: PermissionSignature = {
    key,
    mode: normalized?.mode ?? 'noop',
    replaceText: normalized?.replaceText,
    showOriginal: normalized?.showOriginal,
    strikeOriginal: normalized?.strikeOriginal,
    disableTooltipText: tooltipText,
    disableTooltipClass: tooltipClass,
    disableTooltipStyleKey: tooltipStyleKey,
    level,
    targetAttr
  }

  const signatureChanged = !signatureEquals(state.signature, nextSignature)

  if (signatureChanged) {
    restoreAll(el, state)
  }

  state.signature = nextSignature

  if (!normalized || normalized.mode === 'allow') {
    return
  }

  if (normalized.mode === 'hide') {
    applyHide(el, state)
    return
  }

  if (normalized.mode === 'disable') {
    applyDisable(el, state)
    if (normalized.disableTooltip && tooltipText) {
      const isFormControl = isDisableableFormControl(el)
      const eventTarget = isFormControl ? (el.parentElement ?? el) : el

      // Disabled 原生控件通常不触发鼠标/焦点事件；通过禁用其 pointer-events
      // 让事件落到父元素（或自身）以支持 tooltip。
      if (isFormControl) {
        el.style.pointerEvents = 'none'
      }

      applyDisableTooltip(el, eventTarget, state, normalized.disableTooltip)
    }
    return
  }

  if (normalized.mode === 'replace') {
    applyReplace(
      el,
      state,
      targetAttr,
      normalized.replaceText ?? '',
      Boolean(normalized.showOriginal),
      Boolean(normalized.strikeOriginal)
    )
  }
}

export function createPermissionDirective<Level extends PermissionLevel = string>(
  options: CreatePermissionDirectiveOptions<Level>
): Directive<HTMLElement, string> {
  return {
    created(el, binding) {
      // 尽早注册 disable 的 click 阻断，避免同元素上的 @click 先于指令监听触发
      computeAndApply(el, binding, options)
    },

    mounted(el, binding) {
      computeAndApply(el, binding, options)
    },

    updated(el, binding) {
      computeAndApply(el, binding, options)
    },

    unmounted(el) {
      const state = stateMap.get(el)
      if (state) {
        restoreAll(el, state)
        stateMap.delete(el)
      }
    }
  }
}

export default createPermissionDirective
