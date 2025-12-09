# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain` 和 `round` 来定义按钮的样式。

<div class="demo-container">
  <div class="demo-row">
    <tml-button>Default</tml-button>
    <tml-button type="primary">Primary</tml-button>
    <tml-button type="success">Success</tml-button>
    <tml-button type="warning">Warning</tml-button>
    <tml-button type="danger">Danger</tml-button>
  </div>
</div>

```vue
<template>
  <tml-button>Default</tml-button>
  <tml-button type="primary">Primary</tml-button>
  <tml-button type="success">Success</tml-button>
  <tml-button type="warning">Warning</tml-button>
  <tml-button type="danger">Danger</tml-button>
</template>
```

## 不同尺寸

Button 组件提供三种尺寸，可以在不同场景下选择合适的按钮尺寸。

<div class="demo-container">
  <div class="demo-row">
    <tml-button size="large" type="primary">Large</tml-button>
    <tml-button size="medium" type="primary">Medium</tml-button>
    <tml-button size="small" type="primary">Small</tml-button>
  </div>
</div>

```vue
<template>
  <tml-button size="large" type="primary">Large</tml-button>
  <tml-button size="medium" type="primary">Medium</tml-button>
  <tml-button size="small" type="primary">Small</tml-button>
</template>
```

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

<div class="demo-container">
  <div class="demo-row">
    <tml-button disabled>Default</tml-button>
    <tml-button type="primary" disabled>Primary</tml-button>
    <tml-button type="success" disabled>Success</tml-button>
    <tml-button type="warning" disabled>Warning</tml-button>
    <tml-button type="danger" disabled>Danger</tml-button>
  </div>
</div>

```vue
<template>
  <tml-button disabled>Default</tml-button>
  <tml-button type="primary" disabled>Primary</tml-button>
  <tml-button type="success" disabled>Success</tml-button>
</template>
```

## 加载状态

通过设置 `loading` 属性为 `true` 来显示加载中状态。

<div class="demo-container">
  <div class="demo-row">
    <tml-button type="primary" loading>Loading</tml-button>
    <tml-button type="success" loading>Loading</tml-button>
  </div>
</div>

```vue
<template>
  <tml-button type="primary" loading>Loading</tml-button>
  <tml-button type="success" loading>Loading</tml-button>
</template>
```

## 点击事件

Button 组件支持 `click` 事件。

<div class="demo-container">
  <div class="demo-row">
    <tml-button type="primary" @click="handleClick">Click Me</tml-button>
  </div>
</div>

```vue
<script setup>
const handleClick = (event) => {
  console.log('Button clicked!', event)
  alert('Button clicked!')
}
</script>

<template>
  <tml-button type="primary" @click="handleClick">Click Me</tml-button>
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
| --- | --- | --- | --- | --- | --- |
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `default` / `primary` / `success` / `warning` / `danger` | `'default'` | 否 |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `small` / `medium` / `large` | `'medium'` | 否 |
| disabled | 是否禁用按钮 | `boolean` | `true` / `false` | `false` | 否 |
| loading | 是否显示加载状态 | `boolean` | `true` / `false` | `false` | 否 |

### Events

| 事件名 | 说明 | 回调参数 | 类型 |
| --- | --- | --- | --- |
| click | 点击按钮时触发（禁用或加载中不触发） | `event: MouseEvent` | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 按钮文本内容 | — |
| icon | 自定义图标 | — |

## TypeScript 类型定义

```typescript
// Props 接口
export interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

// Events 接口
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

// 组件实例类型
import type { TmlButton } from 'tml-ui'
```

### 在 TypeScript 中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { TmlButton } from 'tml-ui'
import type { ButtonProps } from 'tml-ui'

// 使用类型定义
const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  disabled: false
}

const handleClick = (event: MouseEvent) => {
  console.log('Button clicked!', event.target)
}
</script>

<template>
  <TmlButton v-bind="buttonProps" @click="handleClick">
    点击按钮
  </TmlButton>
</template>
```

## 更多示例

### 图标按钮

通过 `icon` 插槽添加自定义图标：

```vue
<script setup>
const handleClick = () => {
  console.log('Icon button clicked!')
}
</script>

<template>
  <!-- 只显示图标 -->
  <tml-button type="primary" @click="handleClick">
    <template #icon>
      <span>🔍</span>
    </template>
  </tml-button>

  <!-- 图标 + 文本 -->
  <tml-button type="success">
    <template #icon>
      <span>✓</span>
    </template>
    确认
  </tml-button>

  <tml-button type="danger">
    <template #icon>
      <span>✗</span>
    </template>
    取消
  </tml-button>
</template>
```

### 按钮组

将多个按钮组合在一起使用：

```vue
<template>
  <div style="display: flex; gap: 8px;">
    <tml-button>取消</tml-button>
    <tml-button type="primary">确认</tml-button>
  </div>

  <div style="display: flex; gap: 8px; margin-top: 16px;">
    <tml-button type="primary" size="small">上一页</tml-button>
    <tml-button type="primary" size="small">1</tml-button>
    <tml-button type="primary" size="small">2</tml-button>
    <tml-button type="primary" size="small">3</tml-button>
    <tml-button type="primary" size="small">下一页</tml-button>
  </div>
</template>
```

### 自定义样式

可以通过 CSS 变量或直接添加样式来自定义按钮外观：

```vue
<template>
  <tml-button 
    type="primary" 
    style="
      --tml-color-primary: #8b5cf6;
      border-radius: 20px;
      padding: 12px 32px;
    "
  >
    自定义样式
  </tml-button>
</template>
```

## 注意事项

1. **禁用和加载状态**：当按钮处于 `disabled` 或 `loading` 状态时，`click` 事件不会被触发。
2. **加载图标**：默认使用 ⏳ emoji 作为加载图标，可以通过样式覆盖 `.tml-button__loading-icon` 来自定义。
3. **响应式设计**：按钮会自动适应容器宽度，使用 `inline-flex` 布局。
4. **无障碍性**：按钮使用原生 `<button>` 元素，具有良好的键盘可访问性。

## 最佳实践

1. **合理使用按钮类型**：
   - `primary`：主要操作（如提交、确认）
   - `success`：成功操作（如保存成功）
   - `warning`：警告操作（如重置表单）
   - `danger`：危险操作（如删除数据）
   - `default`：次要操作（如取消、关闭）

2. **保持一致的尺寸**：在同一界面区域内，尽量使用相同尺寸的按钮。

3. **避免过多的按钮**：一个页面或对话框中，建议最多有一个主要按钮（`primary`）。

4. **加载状态反馈**：在执行异步操作时使用 `loading` 状态，提升用户体验。
