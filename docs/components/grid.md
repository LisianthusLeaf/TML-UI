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

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | 栅格间距，可以是单个数字（水平间距）或数组（水平和垂直间距） | `number \| [number, number]` | `0` |
| justify | 水平对齐方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| wrap | 是否自动换行 | `boolean` | `true` |

### TCol Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 栅格占据的列数（0-24），0 表示隐藏 | `number` | - |
| offset | 栅格左侧的间隔格数 | `number` | `0` |
| push | 栅格向右移动格数 | `number` | `0` |
| pull | 栅格向左移动格数 | `number` | `0` |
| sm | ≥576px 响应式栅格配置 | `number \| ColConfig` | - |
| md | ≥768px 响应式栅格配置 | `number \| ColConfig` | - |
| lg | ≥992px 响应式栅格配置 | `number \| ColConfig` | - |
| xl | ≥1200px 响应式栅格配置 | `number \| ColConfig` | - |
| xxl | ≥1600px 响应式栅格配置 | `number \| ColConfig` | - |

### ColConfig

```typescript
interface ColConfig {
  span?: number      // 栅格占据的列数
  offset?: number    // 左侧间隔格数
  push?: number      // 向右移动格数
  pull?: number      // 向左移动格数
}
```

## 注意事项

1. **24 栏系统**: 确保一行内所有列的 `span` 总和不超过 24
2. **响应式优先级**: 响应式断点按屏幕宽度从小到大应用，大断点会覆盖小断点的设置
3. **嵌套栅格**: 嵌套的栅格系统基于父列的宽度重新计算 24 栏
4. **gutter 间距**: 使用 gutter 时，行会自动添加负 margin，列会添加对应的 padding
5. **span 为 0**: 当 `span="0"` 时，列会被隐藏（`display: none`）
