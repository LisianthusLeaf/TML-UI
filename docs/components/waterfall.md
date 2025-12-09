# TmlWaterfall 瀑布流组件

瀑布流布局组件，用于展示不同高度的内容项，自动计算最优布局。

## 基础用法

```vue
<template>
  <TmlWaterfall :columns="3" :gap="16">
    <div v-for="item in items" :key="item.id" class="waterfall-item">
      <img :src="item.image" :alt="item.title" />
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </TmlWaterfall>
</template>

<script setup lang="ts">
import { TmlWaterfall } from 'tml-ui'

const items = [
  { id: 1, image: '/img1.jpg', title: '标题 1', description: '描述...' },
  { id: 2, image: '/img2.jpg', title: '标题 2', description: '描述...' },
  // ...更多项
]
</script>

<style scoped>
.waterfall-item {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.waterfall-item img {
  width: 100%;
  border-radius: 4px;
}
</style>
```

## 自适应列数

不设置 `columns` 属性，组件会根据容器宽度和项的最小/最大宽度自动计算列数：

```vue
<template>
  <TmlWaterfall 
    :min-item-width="200" 
    :max-item-width="400" 
    :gap="20"
  >
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.content }}
    </div>
  </TmlWaterfall>
</template>
```

## 滚动加载更多

监听 `reach-bottom` 事件实现无限滚动：

```vue
<template>
  <TmlWaterfall 
    :columns="4" 
    :trigger-distance="200"
    @reach-bottom="handleReachBottom"
  >
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.content }}
    </div>
  </TmlWaterfall>
  <div v-if="loading" class="loading">加载中...</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TmlWaterfall } from 'tml-ui'

const items = ref([...Array(20).keys()].map(i => ({ id: i, content: `Item ${i}` })))
const loading = ref(false)

const handleReachBottom = async ({ atBottom }: { atBottom: boolean }) => {
  if (atBottom && !loading.value) {
    loading.value = true
    // 模拟加载更多数据
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newItems = [...Array(10).keys()].map(i => ({
      id: items.value.length + i,
      content: `Item ${items.value.length + i}`
    }))
    items.value.push(...newItems)
    loading.value = false
  }
}
</script>
```

## 动态内容

组件会自动监听子元素的增删和尺寸变化：

```vue
<template>
  <button @click="addItem">添加项</button>
  <button @click="removeItem">删除最后一项</button>
  
  <TmlWaterfall :columns="3">
    <div 
      v-for="item in items" 
      :key="item.id" 
      class="item"
      :style="{ height: item.height + 'px' }"
    >
      {{ item.content }}
    </div>
  </TmlWaterfall>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TmlWaterfall } from 'tml-ui'

const items = ref([
  { id: 1, content: 'Item 1', height: 150 },
  { id: 2, content: 'Item 2', height: 200 }
])

const addItem = () => {
  const newId = items.value.length + 1
  items.value.push({
    id: newId,
    content: `Item ${newId}`,
    height: 100 + Math.random() * 200
  })
}

const removeItem = () => {
  if (items.value.length > 0) {
    items.value.pop()
  }
}
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
|------|------|------|--------|--------|------|
| columns | 瀑布流列数，设置为 0 或不设置则根据容器宽度自动计算 | `number` | `0+` | `5` | 否 |
| gap | 列间距和行间距，单位 px | `number` | `0+` | `16` | 否 |
| maxItemWidth | 自动计算列数时，每个项的最大宽度，单位 px | `number` | `0+` | `320` | 否 |
| minItemWidth | 自动计算列数时，每个项的最小宽度，单位 px | `number` | `0+` | `160` | 否 |
| observeMutations | 是否自动监听子元素的增删变化并重新布局 | `boolean` | `true` / `false` | `true` | 否 |
| observeResizes | 是否自动监听子元素的尺寸变化并重新布局 | `boolean` | `true` / `false` | `true` | 否 |
| triggerDistance | 触发 reach-bottom 事件的距离阈值，单位 px | `number` | `0+` | `200` | 否 |

### Events

| 事件名 | 说明 | 回调参数 | 类型 |
| --- | --- | --- | --- |
| reach-bottom | 滚动到页面底部附近时触发，可用于实现无限滚动 | `payload: ReachBottomPayload` | `(payload: ReachBottomPayload) => void` |

**ReachBottomPayload 接口：**
```typescript
interface ReachBottomPayload {
  atBottom: boolean    // 是否到达底部（距离底部小于 triggerDistance）
  scrollY: number      // 当前页面滚动位置
  innerHeight: number  // 视口高度
  scrollHeight: number // 文档总高度
}
```

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 瀑布流子元素，可以是任意类型的 HTML 元素或 Vue 组件 |

### Exposed Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| checkBottom | 手动检查当前是否到达页面底部，并触发 reach-bottom 事件 | — | `void` |

## TypeScript 类型定义

```typescript
// Props 接口
export interface WaterfallProps {
  columns?: number
  gap?: number
  maxItemWidth?: number
  minItemWidth?: number
  observeMutations?: boolean
  observeResizes?: boolean
  triggerDistance?: number
}

