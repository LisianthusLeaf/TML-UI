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

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 按钮类型 | `string` | `default` / `primary` / `success` / `warning` / `danger` | `default` |
| size | 按钮尺寸 | `string` | `small` / `medium` / `large` | `medium` |
| disabled | 是否禁用 | `boolean` | — | `false` |
| loading | 是否加载中 | `boolean` | — | `false` |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
| icon | 自定义图标 |
