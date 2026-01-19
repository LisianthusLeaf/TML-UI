import { App } from 'vue'
import TmlToast from './tml-toast.vue'

// 为组件添加 install 方法，用于全局注册
TmlToast.install = (app: App): void => {
  app.component('TmlToast', TmlToast)
}

export default TmlToast
export { TmlToast }
export type { ToastProps } from './tml-toast.vue'
