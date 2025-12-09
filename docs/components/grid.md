# Grid 栅格

24 栏栅格布局系统，支持响应式设计。

## 基础用法

使用 `TRow` 和 `TCol` 组件创建基础网格布局。栅格系统基于 24 栏，通过 `span` 属性设置列占据的栅格数。

```vue
<template>
  <TRow>
    <TCol :span="24">col-24</TCol>
  </TRow>
  <TRow>
    <TCol :span="12">col-12</TCol>
    <TCol :span="12">col-12</TCol>
  </TRow>
  <TRow>
    <TCol :span="8">col-8</TCol>
    <TCol :span="8">col-8</TCol>
    <TCol :span="8">col-8</TCol>
  </TRow>
  <TRow>
    <TCol :span="6">col-6</TCol>
    <TCol :span="6">col-6</TCol>
    <TCol :span="6">col-6</TCol>
    <TCol :span="6">col-6</TCol>
  </TRow>
</template>
```

## 栅格间距

通过 `gutter` 属性设置列之间的间距，支持单个数字或数组形式（水平和垂直间距）。

```vue
<template>
  <!-- 水平间距 16px -->
  <TRow :gutter="16">
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
  </TRow>

  <!-- 水平间距 16px，垂直间距 8px -->
  <TRow :gutter="[16, 8]">
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
    <TCol :span="6">
      <div style="background: #0092ff; padding: 8px">col-6</div>
    </TCol>
  </TRow>
</template>
```

## 列偏移

通过 `offset` 属性设置列的左侧偏移栅格数。

```vue
<template>
  <TRow>
    <TCol :span="8">col-8</TCol>
    <TCol :span="8" :offset="8">col-8 offset-8</TCol>
  </TRow>
  <TRow>
    <TCol :span="6" :offset="6">col-6 offset-6</TCol>
    <TCol :span="6" :offset="6">col-6 offset-6</TCol>
  </TRow>
  <TRow>
    <TCol :span="12" :offset="6">col-12 offset-6</TCol>
  </TRow>
</template>
```

## 对齐方式

通过 `justify` 属性设置水平对齐方式，通过 `align` 属性设置垂直对齐方式。

```vue
<template>
  <!-- 水平对齐 -->
  <TRow justify="start">
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
  </TRow>

  <TRow justify="center">
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
  </TRow>

  <TRow justify="end">
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
  </TRow>

  <TRow justify="space-between">
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
  </TRow>

  <TRow justify="space-around">
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
    <TCol :span="4">col-4</TCol>
  </TRow>

  <!-- 垂直对齐 -->
  <TRow align="top">
    <TCol :span="8"><div style="height: 100px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 50px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 80px">col-8</div></TCol>
  </TRow>

  <TRow align="middle">
    <TCol :span="8"><div style="height: 100px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 50px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 80px">col-8</div></TCol>
  </TRow>

  <TRow align="bottom">
    <TCol :span="8"><div style="height: 100px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 50px">col-8</div></TCol>
    <TCol :span="8"><div style="height: 80px">col-8</div></TCol>
  </TRow>
</template>
```

## 响应式布局

支持 5 个响应式断点：`sm`(≥576px)、`md`(≥768px)、`lg`(≥992px)、`xl`(≥1200px)、`xxl`(≥1600px)。

```vue
<template>
  <!-- 简单形式：只设置 span -->
  <TRow>
    <TCol :span="24" :sm="12" :md="8" :lg="6" :xl="4" :xxl="3">
      响应式列
    </TCol>
    <TCol :span="24" :sm="12" :md="8" :lg="6" :xl="4" :xxl="3">
      响应式列
    </TCol>
    <TCol :span="24" :sm="12" :md="8" :lg="6" :xl="4" :xxl="3">
      响应式列
    </TCol>
  </TRow>

  <!-- 对象形式：设置完整配置 -->
  <TRow>
    <TCol 
      :span="24" 
      :sm="{ span: 12, offset: 0 }"
      :md="{ span: 8, offset: 2 }"
      :lg="{ span: 6, offset: 0 }"
    >
      响应式列
    </TCol>
  </TRow>
</template>
```

### 响应式断点

