/**
 * permission 指令 - 可复用权限控制指令（隐藏 / 禁用 / 替换）
 */

import type { Directive, DirectiveBinding } from 'vue'
import type {
  CreatePermissionDirectiveOptions,
  PermissionBehavior,
  PermissionLevel,
  PermissionMode,
  PermissionRule
} from './types'

export const DEFAULT_PERMISSION_REPLACE_ATTR = 'data-permission-replace'

type PermissionSignature = {
  key: string
  mode: PermissionMode | 'noop'
  replaceText?: string
  level?: string
  targetAttr: string
}

interface PermissionDirectiveState {
  signature?: PermissionSignature

  originalDisplay?: string

  originalPointerEvents?: string
  originalAriaDisabled?: string | null
  originalDisabled?: boolean

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
    a.level === b.level &&
    a.targetAttr === b.targetAttr
  )
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
  replaceText: string
) {
  if (!state.replacedTextMap) {
    state.replacedTextMap = new Map<HTMLElement, string>()
  }

  const targets = el.querySelectorAll<HTMLElement>(`[${targetAttr}]`)

  targets.forEach((target) => {
    if (!state.replacedTextMap?.has(target)) {
      state.replacedTextMap?.set(target, target.textContent ?? '')
    }
    target.textContent = replaceText
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
  if (state.originalPointerEvents !== undefined) {
    el.style.pointerEvents = state.originalPointerEvents
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
  if (state.originalPointerEvents === undefined) {
    state.originalPointerEvents = el.style.pointerEvents
  }
  if (state.originalAriaDisabled === undefined) {
    state.originalAriaDisabled = el.getAttribute('aria-disabled')
  }

  if (state.originalDisabled === undefined && isDisableableFormControl(el)) {
    state.originalDisabled = el.disabled
  }

  el.style.pointerEvents = 'none'
  el.setAttribute('aria-disabled', 'true')

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

  const nextSignature: PermissionSignature = {
    key,
    mode: normalized?.mode ?? 'noop',
    replaceText: normalized?.replaceText,
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
    return
  }

  if (normalized.mode === 'replace') {
    applyReplace(el, state, targetAttr, normalized.replaceText ?? '')
  }
}

export function createPermissionDirective<Level extends PermissionLevel = string>(
  options: CreatePermissionDirectiveOptions<Level>
): Directive<HTMLElement, string> {
  return {
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
