<template>
  <Teleport to="body">
    <transition
      :name="transitionName"
      appear
      @after-leave="$emit('destroy')"
    >
      <div
        v-if="show"
        ref="toastRef"
        class="tml-toast"
        :class="[
          `tml-toast--${type}`,
          `tml-toast--${position}`,
          { 'tml-toast--closable': closable, 'tml-toast--glass': glass }
        ]"
        role="alert"
        @mouseenter="pauseTimer"
        @mouseleave="resumeTimer"
      >
        <div class="tml-toast__content">
          <!-- 图标 -->
          <span
            v-if="showIcon"
            class="tml-toast__icon"
            :class="`tml-toast__icon--${type}`"
          >
            <slot name="icon">
              <span class="tml-toast__icon-default"></span>
            </slot>
          </span>

          <!-- 消息内容 -->
          <div class="tml-toast__message">
            <slot>
              <span v-if="html" v-html="message"></span>
              <span v-else>{{ message }}</span>
            </slot>
          </div>

          <!-- 关闭按钮 -->
          <button
            v-if="closable"
            type="button"
            class="tml-toast__close"
            @click="handleClose"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <!-- 进度条（可选） -->
        <div
          v-if="showProgress && duration > 0"
          class="tml-toast__progress"
          :style="{ animationDuration: `${duration}ms` }"
        ></div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export interface ToastProps {
  /** 消息内容 */
  message?: string
  /** 消息类型 */
  type?: 'success' | 'error' | 'warning' | 'info'
  /** 显示时长（毫秒），0 表示不自动关闭 */
  duration?: number
  /** 是否可手动关闭 */
  closable?: boolean
  /** 是否显示图标 */
  showIcon?: boolean
  /** 是否显示进度条 */
  showProgress?: boolean
  /** 是否使用 HTML 渲染消息（注意 XSS 风险） */
  html?: boolean
  /** 是否启用毛玻璃效果 */
  glass?: boolean
  /** 显示位置 */
  position?:
    | 'top'
    | 'bottom'
    | 'center'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  /** 控制显示/隐藏 */
  show?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  message: '',
  type: 'info',
  duration: 3000,
  closable: true,
  showIcon: true,
  showProgress: false,
  html: false,
  glass: true,
  position: 'top',
  show: false
})

const emit = defineEmits<{
  'update:show': [show: boolean]
  close: []
  destroy: []
}>()

const show = ref(props.show)
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

const transitionName = computed(() => {
  // 根据具体位置返回对应的动画类名
  switch (props.position) {
    case 'top':
      return 'tml-toast-slide-down-top'
    case 'top-left':
      return 'tml-toast-slide-down-top-left'
    case 'top-right':
      return 'tml-toast-slide-down-top-right'
    case 'bottom':
      return 'tml-toast-slide-up-bottom'
    case 'bottom-left':
      return 'tml-toast-slide-up-bottom-left'
    case 'bottom-right':
      return 'tml-toast-slide-up-bottom-right'
    case 'center':
    default:
      return 'tml-toast-fade-center'
  }
})

// 开始计时器
const startTimer = () => {
  if (props.duration <= 0) return
  clearTimer()
  timer.value = setTimeout(() => {
    handleClose()
  }, props.duration)
}

// 清除计时器
const clearTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

// 暂停计时器（鼠标悬停时）
const pauseTimer = () => {
  if (props.duration <= 0) return
  clearTimer()
}

// 恢复计时器
const resumeTimer = () => {
  if (props.duration <= 0) return
  startTimer()
}

// 关闭 Toast
const handleClose = () => {
  show.value = false
  emit('update:show', false)
  emit('close')
  clearTimer()
}

// 监听 show 属性变化
watch(() => props.show, (newVal) => {
  show.value = newVal
  if (newVal) {
    startTimer()
  } else {
    clearTimer()
  }
})

// 监听 duration 变化，重新开始计时
watch(() => props.duration, () => {
  if (show.value && props.duration > 0) {
    startTimer()
  }
})

// 组件挂载时开始计时
onMounted(() => {
  if (show.value && props.duration > 0) {
    startTimer()
  }
})

// 组件卸载前清理计时器
onUnmounted(() => {
  clearTimer()
})
</script>

