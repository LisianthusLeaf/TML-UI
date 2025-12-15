/**
 * permission 指令类型定义
 */

export type PermissionKey = string

export type PermissionLevel = string | number

export type PermissionMode = 'allow' | 'hide' | 'disable' | 'replace'

export interface PermissionBehavior {
  mode: PermissionMode
  replaceText?: string
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