// reach-bottom 事件的 Payload 类型
export interface ReachBottomPayload {
  atBottom: boolean
  scrollY: number
  innerHeight: number
  scrollHeight: number
}

// Events 接口
export interface WaterfallEmits {
  (e: 'reach-bottom', payload: ReachBottomPayload): void
}

// 组件实例类型
import type { TmlWaterfall } from 'tml-ui'
```

### 在 TypeScript 中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TmlWaterfall } from 'tml-ui'
import type { WaterfallProps, ReachBottomPayload } from 'tml-ui'

// 定义组件配置
const waterfallConfig: WaterfallProps = {
  columns: 0, // 自动计算列数
  gap: 20,
  minItemWidth: 200,
  maxItemWidth: 400,
  triggerDistance: 300
}

// 定义事件处理器
const handleReachBottom = (payload: ReachBottomPayload): void => {
  if (payload.atBottom) {
    console.log('到达底部，加载更多数据')
    loadMoreData()
  }
}

// 获取组件实例引用
const waterfallRef = ref<InstanceType<typeof TmlWaterfall>>()

// 手动检查底部
const manualCheck = (): void => {
  waterfallRef.value?.checkBottom()
}

interface Item {
  id: number
  content: string
  height: number
}

const items = ref<Item[]>([])

const loadMoreData = async (): Promise<void> => {
  // 加载数据逻辑
}
</script>

<template>
  <TmlWaterfall 
    ref="waterfallRef"
    v-bind="waterfallConfig"
    @reach-bottom="handleReachBottom"
  >
    <div 
      v-for="item in items" 
      :key="item.id"
      :style="{ height: item.height + 'px' }"
    >
      {{ item.content }}
    </div>
  </TmlWaterfall>
</template>
```

## Exposed Methods

### checkBottom

手动检查当前是否到达页面底部。

```vue
<template>
  <TmlWaterfall ref="waterfallRef" @reach-bottom="handleReachBottom">
    <!-- 内容 -->
  </TmlWaterfall>
  <button @click="checkManually">手动检查</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TmlWaterfall } from 'tml-ui'

const waterfallRef = ref()

const checkManually = () => {
  waterfallRef.value?.checkBottom()
}

const handleReachBottom = (payload) => {
  console.log('到达底部:', payload)
}
</script>
```

## 插槽

### 默认插槽

放置任意需要进行瀑布流布局的元素。

```vue
<TmlWaterfall>
  <div>项 1</div>
  <img src="..." />
  <CustomComponent />
  <!-- 支持任意类型的子元素 -->
</TmlWaterfall>
```

## 性能优化建议

### 1. 图片懒加载

对于图片瀑布流，结合懒加载可以显著提升性能：

```vue
<script setup>
import { TmlWaterfall } from 'tml-ui'

const images = ref([...])
</script>

<template>
  <TmlWaterfall :columns="4" :gap="16">
    <div v-for="img in images" :key="img.id" class="image-card">
      <img 
        :data-src="img.url" 
        :alt="img.title"
        loading="lazy"
        @load="onImageLoad"
      />
    </div>
  </TmlWaterfall>
</template>
```

### 2. 禁用不必要的监听

如果内容是静态的（不会动态增删或改变尺寸），可以禁用监听以提升性能：

```vue
<template>
  <TmlWaterfall 
    :observe-mutations="false"
    :observe-resizes="false"
  >
    <!-- 静态内容 -->
  </TmlWaterfall>
</template>
```

### 3. 合理的触发距离

根据数据加载速度调整 `trigger-distance`：

```vue
<template>
  <!-- 快速加载：较小的触发距离 -->
  <TmlWaterfall :trigger-distance="100">
    <!-- 内容 -->
  </TmlWaterfall>

  <!-- 慢速加载：较大的触发距离，提前加载 -->
  <TmlWaterfall :trigger-distance="500">
    <!-- 内容 -->
  </TmlWaterfall>
</template>
```

### 4. 分页加载策略

```vue
<script setup>
import { ref } from 'vue'
import { TmlWaterfall } from 'tml-ui'

const items = ref([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)
const pageSize = 20

const handleReachBottom = async ({ atBottom }) => {
  if (atBottom && !loading.value && hasMore.value) {
    loading.value = true
    try {
      const newItems = await fetchData(page.value, pageSize)
      if (newItems.length < pageSize) {
        hasMore.value = false
      }
      items.value.push(...newItems)
      page.value++
    } finally {
      loading.value = false
    }
  }
}
</script>
```

### 5. 使用 CSS contain 优化渲染

```vue
<style>
.waterfall-item {
  contain: layout style paint;
  /* 告诉浏览器该元素内容独立，优化渲染性能 */
}
</style>
```

### 6. 响应式列数计算

