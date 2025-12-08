<template>
  <div
    :class="colClasses"
    :style="colStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface ColConfig {
  span?: number
  offset?: number
  push?: number
  pull?: number
}

export interface ColProps extends ColConfig {
  sm?: number | ColConfig
  md?: number | ColConfig
  lg?: number | ColConfig
  xl?: number | ColConfig
  xxl?: number | ColConfig
}

const props = defineProps<ColProps>()

// 注入父组件提供的 gutter
const rowGutter = inject<{ horizontal: number; vertical: number }>('rowGutter', {
  horizontal: 0,
  vertical: 0
})

// 解析响应式配置
const parseConfig = (config: number | ColConfig | undefined): ColConfig => {
  if (config === undefined) {
    return {}
  }
  if (typeof config === 'number') {
    return { span: config }
  }
  return config
}

// 生成类名
const colClasses = computed(() => {
  const classes: string[] = ['tml-col']
  
  // 基础类名
  if (props.span !== undefined) {
    if (props.span === 0) {
      classes.push('tml-col-0')
    } else {
      classes.push(`tml-col-${props.span}`)
    }
  }
  
  if (props.offset) {
    classes.push(`tml-col-offset-${props.offset}`)
  }
  
  if (props.push) {
    classes.push(`tml-col-push-${props.push}`)
  }
  
  if (props.pull) {
    classes.push(`tml-col-pull-${props.pull}`)
  }
  
  // 响应式类名
  const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const
  breakpoints.forEach((bp) => {
    const config = parseConfig(props[bp])
    
    if (config.span !== undefined) {
      if (config.span === 0) {
        classes.push(`tml-col-${bp}-0`)
      } else {
        classes.push(`tml-col-${bp}-${config.span}`)
      }
    }
    
    if (config.offset) {
      classes.push(`tml-col-${bp}-offset-${config.offset}`)
    }
    
    if (config.push) {
      classes.push(`tml-col-${bp}-push-${config.push}`)
    }
    
    if (config.pull) {
      classes.push(`tml-col-${bp}-pull-${config.pull}`)
    }
  })
  
  return classes
})

// 计算列样式
const colStyle = computed(() => {
  const style: Record<string, string> = {}
  
  // 设置 gutter padding
  if (rowGutter.horizontal) {
    style.paddingLeft = `${rowGutter.horizontal / 2}px`
    style.paddingRight = `${rowGutter.horizontal / 2}px`
  }
  
  if (rowGutter.vertical) {
    style.paddingTop = `${rowGutter.vertical / 2}px`
    style.paddingBottom = `${rowGutter.vertical / 2}px`
  }
  
  return style
})
</script>

<style scoped>
.tml-col {
  position: relative;
  box-sizing: border-box;
}

/* span 为 0 时隐藏 */
.tml-col-0 {
  display: none;
}
</style>
