<template>
  <div
    class="tml-row"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

export interface RowProps {
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  wrap?: boolean
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: true
})

// 计算 gutter 值
const horizontalGutter = computed(() => {
  if (Array.isArray(props.gutter)) {
    return props.gutter[0]
  }
  return props.gutter
})

const verticalGutter = computed(() => {
  if (Array.isArray(props.gutter)) {
    return props.gutter[1]
  }
  return 0
})

// 提供 gutter 给子组件
provide('rowGutter', {
  horizontal: horizontalGutter.value,
  vertical: verticalGutter.value
})

// 计算行样式
const rowStyle = computed(() => {
  const style: Record<string, string> = {}
  
  // 设置对齐方式
  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between',
    'space-evenly': 'space-evenly'
  }
  style.justifyContent = justifyMap[props.justify]
  
  const alignMap = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    stretch: 'stretch'
  }
  style.alignItems = alignMap[props.align]
  
  // 设置换行
  style.flexWrap = props.wrap ? 'wrap' : 'nowrap'
  
  // 设置负 margin 来抵消列的 padding
  if (horizontalGutter.value) {
    style.marginLeft = `-${horizontalGutter.value / 2}px`
    style.marginRight = `-${horizontalGutter.value / 2}px`
  }
  
  if (verticalGutter.value) {
    style.marginTop = `-${verticalGutter.value / 2}px`
    style.marginBottom = `-${verticalGutter.value / 2}px`
  }
  
  return style
})
</script>

<style scoped>
.tml-row {
  display: flex;
  flex-flow: row wrap;
}
</style>
