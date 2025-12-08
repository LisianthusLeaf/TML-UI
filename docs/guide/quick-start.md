# 快速开始

本节将介绍如何在项目中使用 TML UI。

## 安装

::: code-group

```bash [npm]
npm install tml-ui
```

```bash [yarn]
yarn add tml-ui
```

```bash [pnpm]
pnpm add tml-ui
```

:::

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import TmlUI from 'tml-ui'
import 'tml-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(TmlUI)
app.mount('#app')
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式。

```vue
<template>
  <tml-button type="primary">Primary Button</tml-button>
</template>

<script setup>
import { TmlButton } from 'tml-ui'
import 'tml-ui/dist/style.css'
</script>
```

## 开始使用

现在，你可以启动项目并开始使用 TML UI 了！

```vue
<template>
  <div>
    <tml-button type="primary" @click="handleClick">
      点击我
    </tml-button>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## 下一步

- 查看 [Button 组件](/components/button) 文档
- 探索更多组件
