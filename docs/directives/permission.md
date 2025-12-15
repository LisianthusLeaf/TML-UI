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

`byLevel` 下除了 `replace`，也可以按等级配置 `hide/disable`（常用于：无权限直接隐藏；有部分权限但不允许操作时禁用）：

```ts
createPermissionDirective({
  rules: {
    'order.submit': {
      byLevel: {
        none: { mode: 'hide' },
        readonly: { mode: 'disable' },
        full: { mode: 'allow' }
      }
    }
  },
  resolvePermission: (key) => {
    return 'readonly'
  }
})
```

## 行为说明

- `hide`：设置宿主元素 `display: none`
- `disable`：保持可见但不可交互（`cursor: not-allowed` + `aria-disabled="true"`；并在捕获阶段拦截 `click` 事件以阻止默认行为与事件传播；对可禁用表单控件会设置 `disabled=true`）
- `replace`：仅对宿主元素内部带标识属性的子元素设置 `textContent`
- `allow`：不处理并恢复原始状态

## API

### 导出

```ts
import { createPermissionDirective, DEFAULT_PERMISSION_REPLACE_ATTR } from 'tml-ui'

import type {
  CreatePermissionDirectiveOptions,
  PermissionBehavior,
  PermissionKey,
  PermissionLevel,
  PermissionMode,
  PermissionRule,
  PermissionRules,
  PermissionReplaceOptions,
  ResolvePermission,
  ResolvePermissionResult
} from 'tml-ui'
```

### `createPermissionDirective`

```ts
function createPermissionDirective<Level extends PermissionLevel = string>(
  options: CreatePermissionDirectiveOptions<Level>
): import('vue').Directive<HTMLElement, string>
```

- 指令名：`permission`（模板中使用 `v-permission`）
- 绑定值：`string`，作为权限 key（会 `trim()`；空字符串视为未配置，恢复原始状态）
- 参数/修饰符：当前版本不使用

### `CreatePermissionDirectiveOptions`

```ts
export interface CreatePermissionDirectiveOptions<Level extends PermissionLevel = string> {
  rules: PermissionRules
  resolvePermission: ResolvePermission<Level>
  replace?: PermissionReplaceOptions
}
```

- `rules`：权限规则表（key -> rule）
- `resolvePermission`：权限解析函数，返回 `boolean` 或“等级”
- `replace.targetAttr`：自定义替换目标属性名（默认 `DEFAULT_PERMISSION_REPLACE_ATTR`）

### `ResolvePermission`

```ts
export type ResolvePermissionResult<Level extends PermissionLevel = string> = boolean | Level

export type ResolvePermission<Level extends PermissionLevel = string> = (
  key: PermissionKey
) => ResolvePermissionResult<Level>
```

- 返回 `true`：允许（不处理，恢复原始状态）
- 返回 `false`：按 `whenDenied` 执行
- 返回 `Level`：仅当规则配置了 `byLevel` 时生效；否则默认不处理（恢复原始状态）

### 规则结构

```ts
export type PermissionMode = 'allow' | 'hide' | 'disable' | 'replace'

export interface PermissionBehavior {
  mode: PermissionMode
  replaceText?: string
}

export type PermissionByLevelConfig = Partial<Record<string, PermissionBehavior>>

export type PermissionRule =
  | { whenDenied: PermissionBehavior }
  | { byLevel: PermissionByLevelConfig }
  | ({ whenDenied: PermissionBehavior } & { byLevel: PermissionByLevelConfig })

export type PermissionRules = Record<PermissionKey, PermissionRule>
```

规则匹配优先级（按实现逻辑）：

- `resolvePermission(key)` 返回 `boolean`
  - `true`：允许
  - `false`：若配置 `whenDenied` 则使用 `whenDenied`，否则不处理
- `resolvePermission(key)` 返回 `Level`
  - 若配置 `byLevel`：使用 `byLevel[String(level)]`
  - 未配置 `byLevel`：不处理

### `DEFAULT_PERMISSION_REPLACE_ATTR`

```ts
export const DEFAULT_PERMISSION_REPLACE_ATTR = 'data-permission-replace'
```

- `replace` 模式默认会查找宿主元素内部所有带该属性的子元素，并替换其 `textContent`

## 安全说明

`replace` 默认使用 `textContent` 写入替换文案，不渲染 HTML，以避免引入 XSS 风险。
