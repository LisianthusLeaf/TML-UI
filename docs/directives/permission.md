# v-permission 指令

用于按“功能权限 / 路径 key”（类似 i18n key）控制元素在当前权限下的表现。

支持三种策略：**隐藏（hide）**、**禁用（disable）**、**替换（replace）**，并支持“权限等级（level）”下同一 key 显示不同内容。

## 基础用法（boolean 权限）

通过 `createPermissionDirective` 注入权限解析器与规则配置：

### 全局注册（推荐）

在入口文件里注册一次即可：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { createPermissionDirective } from 'tml-ui'

function hasPermission(key: string): boolean {
  return key === 'order.submit'
}

const app = createApp(App)

app.directive(
  'permission',
  createPermissionDirective({
    rules: {
      'order.submit': { whenDenied: { mode: 'disable' } }
    },
    resolvePermission: hasPermission
  })
)

app.mount('#app')
```

模板中使用：

```vue
<template>
  <button v-permission="'order.submit'">提交订单</button>
</template>
```

### 局部注册

```ts
import { defineComponent } from 'vue'
import { createPermissionDirective } from 'tml-ui'

export default defineComponent({
  directives: {
    permission: createPermissionDirective({
      rules: {
        'order.submit': { whenDenied: { mode: 'disable' } }
      },
      resolvePermission: () => false
    })
  }
})
```

## 替换策略（replace）

替换不会直接改写宿主元素整体内容，而是 **仅替换宿主元素内部带标识属性的子元素内容**。

默认标识属性名是 `data-permission-replace`：

```vue
<template>
  <div v-permission="'product.price'">
    <span>价格：</span>
    <span data-permission-replace>{{ price }}</span>
  </div>
</template>
```

规则配置示例：

```ts
import { createPermissionDirective } from 'tml-ui'

export const vPermission = createPermissionDirective({
  rules: {
    'product.price': {
      whenDenied: { mode: 'replace', replaceText: '***' }
    }
  },
  resolvePermission: (key) => false
})
```

也可以通过 `replace.targetAttr` 自定义标识属性：

```ts
createPermissionDirective({
  rules,
  resolvePermission,
  replace: {
    targetAttr: 'data-my-replace'
  }
})
```

## 权限等级（byLevel）

当你的权限解析器返回“等级”时（例如 `none/masked/full`），可以按等级分别配置行为：

```ts
createPermissionDirective({
  rules: {
    'product.price': {
      byLevel: {
        none: { mode: 'replace', replaceText: '***' },
        masked: { mode: 'replace', replaceText: '**.**' },
        full: { mode: 'allow' }
      }
    }
  },
  resolvePermission: (key) => {
    // 返回 level（string/number）
    return 'masked'
  }
})
```

## 行为说明

- `hide`：设置宿主元素 `display: none`
- `disable`：保持可见但不可交互（`pointer-events: none` + `aria-disabled="true"`；对可禁用表单控件会设置 `disabled=true`）
- `replace`：仅对宿主元素内部带标识属性的子元素设置 `textContent`
- `allow`：不处理并恢复原始状态

## 安全说明

`replace` 默认使用 `textContent` 写入替换文案，不渲染 HTML，以避免引入 XSS 风险。
