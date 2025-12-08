import { App } from 'vue'
import TmlButton from './components/button'
import './styles/variables.css'
import './styles/base.css'

// 所有组件列表
const components = [TmlButton]

// 全局安装方法
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || 'TmlButton', component)
  })
}

// 导出单个组件
export { TmlButton }

// 导出类型
export type { ButtonProps, ButtonEmits } from './components/button/tml-button.vue'

// 默认导出，用于全局注册
export default {
  install
}