| 断点 | 屏幕宽度 | 说明 |
|------|---------|------|
| xs   | <576px  | 默认（不需要指定断点） |
| sm   | ≥576px  | 小屏幕及以上 |
| md   | ≥768px  | 中等屏幕及以上 |
| lg   | ≥992px  | 大屏幕及以上 |
| xl   | ≥1200px | 超大屏幕及以上 |
| xxl  | ≥1600px | 超超大屏幕及以上（覆盖到 2160px） |

## 列排序

通过 `push` 和 `pull` 属性改变列的显示顺序。

```vue
<template>
  <TRow>
    <TCol :span="8" :push="16">col-8 push-16</TCol>
    <TCol :span="16" :pull="8">col-16 pull-8</TCol>
  </TRow>
</template>
```

## 嵌套栅格

支持在列内嵌套新的栅格行。

```vue
<template>
  <TRow :gutter="16">
    <TCol :span="12">
      <div style="background: #0092ff; padding: 16px">
        <TRow :gutter="8">
          <TCol :span="12">
            <div style="background: #fff; padding: 8px">嵌套列</div>
          </TCol>
          <TCol :span="12">
            <div style="background: #fff; padding: 8px">嵌套列</div>
          </TCol>
        </TRow>
      </div>
    </TCol>
    <TCol :span="12">
      <div style="background: #0092ff; padding: 16px">col-12</div>
    </TCol>
  </TRow>
</template>
```

## 常见布局示例

### 两栏布局

```vue
<template>
  <!-- 左侧固定，右侧自适应 -->
  <TRow>
    <TCol :span="6">左侧导航</TCol>
    <TCol :span="18">主内容区</TCol>
  </TRow>
</template>
```

### 三栏布局

```vue
<template>
  <!-- 左中右三栏 -->
  <TRow>
    <TCol :span="6">左侧栏</TCol>
    <TCol :span="12">中间主内容</TCol>
    <TCol :span="6">右侧栏</TCol>
  </TRow>
</template>
```

### 侧边栏布局

```vue
<template>
  <!-- 响应式侧边栏 -->
  <TRow :gutter="16">
    <TCol :span="24" :lg="6">
      <div style="background: #f0f0f0; padding: 16px; min-height: 400px">
        侧边栏
      </div>
    </TCol>
    <TCol :span="24" :lg="18">
      <div style="background: #fff; padding: 16px; min-height: 400px">
        主内容区
      </div>
    </TCol>
  </TRow>
</template>
```

### 卡片栅格

```vue
<template>
  <TRow :gutter="[16, 16]">
    <TCol 
      v-for="i in 8" 
      :key="i"
      :span="24" 
      :sm="12" 
      :md="8" 
      :lg="6"
    >
      <div style="background: #f0f0f0; padding: 16px; text-align: center">
        卡片 {{ i }}
      </div>
    </TCol>
  </TRow>
</template>
```

## API

### TRow Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
|------|------|------|--------|--------|------|
| gutter | 栅格间距，可以是单个数字（水平间距）或数组（水平和垂直间距），单位 px | `number \| [number, number]` | — | `0` | 否 |
| justify | flex 布局下的水平对齐方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `start` / `end` / `center` / `space-around` / `space-between` / `space-evenly` | `'start'` | 否 |
| align | flex 布局下的垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `top` / `middle` / `bottom` / `stretch` | `'top'` | 否 |
| wrap | 是否自动换行 | `boolean` | `true` / `false` | `true` | 否 |

### TCol Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
|------|------|------|--------|--------|------|
| span | 栅格占据的列数（0-24），0 表示隐藏该列 | `number` | `0-24` | — | 否 |
| offset | 栅格左侧的间隔格数 | `number` | `0-24` | `0` | 否 |
| push | 栅格向右移动格数（使用相对定位） | `number` | `0-24` | `0` | 否 |
| pull | 栅格向左移动格数（使用相对定位） | `number` | `0-24` | `0` | 否 |
| sm | ≥576px 响应式栅格配置，可以是 span 数字或完整配置对象 | `number \| ColConfig` | — | — | 否 |
| md | ≥768px 响应式栅格配置 | `number \| ColConfig` | — | — | 否 |
| lg | ≥992px 响应式栅格配置 | `number \| ColConfig` | — | — | 否 |
| xl | ≥1200px 响应式栅格配置 | `number \| ColConfig` | — | — | 否 |
| xxl | ≥1600px 响应式栅格配置（覆盖至 2160px） | `number \| ColConfig` | — | — | 否 |

