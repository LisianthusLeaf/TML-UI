import { App } from 'vue'
import TmlSkeleton from './tml-skeleton.vue'

// 为组件添加 install 方法，用于全局注册
TmlSkeleton.install = (app: App): void => {
  app.component('TmlSkeleton', TmlSkeleton)
}

export default TmlSkeleton
export { TmlSkeleton }
export type { SkeletonProps } from './tml-skeleton.vue'
