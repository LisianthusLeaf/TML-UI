<template>
  <div ref="containerRef" class="tml-waterfall">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  defineEmits,
  defineExpose,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  withDefaults
} from 'vue'

/**
 * TmlWaterfall 组件属性定义
 */
interface Props {
  /** 列数，设置为 0 或不设置则自动计算 */
  columns?: number
  /** 列间距和行间距，单位 px */
  gap?: number
  /** 自动计算列数时的最大项宽度，单位 px */
  maxItemWidth?: number
  /** 自动计算列数时的最小项宽度，单位 px */
  minItemWidth?: number
  /** 是否监听子元素的增删 */
  observeMutations?: boolean
  /** 是否监听子元素的尺寸变化 */
  observeResizes?: boolean
  /** 触发底部事件的距离阈值，单位 px */
  triggerDistance?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 5,
  gap: 16,
  maxItemWidth: 320,
  minItemWidth: 160,
  observeMutations: true,
  observeResizes: true,
  triggerDistance: 200
})

/**
 * 滚动到底部事件的 payload 类型
 */
interface ReachBottomPayload {
  /** 是否到达底部 */
  atBottom: boolean
  /** 当前滚动位置 */
  scrollY: number
  /** 视口高度 */
  innerHeight: number
  /** 文档总高度 */
  scrollHeight: number
}

const emit = defineEmits<{
  'reach-bottom': [payload: ReachBottomPayload]
}>()

const containerRef = ref<HTMLElement | null>(null)
const itemsOrder = ref<HTMLElement[]>([])
const colCount = ref(1)
const itemMeta = new Map<HTMLElement, { col: number; top: number; height: number }>()
const isLayouting = ref(false)
let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null
let containerResizeObserver: ResizeObserver | null = null
let lastContainerWidth = 0
let rafId: number | null = null
let pendingStart: number | null = null

/**
 * 计算列数和每列宽度
 * @returns 每列的宽度（px）
 */
function computeColumns(): number {
  const cw = containerRef.value?.clientWidth || 0
  const desired =
    props.columns && props.columns > 0
      ? props.columns
      : Math.max(1, Math.floor(cw / (props.maxItemWidth || 320)))
  const maxByMin = Math.max(
    1,
    Math.floor((cw + props.gap) / ((props.minItemWidth || 160) + props.gap))
  )
  const usable = Math.max(1, Math.min(desired, maxByMin))
  colCount.value = usable
  const width = Math.floor((cw - props.gap * (usable - 1)) / usable)
  return Math.max(1, width)
}

/**
 * 确保元素具有正确的样式
 * @param el 目标元素
 * @param width 元素宽度
 */
function ensureStyles(el: HTMLElement, width: number): void {
  const s = el.style
  s.position = 'absolute'
  s.boxSizing = 'border-box'
  const w = `${width}px`
  if (s.width !== w) s.width = w
}

/**
 * 构建子元素列表
 */
function buildItems(): void {
  if (!containerRef.value) return
  itemsOrder.value = Array.from(containerRef.value.children) as HTMLElement[]
  itemsOrder.value.forEach((el) => {el.style.opacity = el.style.opacity || '0'})
}

/**
 * 获取元素在列表中的索引
 * @param el 目标元素
 * @returns 索引位置，-1 表示未找到
 */
function indexOf(el: HTMLElement): number {
  return itemsOrder.value.indexOf(el)
}

/**
 * 执行布局计算
 * @param start 起始索引，从该位置开始重新布局
 */
function doLayout(start: number): void {
  if (!containerRef.value) return
  if (isLayouting.value) return
  isLayouting.value = true
  try {
    const width = computeColumns()
    const cols: number[] = Array.from({ length: colCount.value }, () => 0)

    // 恢复起始位置之前的列高度
    for (let i = 0; i < start; i++) {
      const elPrev = itemsOrder.value[i]!
      const meta = itemMeta.get(elPrev)
      if (!meta) continue
      cols[meta.col] = Math.max(cols[meta.col] ?? 0, meta.top + meta.height + props.gap)
    }

    // 从起始位置开始布局
    for (let i = Math.max(0, start); i < itemsOrder.value.length; i++) {
      const el = itemsOrder.value[i]!
      ensureStyles(el, width)
      const h = el.offsetHeight

      // 找到高度最小的列
      let targetCol = 0
      let min = cols[0] ?? 0
      for (let c = 1; c < cols.length; c++) {
        const v = cols[c] ?? 0
        if (v < min) {
          min = v
          targetCol = c
        }
      }

      // 使用 transform 定位元素（性能优化）
      const left = targetCol * (width + props.gap)
      const top = cols[targetCol] ?? 0
      el.style.transform = `translate(${left}px, ${top}px)`
      itemMeta.set(el, { col: targetCol, top, height: h })
      cols[targetCol] = top + h + props.gap
      el.style.transition = 'opacity 0.4s ease'
      el.style.opacity = '1'
    }

    // 设置容器高度
    const height = Math.max(0, cols.reduce((m, v) => Math.max(m, v), 0) - props.gap)
    containerRef.value.style.position = 'relative'
    containerRef.value.style.height = `${height}px`
    checkBottom()
  } finally {
    isLayouting.value = false
  }
}

