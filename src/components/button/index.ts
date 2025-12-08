import { App } from 'vue'
import TmlButton from './tml-button.vue'

// 为组件添加 install 方法，用于全局注册
TmlButton.install = (app: App): void => {
  app.component('TmlButton', TmlButton)
}

export default TmlButton
export { TmlButton }
export type { ButtonProps, ButtonEmits } from './tml-button.vue'