<style scoped>
.tml-toast {
  position: fixed;
  z-index: 9999;
  padding: 18px 22px;
  min-width: 240px;
  max-width: 440px;
  background: var(--tml-bg-color-overlay);
  border-radius: 20px;
  box-shadow: 
    0 15px 45px rgba(0, 0, 0, 0.12),
    0 4px 12px rgba(0, 0, 0, 0.05);
  font-size: var(--tml-font-size-base);
  line-height: 1.6;
  color: var(--tml-text-color-primary);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

/* 位置 */
.tml-toast--top {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.tml-toast--bottom {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.tml-toast--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tml-toast--top-left {
  top: 20px;
  left: 20px;
}

.tml-toast--top-right {
  top: 20px;
  right: 20px;
}

.tml-toast--bottom-left {
  bottom: 20px;
  left: 20px;
}

.tml-toast--bottom-right {
  bottom: 20px;
  right: 20px;
}

/* 类型样式 */
.tml-toast--success {
  border-left: 4px solid var(--tml-color-success);
}

.tml-toast--error {
  border-left: 4px solid var(--tml-color-danger);
}

.tml-toast--warning {
  border-left: 4px solid var(--tml-color-warning);
}

.tml-toast--info {
  border-left: 4px solid var(--tml-color-info);
}

/* 内容区域 */
.tml-toast__content {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

/* 图标 */
.tml-toast__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.tml-toast__icon--success {
  color: var(--tml-color-success);
}

.tml-toast__icon--error {
  color: var(--tml-color-danger);
}

.tml-toast__icon--warning {
  color: var(--tml-color-warning);
}

.tml-toast__icon--info {
  color: var(--tml-color-info);
}

.tml-toast__icon-default {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

/* 消息 */
.tml-toast__message {
  flex: 1;
  word-break: break-word;
}

/* 关闭按钮 */
.tml-toast__close {
  flex-shrink: 0;
  margin-left: 8px;
  padding: 0;
  background: transparent;
  border: none;
  font-size: 20px;
  line-height: 1;
  color: var(--tml-text-color-secondary);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.tml-toast__close:hover {
  opacity: 1;
}

/* 进度条 */
.tml-toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: currentColor;
  opacity: 0.7;
  border-radius: 0 0 20px 20px;
  animation: tml-toast-progress linear forwards;
}

/* 动画 */
/* 淡入淡出动画（居中位置） - 带有弹性缩放 */
.tml-toast-fade-center-enter-active,
.tml-toast-fade-center-leave-active {
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1.4);
}

.tml-toast-fade-center-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.tml-toast-fade-center-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

/* 顶部下滑动画（居中） - 从屏幕外下拉，带弹跳效果 */
.tml-toast-slide-down-top-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-100vh) scale(0.8);
}

.tml-toast-slide-down-top-enter-active {
  animation: tml-toast-slide-down-top 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-down-top-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-down-top-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-80px) scale(0.8);
}

@keyframes tml-toast-slide-down-top {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-100vh) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateX(-50%) translateY(6px) scale(1.01);
  }
  90% {
    transform: translateX(-50%) translateY(-2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

/* 顶部下滑动画（左上角） - 从屏幕外下拉，带弹跳效果 */
.tml-toast-slide-down-top-left-enter-from {
  opacity: 0;
  transform: translateY(-100vh) scale(0.8);
}

.tml-toast-slide-down-top-left-enter-active {
  animation: tml-toast-slide-down-top-left 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-down-top-left-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-down-top-left-leave-to {
  opacity: 0;
  transform: translateY(-80px) scale(0.8);
}

@keyframes tml-toast-slide-down-top-left {
  0% {
    opacity: 0;
    transform: translateY(-100vh) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateY(6px) scale(1.01);
  }
  90% {
    transform: translateY(-2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 顶部下滑动画（右上角） - 从屏幕外下拉，带弹跳效果 */
.tml-toast-slide-down-top-right-enter-from {
  opacity: 0;
  transform: translateX(100vw) scale(0.8);
}

.tml-toast-slide-down-top-right-enter-active {
  animation: tml-toast-slide-down-top-right 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-down-top-right-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-down-top-right-leave-to {
  opacity: 0;
  transform: translateX(80px) scale(0.8);
}

@keyframes tml-toast-slide-down-top-right {
  0% {
    opacity: 0;
    transform: translateX(100vw) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateX(-6px) scale(1.01);
  }
  90% {
    transform: translateX(2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* 底部上滑动画（居中） - 从屏幕外上滑，带弹性效果 */
.tml-toast-slide-up-bottom-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(100vh) scale(0.8);
}

.tml-toast-slide-up-bottom-enter-active {
  animation: tml-toast-slide-up-bottom 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-up-bottom-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-up-bottom-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(80px) scale(0.8);
}

@keyframes tml-toast-slide-up-bottom {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(100vh) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateX(-50%) translateY(-6px) scale(1.01);
  }
  90% {
    transform: translateX(-50%) translateY(2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

/* 底部上滑动画（左下角） - 从屏幕外上滑，带弹性效果 */
.tml-toast-slide-up-bottom-left-enter-from {
  opacity: 0;
  transform: translateY(100vh) scale(0.8);
}

.tml-toast-slide-up-bottom-left-enter-active {
  animation: tml-toast-slide-up-bottom-left 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-up-bottom-left-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-up-bottom-left-leave-to {
  opacity: 0;
  transform: translateY(80px) scale(0.8);
}

@keyframes tml-toast-slide-up-bottom-left {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateY(-6px) scale(1.01);
  }
  90% {
    transform: translateY(2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 底部上滑动画（右下角） - 从屏幕外上滑，带弹性效果 */
.tml-toast-slide-up-bottom-right-enter-from {
  opacity: 0;
  transform: translateX(100vw) scale(0.8);
}

.tml-toast-slide-up-bottom-right-enter-active {
  animation: tml-toast-slide-up-bottom-right 1s cubic-bezier(0.34, 1.56, 0.64, 1.4) forwards;
}

.tml-toast-slide-up-bottom-right-leave-active {
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tml-toast-slide-up-bottom-right-leave-to {
  opacity: 0;
  transform: translateX(80px) scale(0.8);
}

@keyframes tml-toast-slide-up-bottom-right {
  0% {
    opacity: 0;
    transform: translateX(100vw) scale(0.96);
  }
  75% {
    opacity: 1;
    transform: translateX(-6px) scale(1.01);
  }
  90% {
    transform: translateX(2px) scale(0.99);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* 毛玻璃效果 */
.tml-toast--glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* 暗色主题下的毛玻璃效果 */
@media (prefers-color-scheme: dark) {
  .tml-toast--glass {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 8px 24px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

/* 进度条动画 */
@keyframes tml-toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
