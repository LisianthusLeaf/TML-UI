import { App } from 'vue'
import TmlButton from './components/button'
import { TmlRow, TmlCol } from './components/grid'
import TmlWaterfall from './components/list/waterfall'
import { vUpload } from './directives'
import './styles/variables.css'
import './styles/base.css'

// 所有组件列表
const components = [TmlButton, TmlRow, TmlCol, TmlWaterfall]

// 所有指令列表
const directives = {
  upload: vUpload
}

// 全局安装方法
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || 'TmlButton', component)
  })

  // 注册指令
  Object.entries(directives).forEach(([name, directive]) => {
    app.directive(name, directive)
  })
}

// 导出单个组件
export { TmlButton, TmlRow, TmlCol, TmlWaterfall }

// 导出指令
export { vUpload, createPermissionDirective, DEFAULT_PERMISSION_REPLACE_ATTR } from './directives'

// 导出类型
export type { ButtonProps, ButtonEmits } from './components/button/tml-button.vue'
export type { RowProps } from './components/grid/tml-row.vue'
export type { ColProps, ColConfig } from './components/grid/tml-col.vue'
export type {
  UploadOptions,
  UploadError,
  UploadErrorType,
  UploadSuccessEventDetail,
  UploadErrorEventDetail
} from './directives'

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
} from './directives'

// 默认导出，用于全局注册
export default {
  install
}
