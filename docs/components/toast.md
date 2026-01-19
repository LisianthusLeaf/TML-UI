# Toast 轻提示

常用于主动操作后的反馈提示。

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showBasicToast = true">显示提示</tml-button>
  </div>
  <tml-toast 
    v-model:show="showBasicToast" 
    message="这是一条提示消息" 
  />
</div>

```vue
<template>
  <tml-button @click="show = true">显示提示</tml-button>
  <tml-toast v-model:show="show" message="这是一条提示消息" />
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
```

## 不同类型

用来显示「成功、警告、消息、错误」类的操作反馈。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showSuccessToast = true">Success</tml-button>
    <tml-button @click="showWarningToast = true">Warning</tml-button>
    <tml-button @click="showInfoToast = true">Info</tml-button>
    <tml-button @click="showErrorToast = true">Error</tml-button>
  </div>
  <tml-toast v-model:show="showSuccessToast" type="success" message="操作成功！" />
  <tml-toast v-model:show="showWarningToast" type="warning" message="请注意！" />
  <tml-toast v-model:show="showInfoToast" type="info" message="这是一条信息" />
  <tml-toast v-model:show="showErrorToast" type="error" message="操作失败！" />
</div>

```vue
<template>
  <tml-button @click="showSuccess = true">Success</tml-button>
  <tml-button @click="showWarning = true">Warning</tml-button>
  <tml-button @click="showInfo = true">Info</tml-button>
  <tml-button @click="showError = true">Error</tml-button>

  <tml-toast v-model:show="showSuccess" type="success" message="操作成功！" />
  <tml-toast v-model:show="showWarning" type="warning" message="请注意！" />
  <tml-toast v-model:show="showInfo" type="info" message="这是一条信息" />
  <tml-toast v-model:show="showError" type="error" message="操作失败！" />
</template>
```

## 不同位置

可以设置 Toast 在不同位置展示。

<div class="demo-container">
  <div class="demo-row" style="flex-wrap: wrap;">
    <tml-button size="small" @click="showTopLeftToast = true">左上</tml-button>
    <tml-button size="small" @click="showTopToast = true">顶部居中</tml-button>
    <tml-button size="small" @click="showTopRightToast = true">右上</tml-button>
    <tml-button size="small" @click="showCenterToast = true">居中</tml-button>
    <tml-button size="small" @click="showBottomLeftToast = true">左下</tml-button>
    <tml-button size="small" @click="showBottomToast = true">底部居中</tml-button>
    <tml-button size="small" @click="showBottomRightToast = true">右下</tml-button>
  </div>
  <tml-toast v-model:show="showTopLeftToast" position="top-left" message="左上角提示" />
  <tml-toast v-model:show="showTopToast" position="top" message="顶部居中提示" />
  <tml-toast v-model:show="showTopRightToast" position="top-right" message="右上角提示" />
  <tml-toast v-model:show="showCenterToast" position="center" message="居中提示" />
  <tml-toast v-model:show="showBottomLeftToast" position="bottom-left" message="左下角提示" />
  <tml-toast v-model:show="showBottomToast" position="bottom" message="底部居中提示" />
  <tml-toast v-model:show="showBottomRightToast" position="bottom-right" message="右下角提示" />
</div>

```vue
<template>
  <tml-toast v-model:show="show" position="top-left" message="左上角提示" />
  <tml-toast v-model:show="show" position="top" message="顶部居中提示" />
  <tml-toast v-model:show="show" position="top-right" message="右上角提示" />
  <tml-toast v-model:show="show" position="center" message="居中提示" />
  <tml-toast v-model:show="show" position="bottom-left" message="左下角提示" />
  <tml-toast v-model:show="show" position="bottom" message="底部居中提示" />
  <tml-toast v-model:show="show" position="bottom-right" message="右下角提示" />
</template>
```

## 显示进度条

设置 `showProgress` 属性显示自动关闭进度条。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showProgressToast = true">显示进度条</tml-button>
  </div>
  <tml-toast 
    v-model:show="showProgressToast" 
    message="这条消息将在 5 秒后关闭" 
    :duration="5000"
    show-progress
  />
</div>

```vue
<template>
  <tml-button @click="show = true">显示进度条</tml-button>
  <tml-toast 
    v-model:show="show" 
    message="这条消息将在 5 秒后关闭" 
    :duration="5000"
    show-progress
  />
</template>
```

## 不自动关闭

设置 `duration` 为 `0` 则不会自动关闭。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showPersistentToast = true">不自动关闭</tml-button>
  </div>
  <tml-toast 
    v-model:show="showPersistentToast" 
    message="这条消息不会自动关闭，请点击关闭按钮" 
    :duration="0"
    closable
  />
</div>

```vue
<template>
  <tml-toast 
    v-model:show="show" 
    message="这条消息不会自动关闭" 
    :duration="0"
    closable
  />
</template>
```

## 毛玻璃效果

默认启用毛玻璃效果，可通过 `glass` 属性控制。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showGlassToast = true">毛玻璃效果</tml-button>
    <tml-button @click="showNoGlassToast = true">普通效果</tml-button>
  </div>
  <tml-toast 
    v-model:show="showGlassToast" 
    message="毛玻璃效果" 
    :glass="true"
  />
  <tml-toast 
    v-model:show="showNoGlassToast" 
    message="普通效果" 
    :glass="false"
    position="bottom"
  />
</div>

```vue
<template>
  <tml-toast v-model:show="show1" message="毛玻璃效果" :glass="true" />
  <tml-toast v-model:show="show2" message="普通效果" :glass="false" />
</template>
```

## 隐藏图标

设置 `showIcon` 为 `false` 可以隐藏图标。

<div class="demo-container">
  <div class="demo-row">
    <tml-button @click="showNoIconToast = true">无图标</tml-button>
  </div>
  <tml-toast 
    v-model:show="showNoIconToast" 
    message="这条消息没有图标" 
    :show-icon="false"
  />
</div>

```vue
<template>
  <tml-toast 
    v-model:show="show" 
    message="这条消息没有图标" 
    :show-icon="false"
  />
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string` | `''` |
| type | 消息类型 | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| duration | 显示时长（毫秒），0 表示不自动关闭 | `number` | `3000` |
| closable | 是否可手动关闭 | `boolean` | `true` |
| showIcon | 是否显示图标 | `boolean` | `true` |
| showProgress | 是否显示进度条 | `boolean` | `false` |
| html | 是否使用 HTML 渲染消息（注意 XSS 风险） | `boolean` | `false` |
| glass | 是否启用毛玻璃效果 | `boolean` | `true` |
| position | 显示位置 | `'top' \| 'bottom' \| 'center' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top'` |
| show | 控制显示/隐藏 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 显示状态变化时触发 | `(show: boolean)` |
| close | 关闭时触发 | - |
| destroy | 动画结束销毁时触发 | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义消息内容 |
| icon | 自定义图标 |

<script setup>
import { ref } from 'vue'

const showBasicToast = ref(false)
const showSuccessToast = ref(false)
const showWarningToast = ref(false)
const showInfoToast = ref(false)
const showErrorToast = ref(false)
const showTopLeftToast = ref(false)
const showTopToast = ref(false)
const showTopRightToast = ref(false)
const showCenterToast = ref(false)
const showBottomLeftToast = ref(false)
const showBottomToast = ref(false)
const showBottomRightToast = ref(false)
const showProgressToast = ref(false)
const showPersistentToast = ref(false)
const showGlassToast = ref(false)
const showNoGlassToast = ref(false)
const showNoIconToast = ref(false)
</script>

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
