# Change: Enhance v-permission denied UX (tooltip + strike-through)

## Why
当前 `v-permission` 的 `disable` 与 `replace` 模式缺少更直观的“被拒绝原因/替代展示”能力：
- `disable` 仅禁用交互，无法提示原因/文案。
- `replace` 仅替换目标文本，无法覆盖“原价划线 + 折扣价”这类常见展示。

## What Changes
- 为 `mode: 'disable'` 增加可选的“气泡提示（tooltip）”能力：文本可配置，样式可配置。
- 为 `mode: 'replace'` 增加可选的“展示原内容并划线”能力（用于原价/折扣价展示）。
- 保持现有 `hide/disable/replace/allow` 行为兼容；未配置新选项时行为不变。

## Impact
- Affected capability: `permission-directive`
- Affected code:
  - `src/directives/permission/types.ts`
  - `src/directives/permission/index.ts`
  - `tests/directives/permission.spec.ts`
  - `docs/directives/permission.md`

## Notes / Gaps
- 当前 `permission-directive` 的规范仅存在于历史归档变更中（`openspec/changes/archive/2025-12-15-add-permission-directive/...`），未出现在 `openspec/specs/` 列表。本变更将以 delta spec 的形式补齐新增/修改的需求；后续归档阶段应将 capability 纳入 `openspec/specs/`（按项目流程执行）。

## Open Questions
- `disable` 的“气泡”触发方式：默认按 hover/focus 展示是否符合预期？是否需要支持常显？
- `replace` 的“展示原内容”：默认仅作用于带替换标识属性的目标节点（例如 `data-permission-replace`）是否符合预期？
