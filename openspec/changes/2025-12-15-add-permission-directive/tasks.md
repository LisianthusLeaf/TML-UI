## 1. 提案确认

- [x] 确认指令名与绑定值形态（`v-permission`，value 为权限 key/path）
- [x] 确认替换标识属性名为 `data-permission-replace`
- [x] key 不存在于规则配置时默认不处理（原样）
- [x] 确认权限解析器返回值约定（boolean 或 level）

## 2. 实现

- [x] 新增权限指令实现（工厂函数 + 指令本体）
- [x] 新增规则解析与运行时适配（支持 whenDenied 与 byLevel 两种配置）
- [x] 行为实现：隐藏 / 禁用 / 替换
- [x] 等级权限：不同 level 下可配置不同表现与不同替换文案
- [x] 替换仅作用于宿主元素内部带 `data-permission-replace` 的子元素内容
- [x] 维护并恢复原始状态（update/unmount 可回滚，WeakMap 记录）
- [x] 导出：指令入口与库入口保持现有导出风格

## 3. 严格 TypeScript

- [x] 不使用 `any`（除非有明确边界并以 `unknown` + type guard 处理）
- [x] 对外导出完整类型（配置类型、解析器类型、规则类型）
- [x] 通过 `npm run type-check`（`vue-tsc --noEmit`）

## 4. 测试

- [x] 单测：whenDenied hide
- [x] 单测：whenDenied disable
- [x] 单测：replace 仅替换带标识属性的子元素
- [x] 单测：byLevel 不同 level 显示不同内容
- [x] 单测：binding value 更新触发重算并恢复旧状态

## 5. 文档

- [x] 新增指令文档页（用法 + 配置示例 + 等级权限示例）
- [x] 安全说明：默认替换使用 `textContent`，避免注入 HTML
