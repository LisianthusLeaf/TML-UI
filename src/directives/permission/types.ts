/**
 * permission 指令类型定义
 */

export type PermissionKey = string

export type PermissionLevel = string | number

export type PermissionMode = 'allow' | 'hide' | 'disable' | 'replace'

export interface PermissionDisableTooltipOptions {
  /** tooltip 文案（使用 textContent 写入） */
  text: string
  /** 可选 class（用于自定义样式） */
  class?: string
  /** 可选内联样式（Object.assign 到 tooltipEl.style） */
  style?: Partial<CSSStyleDeclaration>
}

export interface PermissionBehavior {
  mode: PermissionMode
  replaceText?: string

  /** disable 模式下可选 tooltip */
  disableTooltip?: PermissionDisableTooltipOptions

  /** replace 模式下：展示原文 */
  showOriginal?: boolean

  /** replace 模式下：原文加删除线（需配合 showOriginal） */
  strikeOriginal?: boolean
}

export type PermissionByLevelConfig = Partial<Record<string, PermissionBehavior>>

export interface PermissionRuleWhenDenied {
  whenDenied: PermissionBehavior
}

export interface PermissionRuleByLevel {
  byLevel: PermissionByLevelConfig
}

export type PermissionRule =
  | PermissionRuleWhenDenied
  | PermissionRuleByLevel
  | (PermissionRuleWhenDenied & PermissionRuleByLevel)

export type PermissionRules = Record<PermissionKey, PermissionRule>

export type ResolvePermissionResult<Level extends PermissionLevel = string> = boolean | Level

export type ResolvePermission<Level extends PermissionLevel = string> = (
  key: PermissionKey
) => ResolvePermissionResult<Level>

export interface PermissionReplaceOptions {
  /** 仅替换宿主元素内部带该属性的子元素内容 */
  targetAttr?: string
}

export interface CreatePermissionDirectiveOptions<Level extends PermissionLevel = string> {
  rules: PermissionRules
  resolvePermission: ResolvePermission<Level>
  replace?: PermissionReplaceOptions
}
