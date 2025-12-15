# Change: Add reusable permission directive

## Why
在业务中经常需要按“功能权限/路径”控制页面元素的可见性与可操作性（例如价格/积分等敏感字段）。目前缺少一个可在不同项目复用、且可通过配置统一管理表现形式的解决方案。

## What Changes
- 新增一个可复用的权限校验自定义指令能力：通过传入“功能 ID/路径”（类似 I18n key）决定元素在当前权限下的表现。
- 新增可配置的权限表现策略：支持 **隐藏**、**禁用**、**替换**。
- **替换**策略按要求仅替换元素内部“带有指定标识属性”的子元素内容，而非直接替换宿主元素的全部内容。
- 支持“不同权限等级下显示不同内容”：允许注入一个权限解析器返回等级（例如 `none/masked/full`），并在配置中按等级定义表现与替换文案。

## Impact
- Affected specs: `permission-directive`（新增 capability）
- Affected code (planned): `src/directives/*`, `src/index.ts`（按库现有导出规则）
- Affected docs (planned): `docs/directives/*`
- Affected tests (planned): `tests/directives/*`

## Non-Goals
- 不做权限数据来源的统一（例如不强绑定 Pinia/Vuex/接口），由使用方以回调/适配器形式注入。
- 不实现复杂的“部分替换模板/富文本渲染”；替换默认以 `textContent` 为主，避免引入 XSS 风险。

## API Sketch (Proposal)
- 指令名：`v-permission`
- 绑定值：功能 ID/路径（字符串），例如：`'product.price'`、`'order.points'`
- 可复用性：通过工厂方法创建指令，注入校验函数与规则配置

示例（伪代码）：

```ts
import { createPermissionDirective } from 'tml-ui'
import permissionRules from './permission.config'

export const vPermission = createPermissionDirective({
  rules: permissionRules,
  // 支持两种模式：
  // 1) 仅校验：返回 boolean
  // 2) 等级权限：返回 string/number 等级（例如 none/masked/full）
  resolvePermission: (key) => permissionResolver(key),
  replace: {
    targetAttr: 'data-permission-replace'
  }
})
```

配置文件示例（伪代码）：

```ts
export default {
  // 仅校验模式示例（无权限时的表现）
  'order.submit': { whenDenied: { mode: 'disable' } },

  // 等级权限示例：不同等级显示不同内容（常用于价格/积分）
  'product.price': {
    byLevel: {
      none: { mode: 'replace', replaceText: '***' },
      masked: { mode: 'replace', replaceText: '**.**' },
      full: { mode: 'allow' }
    }
  }
}
```

## Notes
- 若 key 不存在于规则中：默认视为不处理（保持原样），避免误伤。
- 指令需在 `mounted` / `updated` 时重算并正确“恢复原始状态”。
- 默认替换标识属性名为 `data-permission-replace`。
