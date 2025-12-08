<template>
  <button
    :class="[
      'tml-button',
      `tml-button--${type}`,
      `tml-button--${size}`,
      {
        'is-disabled': disabled,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="tml-button__loading-icon">⏳</span>
    <slot name="icon" />
    <span v-if="$slots.default" class="tml-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false
})

const emit = defineEmits<ButtonEmits>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.tml-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: var(--tml-font-size-base);
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  text-align: center;
  border: 1px solid var(--tml-border-color);
  border-radius: var(--tml-border-radius-base);
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  user-select: none;
}

.tml-button:hover {
  opacity: 0.8;
}

.tml-button:active {
  opacity: 0.9;
}

.tml-button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* 类型样式 */
.tml-button--default {
  color: var(--tml-text-color-primary);
  background-color: var(--tml-bg-color);
  border-color: var(--tml-border-color);
}

.tml-button--default:hover {
  color: var(--tml-color-primary);
  border-color: var(--tml-color-primary);
  background-color: var(--tml-bg-color);
  opacity: 1;
}

.tml-button--primary {
  color: #ffffff;
  background-color: var(--tml-color-primary);
  border-color: var(--tml-color-primary);
}

.tml-button--success {
  color: #ffffff;
  background-color: var(--tml-color-success);
  border-color: var(--tml-color-success);
}

.tml-button--warning {
  color: #ffffff;
  background-color: var(--tml-color-warning);
  border-color: var(--tml-color-warning);
}

.tml-button--danger {
  color: #ffffff;
  background-color: var(--tml-color-danger);
  border-color: var(--tml-color-danger);
}

/* 尺寸样式 */
.tml-button--small {
  padding: 5px 12px;
  font-size: var(--tml-font-size-small);
}

.tml-button--medium {
  padding: 8px 16px;
  font-size: var(--tml-font-size-base);
}

.tml-button--large {
  padding: 12px 20px;
  font-size: var(--tml-font-size-medium);
}

/* 状态样式 */
.tml-button.is-disabled {
  cursor: not-allowed;
  color: var(--tml-disabled-text-color);
  background-color: var(--tml-disabled-bg-color);
  border-color: var(--tml-disabled-border-color);
}

.tml-button.is-disabled:hover {
  opacity: 1;
}

.tml-button.is-loading {
  cursor: not-allowed;
  opacity: 0.6;
}

.tml-button__loading-icon {
  display: inline-flex;
  animation: rotate 1s linear infinite;
}

.tml-button__text {
  display: inline-flex;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