### TRow Slots

| 插槽名 | 说明 | 子标签 |
|------|------|--------|
| default | 行内容，通常包含 `TCol` 组件 | TCol |

### TCol Slots

| 插槽名 | 说明 |
|------|------|
| default | 列内容 |

## TypeScript 类型定义

```typescript
// TRow Props 接口
export interface RowProps {
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  wrap?: boolean
}

// TCol 响应式配置接口
export interface ColConfig {
  span?: number      // 栅格占据的列数 (0-24)
  offset?: number    // 左侧间隔格数 (0-24)
  push?: number      // 向右移动格数 (0-24)
  pull?: number      // 向左移动格数 (0-24)
}

// TCol Props 接口
export interface ColProps extends ColConfig {
  sm?: number | ColConfig   // ≥576px
  md?: number | ColConfig   // ≥768px
  lg?: number | ColConfig   // ≥992px
  xl?: number | ColConfig   // ≥1200px
  xxl?: number | ColConfig  // ≥1600px
}

// 组件实例类型
import type { TmlRow, TmlCol } from 'tml-ui'
```

### 在 TypeScript 中使用

```vue
<script setup lang="ts">
import { TmlRow, TmlCol } from 'tml-ui'
import type { RowProps, ColProps } from 'tml-ui'

// 定义 Row 配置
const rowConfig: RowProps = {
  gutter: [16, 8],
  justify: 'space-between',
  align: 'middle'
}

// 定义响应式列配置
const colConfig: ColProps = {
  span: 24,
  sm: 12,
  md: 8,
  lg: { span: 6, offset: 0 },
  xl: { span: 4, push: 1 }
}
</script>

<template>
  <TmlRow v-bind="rowConfig">
    <TmlCol v-bind="colConfig">
      响应式列
    </TmlCol>
  </TmlRow>
</template>
```

## 注意事项

1. **24 栏系统**: 确保一行内所有列的 `span` 总和不超过 24，超出部分会自动换行
2. **响应式优先级**: 响应式断点按屏幕宽度从小到大应用，大断点会覆盖小断点的设置
3. **嵌套栅格**: 嵌套的栅格系统基于父列的宽度重新计算 24 栏
4. **gutter 间距**: 
   - 使用 gutter 时，`TRow` 会自动添加负 margin，`TCol` 会添加对应的 padding
   - 数组形式的 gutter 第一个值为水平间距，第二个值为垂直间距
5. **span 为 0**: 当 `span="0"` 时，列会被隐藏（`display: none`）
6. **push 和 pull**: 使用相对定位实现，不影响其他列的位置，只改变视觉顺序
7. **offset**: 使用 margin 实现，会影响后续列的位置

## 最佳实践

### 1. 响应式设计模式

```vue
<template>
  <!-- 移动端单列，平板双列，桌面三列 -->
  <TRow :gutter="16">
    <TCol 
      v-for="item in items" 
      :key="item.id"
      :span="24"
      :md="12"
      :lg="8"
    >
      <div class="card">{{ item.content }}</div>
    </TCol>
  </TRow>
</template>
```

### 2. 常见布局组合

```vue
<template>
  <!-- 头部-内容-底部布局 -->
  <TRow>
    <TCol :span="24">
      <header>页面头部</header>
    </TCol>
  </TRow>
  
  <TRow :gutter="16">
    <TCol :span="24" :lg="6">
      <aside>侧边栏</aside>
    </TCol>
    <TCol :span="24" :lg="18">
      <main>主内容区</main>
    </TCol>
  </TRow>
  
  <TRow>
    <TCol :span="24">
      <footer>页面底部</footer>
    </TCol>
  </TRow>
</template>
```

### 3. 性能优化

- 避免在循环中动态计算复杂的响应式配置
- 对于固定布局，直接使用 `span` 而不是响应式 props
- 合理使用 `wrap` 属性控制换行行为

### 4. 间距管理

```vue
<template>
  <!-- 推荐：统一使用 gutter 管理间距 -->
  <TRow :gutter="[16, 16]">
    <TCol :span="12">内容</TCol>
    <TCol :span="12">内容</TCol>
  </TRow>

  <!-- 避免：混用 gutter 和元素 margin -->
  <!-- 这会导致间距不一致 -->
</template>
```
