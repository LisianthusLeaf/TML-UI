<template>
  <div
    :class="[
      'tml-skeleton',
      `tml-skeleton--variant-${variant}`,
      `tml-skeleton--animation-${animation}`,
      {
        'tml-skeleton--active': active,
        'tml-skeleton--shimmer': shimmer,
        'tml-skeleton--rounded': rounded,
        'tml-skeleton--circle': circle
      }
    ]"
    :style="{
      width: width,
      height: height,
      '--tml-skeleton-color': color,
      '--tml-skeleton-shimmer-color': shimmerColor
    }"
  >
    <!-- 基础骨架屏 -->
    <div v-if="variant === 'basic'" class="tml-skeleton__basic" />

    <!-- 文本骨架屏 -->
    <div v-else-if="variant === 'text'" class="tml-skeleton__text">
      <div
        v-for="i in lines"
        :key="i"
        class="tml-skeleton__line"
        :style="{ width: getLineWidth(i - 1) }"
      />
    </div>

    <!-- 头像骨架屏 -->
    <div v-else-if="variant === 'avatar'" class="tml-skeleton__avatar" />

    <!-- 卡片骨架屏 -->
    <div v-else-if="variant === 'card'" class="tml-skeleton__card">
      <div class="tml-skeleton__card-header" />
      <div class="tml-skeleton__card-body">
        <div class="tml-skeleton__card-line" />
        <div class="tml-skeleton__card-line" />
        <div class="tml-skeleton__card-line" />
      </div>
    </div>

    <!-- 自定义骨架屏 -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
export interface SkeletonProps {
  /** 骨架屏变体 */
  variant?: 'basic' | 'text' | 'avatar' | 'card' | 'custom'
  /** 动画类型 */
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none'
  /** 是否激活状态 */
  active?: boolean
  /** 是否显示流光效果 */
  shimmer?: boolean
  /** 是否圆角 */
  rounded?: boolean
  /** 是否圆形 */
  circle?: boolean
  /** 宽度，支持 CSS 单位 */
  width?: string
  /** 高度，支持 CSS 单位 */
  height?: string
  /** 骨架屏颜色 */
  color?: string
  /** 流光颜色 */
  shimmerColor?: string
  /** 文本行数（仅当 variant='text' 时有效） */
  lines?: number
  /** 文本行宽度数组，支持百分比字符串数组 */
  lineWidths?: string[]
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'basic',
  animation: 'pulse',
  active: true,
  shimmer: false,
  rounded: false,
  circle: false,
  width: '100%',
  height: 'auto',
  color: 'var(--tml-bg-color-page, #f2f3f5)',
  shimmerColor: 'rgba(255, 255, 255, 0.4)',
  lines: 3,
  lineWidths: () => ['100%', '90%', '80%']
})

// 获取文本行宽度
const getLineWidth = (index: number): string => {
  if (props.lineWidths && props.lineWidths[index]) {
    return props.lineWidths[index]
  }
  // 默认宽度递减
  return `${100 - index * 10}%`
}
</script>

<style scoped>
.tml-skeleton {
  display: block;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* 基础样式 */
.tml-skeleton__basic,
.tml-skeleton__text,
.tml-skeleton__avatar,
.tml-skeleton__card,
.tml-skeleton__line,
.tml-skeleton__card-header,
.tml-skeleton__card-body,
.tml-skeleton__card-line {
  background-color: var(--tml-skeleton-color, var(--tml-bg-color-page, #f2f3f5));
}

/* 基础骨架屏 */
.tml-skeleton__basic {
  width: 100%;
  height: 100%;
}

/* 文本骨架屏 */
.tml-skeleton__text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tml-skeleton__line {
  height: 16px;
  border-radius: var(--tml-border-radius-base);
}

/* 头像骨架屏 */
.tml-skeleton__avatar {
  width: 100%;
  height: 100%;
  border-radius: var(--tml-border-radius-circle);
}

/* 卡片骨架屏 */
.tml-skeleton__card {
  display: flex;
  flex-direction: column;
  border-radius: var(--tml-border-radius-base);
  overflow: hidden;
}

.tml-skeleton__card-header {
  height: 120px;
  width: 100%;
}

.tml-skeleton__card-body {
  padding: var(--tml-spacing-large);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tml-skeleton__card-line {
  height: 14px;
  border-radius: var(--tml-border-radius-small);
}

/* 形状样式 */
.tml-skeleton--rounded .tml-skeleton__basic,
.tml-skeleton--rounded .tml-skeleton__line,
.tml-skeleton--rounded .tml-skeleton__card {
  border-radius: var(--tml-border-radius-round);
}

.tml-skeleton--rounded .tml-skeleton__avatar {
  border-radius: var(--tml-border-radius-round);
}

.tml-skeleton--circle .tml-skeleton__basic,
.tml-skeleton--circle .tml-skeleton__avatar {
  border-radius: var(--tml-border-radius-circle);
}

/* ===== 动画样式 ===== */

/* 脉冲动画 */
.tml-skeleton--animation-pulse.tml-skeleton--active {
  animation: tml-skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes tml-skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

/* 波浪动画 */
.tml-skeleton--animation-wave {
  position: relative;
  overflow: hidden;
}

.tml-skeleton--animation-wave::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    var(--tml-skeleton-shimmer-color, rgba(255, 255, 255, 0.4)),
    transparent
  );
  animation: tml-skeleton-wave 1.6s linear infinite;
}

@keyframes tml-skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 流光动画（Shimmer） */
.tml-skeleton--animation-shimmer {
  position: relative;
  overflow: hidden;
}

.tml-skeleton--animation-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--tml-skeleton-shimmer-color, rgba(255, 255, 255, 0.4)) 50%,
    transparent 100%
  );
  animation: tml-skeleton-shimmer 2s infinite;
  z-index: 1;
}

@keyframes tml-skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 独立流光效果 */
.tml-skeleton--shimmer .tml-skeleton__basic,
.tml-skeleton--shimmer .tml-skeleton__line,
.tml-skeleton--shimmer .tml-skeleton__avatar,
.tml-skeleton--shimmer .tml-skeleton__card,
.tml-skeleton--shimmer .tml-skeleton__card-header,
.tml-skeleton--shimmer .tml-skeleton__card-body,
.tml-skeleton--shimmer .tml-skeleton__card-line {
  position: relative;
  overflow: hidden;
}

.tml-skeleton--shimmer .tml-skeleton__basic::after,
.tml-skeleton--shimmer .tml-skeleton__line::after,
.tml-skeleton--shimmer .tml-skeleton__avatar::after,
.tml-skeleton--shimmer .tml-skeleton__card::after,
.tml-skeleton--shimmer .tml-skeleton__card-header::after,
.tml-skeleton--shimmer .tml-skeleton__card-body::after,
.tml-skeleton--shimmer .tml-skeleton__card-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--tml-skeleton-shimmer-color, rgba(255, 255, 255, 0.4)) 50%,
    transparent 100%
  );
  animation: tml-skeleton-shimmer 2s infinite;
}
</style>