让组件自动适配不同屏幕尺寸：

```vue
<template>
  <!-- 自动计算列数，在不同设备上自适应 -->
  <TmlWaterfall 
    :columns="0"
    :min-item-width="200"
    :max-item-width="400"
  >
    <!-- 内容 -->
  </TmlWaterfall>
</template>
```

## 注意事项

### 布局相关

1. **绝对定位**：子元素会被设置为 `position: absolute`，不要依赖其默认的文档流位置
2. **容器定位**：容器会自动设置为 `position: relative`，确保不与父元素的定位冲突
3. **元素宽度**：子元素宽度会被组件自动设置，不要在子元素上设置固定宽度
4. **高度计算**：组件依赖子元素的 `offsetHeight` 进行布局，确保子元素有明确的高度

### 性能相关

5. **Transform 定位**：组件使用 `transform: translate()` 进行定位，性能优于 `top/left`
6. **滚动节流**：滚动事件会被节流（300ms），不会影响页面性能
7. **动画过渡**：组件会自动为子元素添加 `transition: transform 0.2s ease`，可以覆盖自定义

### 使用建议

8. **初始数据**：建议首次渲染时提供足够的数据项（至少填满一屏），避免立即触发加载更多
9. **加载指示器**：使用 `reach-bottom` 事件时，建议添加加载指示器提升用户体验
10. **空状态处理**：当没有数据时，提供空状态提示
11. **错误处理**：加载数据失败时，提供错误提示和重试机制

### 兼容性

12. **浏览器兼容性**：使用了 `ResizeObserver` 和 `MutationObserver`，需要现代浏览器支持
13. **服务端渲染**：组件依赖 DOM API，SSR 时需要客户端激活后才能正常工作

## 最佳实践

### 完整的图片瀑布流示例

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TmlWaterfall } from 'tml-ui'
import type { ReachBottomPayload } from 'tml-ui'

interface ImageItem {
  id: number
  url: string
  title: string
  width: number
  height: number
}

const images = ref<ImageItem[]>([])
const loading = ref(false)
const hasMore = ref(true)
const page = ref(1)

// 模拟 API 请求
const fetchImages = async (pageNum: number): Promise<ImageItem[]> => {
  // 实际项目中替换为真实 API 调用
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Array.from({ length: 20 }, (_, i) => ({
    id: (pageNum - 1) * 20 + i,
    url: `https://picsum.photos/400/${300 + Math.random() * 200}`,
    title: `Image ${(pageNum - 1) * 20 + i}`,
    width: 400,
    height: 300 + Math.random() * 200
  }))
}

const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const newImages = await fetchImages(page.value)
    if (newImages.length === 0) {
      hasMore.value = false
      return
    }
    images.value.push(...newImages)
    page.value++
  } catch (error) {
    console.error('加载失败:', error)
    // 显示错误提示
  } finally {
    loading.value = false
  }
}

const handleReachBottom = ({ atBottom }: ReachBottomPayload) => {
  if (atBottom) {
    loadMore()
  }
}

onMounted(() => {
  loadMore() // 加载初始数据
})
</script>

<template>
  <div class="page-container">
    <TmlWaterfall
      :columns="0"
      :gap="16"
      :min-item-width="240"
      :max-item-width="400"
      :trigger-distance="300"
      @reach-bottom="handleReachBottom"
    >
      <div 
        v-for="img in images" 
        :key="img.id" 
        class="image-card"
      >
        <img 
          :src="img.url" 
          :alt="img.title"
          loading="lazy"
        />
        <div class="image-title">{{ img.title }}</div>
      </div>
    </TmlWaterfall>

    <!-- 加载指示器 -->
    <div v-if="loading" class="loading-indicator">
      <span>加载中...</span>
    </div>

    <!-- 没有更多数据提示 -->
    <div v-if="!hasMore && images.length > 0" class="no-more">
      没有更多内容了
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && images.length === 0" class="empty-state">
      暂无数据
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.image-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.image-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-card img {
  width: 100%;
  display: block;
}

.image-title {
  padding: 12px;
  font-size: 14px;
  color: #333;
}

.loading-indicator,
.no-more,
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}
</style>
```

### 常见问题

**Q: 为什么布局不正确？**  
A: 确保子元素有明确的高度。如果是图片，需要等待图片加载完成后组件会自动重新布局。

**Q: 如何实现点击查看大图？**  
A: 在子元素上添加点击事件处理器即可，组件不会阻止事件冒泡。

**Q: 可以在瀑布流内使用路由跳转吗？**  
A: 可以，子元素内的所有交互都不受影响。

**Q: 如何自定义列间距？**  
A: 使用 `gap` 属性设置，如 `:gap="20"`。

**Q: 支持服务端渲染（SSR）吗？**  
A: 组件依赖浏览器 API，需要在客户端激活后才能正常工作。在 SSR 框架中使用时，建议使用 `<ClientOnly>` 包裹。
