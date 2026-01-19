# Skeleton 骨架屏

在需要等待加载内容的位置提供一个占位图形。

## 基础用法

基础的骨架屏效果。

<div class="demo-container">
  <div class="demo-row">
    <tml-skeleton width="200px" height="20px" />
  </div>
</div>

```vue
<template>
  <tml-skeleton width="200px" height="20px" />
</template>
```

## 文本骨架屏

使用 `variant="text"` 展示多行文本骨架屏。

<div class="demo-container">
  <div style="width: 300px;">
    <tml-skeleton variant="text" :lines="3" />
  </div>
</div>

```vue
<template>
  <tml-skeleton variant="text" :lines="3" />
</template>
```

## 自定义行宽

通过 `lineWidths` 属性自定义每行的宽度。

<div class="demo-container">
  <div style="width: 300px;">
    <tml-skeleton variant="text" :lines="4" :line-widths="['100%', '80%', '90%', '60%']" />
  </div>
</div>

```vue
<template>
  <tml-skeleton 
    variant="text" 
    :lines="4" 
    :line-widths="['100%', '80%', '90%', '60%']" 
  />
</template>
```

## 头像骨架屏

使用 `variant="avatar"` 展示头像骨架屏。

<div class="demo-container">
  <div class="demo-row">
    <tml-skeleton variant="avatar" width="64px" height="64px" />
    <tml-skeleton variant="avatar" width="48px" height="48px" circle />
    <tml-skeleton variant="avatar" width="40px" height="40px" rounded />
  </div>
</div>

```vue
<template>
  <tml-skeleton variant="avatar" width="64px" height="64px" />
  <tml-skeleton variant="avatar" width="48px" height="48px" circle />
  <tml-skeleton variant="avatar" width="40px" height="40px" rounded />
</template>
```

## 卡片骨架屏

使用 `variant="card"` 展示卡片布局骨架屏。

<div class="demo-container">
  <div style="width: 300px;">
    <tml-skeleton variant="card" />
  </div>
</div>

```vue
<template>
  <tml-skeleton variant="card" />
</template>
```

## 动画类型

骨架屏支持多种动画效果：`pulse`（脉冲）、`wave`（波浪）、`shimmer`（流光）。

<div class="demo-container">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <p style="margin-bottom: 8px; color: #666;">Pulse 脉冲动画（默认）</p>
      <tml-skeleton width="200px" height="20px" animation="pulse" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">Wave 波浪动画</p>
      <tml-skeleton width="200px" height="20px" animation="wave" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">Shimmer 流光动画</p>
      <tml-skeleton width="200px" height="20px" animation="shimmer" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">无动画</p>
      <tml-skeleton width="200px" height="20px" animation="none" />
    </div>
  </div>
</div>

```vue
<template>
  <tml-skeleton width="200px" height="20px" animation="pulse" />
  <tml-skeleton width="200px" height="20px" animation="wave" />
  <tml-skeleton width="200px" height="20px" animation="shimmer" />
  <tml-skeleton width="200px" height="20px" animation="none" />
</template>
```

## 自定义颜色

通过 `color` 和 `shimmerColor` 属性自定义骨架屏颜色。

<div class="demo-container">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <tml-skeleton 
      width="200px" 
      height="20px" 
      color="#e0e7ff" 
      shimmer-color="rgba(99, 102, 241, 0.3)"
      animation="shimmer"
    />
    <tml-skeleton 
      width="200px" 
      height="20px" 
      color="#fce7f3" 
      shimmer-color="rgba(236, 72, 153, 0.3)"
      animation="wave"
    />
  </div>
</div>

```vue
<template>
  <tml-skeleton 
    width="200px" 
    height="20px" 
    color="#e0e7ff" 
    shimmer-color="rgba(99, 102, 241, 0.3)"
    animation="shimmer"
  />
  <tml-skeleton 
    width="200px" 
    height="20px" 
    color="#fce7f3" 
    shimmer-color="rgba(236, 72, 153, 0.3)"
    animation="wave"
  />
</template>
```

## 组合使用

结合不同类型的骨架屏组合成复杂的加载占位。

<div class="demo-container">
  <div style="display: flex; gap: 16px; padding: 16px; border: 1px solid #eee; border-radius: 8px; max-width: 400px;">
    <tml-skeleton variant="avatar" width="48px" height="48px" circle />
    <div style="flex: 1;">
      <tml-skeleton width="120px" height="16px" style="margin-bottom: 8px;" />
      <tml-skeleton variant="text" :lines="2" :line-widths="['100%', '70%']" />
    </div>
  </div>
</div>

```vue
<template>
  <div class="skeleton-demo">
    <tml-skeleton variant="avatar" width="48px" height="48px" circle />
    <div class="skeleton-content">
      <tml-skeleton width="120px" height="16px" />
      <tml-skeleton variant="text" :lines="2" :line-widths="['100%', '70%']" />
    </div>
  </div>
</template>

<style scoped>
.skeleton-demo {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.skeleton-content {
  flex: 1;
}
</style>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 骨架屏变体 | `'basic' \| 'text' \| 'avatar' \| 'card' \| 'custom'` | `'basic'` |
| animation | 动画类型 | `'pulse' \| 'wave' \| 'shimmer' \| 'none'` | `'pulse'` |
| active | 是否激活状态 | `boolean` | `true` |
| shimmer | 是否显示流光效果 | `boolean` | `false` |
| rounded | 是否圆角 | `boolean` | `false` |
| circle | 是否圆形 | `boolean` | `false` |
| width | 宽度，支持 CSS 单位 | `string` | `'100%'` |
| height | 高度，支持 CSS 单位 | `string` | `'auto'` |
| color | 骨架屏颜色 | `string` | `'var(--tml-bg-color-page, #f2f3f5)'` |
| shimmerColor | 流光颜色 | `string` | `'rgba(255, 255, 255, 0.4)'` |
| lines | 文本行数（仅当 variant='text' 时有效） | `number` | `3` |
| lineWidths | 文本行宽度数组 | `string[]` | `['100%', '90%', '80%']` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义骨架屏内容（当 variant='custom' 时使用） |

<style>
.demo-container {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