/**
 * 从指定位置开始请求布局更新
 * @param start 起始索引
 */
function layoutFrom(start: number): void {
  const s = Math.max(0, start)
  pendingStart = pendingStart == null ? s : Math.min(pendingStart, s)
  if (rafId != null) return
  rafId = requestAnimationFrame(() => {
    const begin = pendingStart ?? 0
    pendingStart = null
    rafId = null
    doLayout(begin)
  })
}

/**
 * 开始监听元素变化和容器尺寸变化
 */
function startObserving(): void {
  // 监听子元素尺寸变化
  if (props.observeResizes) {
    resizeObserver = new ResizeObserver((entries) => {
      if (isLayouting.value) return
      const affected = new Set<HTMLElement>()
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        if (!containerRef.value || !containerRef.value.contains(el)) continue
        affected.add(el)
      }
      if (affected.size > 0) {
        let start = itemsOrder.value.length
        for (const el of affected) {
          const idx = indexOf(el)
          if (idx !== -1) start = Math.min(start, idx)
        }
        layoutFrom(start === itemsOrder.value.length ? 0 : start)
      }
    })
  }

  // 监听子元素增删
  if (props.observeMutations) {
    mutationObserver = new MutationObserver((mutations) => {
      if (isLayouting.value) return
      let start = itemsOrder.value.length
      let changed = false
      for (const m of mutations) {
        if (m.type === 'childList') {
          changed = true
          // 处理删除的节点
          for (const node of Array.from(m.removedNodes)) {
            if (node.nodeType === 1) {
              const el = node as HTMLElement
              itemMeta.delete(el)
              resizeObserver?.unobserve(el)
            }
          }
          buildItems()
          // 处理新增的节点
          for (const node of Array.from(m.addedNodes)) {
            if (node.nodeType === 1) {
              const el = node as HTMLElement
              const idx = indexOf(el)
              if (idx !== -1) start = Math.min(start, idx)
              resizeObserver?.observe(el)
            }
          }
        }
      }
      if (changed) layoutFrom(start === itemsOrder.value.length ? 0 : start)
    })
  }

  // 监听所有子元素
  for (const el of itemsOrder.value) resizeObserver?.observe(el)
  if (mutationObserver && containerRef.value) {
    mutationObserver.observe(containerRef.value, { childList: true })
  }

  // 监听容器尺寸变化（响应式布局）
  containerResizeObserver = new ResizeObserver(() => {
    if (!containerRef.value) return
    const w = containerRef.value.clientWidth || 0
    if (w !== lastContainerWidth) {
      lastContainerWidth = w
      layoutFrom(0)
    }
  })
  if (containerRef.value) {
    lastContainerWidth = containerRef.value.clientWidth || 0
    containerResizeObserver.observe(containerRef.value)
  }
}

/**
 * 检查是否到达页面底部
 * @returns 滚动位置信息
 */
function isPageBottom(): ReachBottomPayload {
  const y = window.scrollY || window.pageYOffset || 0
  const h = window.innerHeight || 0
  const sh = document.documentElement?.scrollHeight || document.body?.scrollHeight || 0
  const offset = props.triggerDistance || 0
  return { atBottom: y + h >= sh - offset, scrollY: y, innerHeight: h, scrollHeight: sh }
}

/**
 * 检查是否到达底部并触发事件
 */
function checkBottom(): void {
  if (isLayouting.value) return
  const result = isPageBottom()
  emit('reach-bottom', result)
}

/**
 * 滚动事件处理函数
 */
function onScroll(): void {
  checkBottom()
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 节流等待时间（ms）
 * @returns 节流后的函数
 */
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), wait)
    }
  }
}

const onScrollThrottled = throttle(onScroll, 300)

onMounted(() => {
  buildItems()
  layoutFrom(0)
  startObserving()
  window.addEventListener('scroll', onScrollThrottled, { passive: true })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  containerResizeObserver?.disconnect()
  window.removeEventListener('scroll', onScrollThrottled)
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})

defineExpose({ checkBottom })
</script>

<style scoped></style>
