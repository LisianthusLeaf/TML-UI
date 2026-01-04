## Context
`v-permission` 当前支持 `hide/disable/replace/allow`：
- `disable`：设置 `cursor`/`aria-disabled`，并阻止 click 默认行为与事件传播。
- `replace`：仅替换宿主元素内部带标识属性的子元素 `textContent`（默认 `data-permission-replace`）。

本变更为 denied 状态增强两类 UI 表达：禁用时提示气泡、替换时可展示原文并划线。

## Goals / Non-Goals
- Goals
  - 在不引入外部依赖前提下，为 `disable` 提供可选 tooltip DOM。
  - 为 `replace` 提供可选的“原文 + 划线 + 替换文案”渲染。
  - 维持现有默认行为与 API 兼容。
- Non-Goals
  - 不新增复杂的 Popover 组件、定位引擎、或全局管理器。
  - 不支持对任意复杂子树（包含组件/事件绑定）的无损替换；仅面向文本展示场景。

## Decisions
- Tooltip 实现：使用指令在宿主元素上注册 hover/focus 监听，在 `document.body` 中创建/定位一个 tooltip 元素（内容使用 `textContent` 写入），在 restore/unmount 时移除与解绑。
- Tooltip 样式：提供 `class` 与 `style` 配置；默认样式使用项目已有 CSS 变量（`--tml-*`）以避免硬编码新颜色/阴影。
- Replace 原文划线：在 replace 目标元素内部，用 DOM 节点组合（原文 span + 分隔符 + 替换 span）进行渲染；恢复时还原为原始文本（保持与既有 `textContent` 替换模型一致）。

## Risks / Trade-offs
- `replace` 目标节点若包含复杂子树（非纯文本），替换与恢复会丢失原子节点结构（与当前 `textContent` 替换模型一致）。文档需强调仅用于文本展示目标。
- Tooltip 需要注意滚动/窗口变化时的位置更新；本变更默认在 show 时计算位置，并在窗口 scroll/resize 时同步更新（或在最小实现下仅 show 时计算，待需求明确）。

## Open Questions
- Tooltip 是否需要支持常显（非 hover/focus）或自定义触发事件。
- Replace “展示原内容”是否需要额外的样式配置（如原文灰色、小号、间距）。
