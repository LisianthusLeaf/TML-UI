// 自定义指令注册入口

export { vUpload } from './upload'
export { createPermissionDirective, DEFAULT_PERMISSION_REPLACE_ATTR } from './permission'
export type {
  UploadOptions,
  UploadError,
  UploadErrorType,
  UploadSuccessEventDetail,
  UploadErrorEventDetail
} from './upload/types'

export type {
  PermissionKey,
  PermissionLevel,
  PermissionMode,
  PermissionBehavior,
  PermissionRule,
  PermissionRules,
  ResolvePermission,
  ResolvePermissionResult,
  PermissionReplaceOptions,
  CreatePermissionDirectiveOptions
} from './permission/types'

export default {}
