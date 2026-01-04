## MODIFIED Requirements

### Requirement: Configurable modes (hide/disable/replace)
系统 SHALL 支持至少三种权限表现：隐藏、禁用、替换。

#### Scenario: Disable mode (base behavior)
- **GIVEN** 某 key 的规则 mode 为 `disable`
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 禁用目标元素（保持可见但不可交互）
- **AND** 指令 SHALL 为目标元素设置 `cursor: not-allowed`
- **AND** 指令 SHALL 阻止点击事件的默认行为与事件传播

#### Scenario: Disable mode with tooltip
- **GIVEN** 某 key 的规则 mode 为 `disable`
- **AND** 该规则配置了禁用提示（tooltip）文本
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 在用户 hover 或 focus 目标元素时展示一个气泡提示
- **AND** 气泡提示文本 SHALL 来自配置项
- **AND** 气泡提示样式 SHALL 支持通过配置项自定义
- **AND** 当权限变为允许或指令 unmounted 时，气泡提示相关 DOM 与事件监听 SHALL 被清理

### Requirement: Replace mode only affects marked descendants
系统 SHALL NOT 直接改写宿主元素整体内容；`replace` 模式 SHALL 仅替换宿主元素内部带标识属性的子元素内容。

#### Scenario: Replace mode shows original with strike-through (optional)
- **GIVEN** 某 key 的规则 mode 为 `replace`
- **AND** 目标元素内部存在带有“标识属性”的子元素（默认 `data-permission-replace`）
- **AND** 该规则配置了“展示原内容”（showOriginal）
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 在被替换的目标子元素内同时展示原内容与替换文案
- **AND** 若配置了“原内容划线”（strikeOriginal），原内容 SHALL 以删除线样式展示
- **AND** 当权限变为允许或指令 updated/unmounted 时，目标子元素 SHALL 恢复原始内容

## ADDED Requirements

### Requirement: Disable tooltip is configurable
系统 SHALL 允许为 `disable` 模式配置提示文案与样式。

#### Scenario: Configure tooltip text and style
- **GIVEN** 使用方在规则中为 `disable` 行为配置 tooltip 文案
- **AND** 使用方可选配置 tooltip 的 class/style
- **WHEN** 指令应用 `disable` 行为
- **THEN** tooltip 文案 SHALL 按配置展示
- **AND** tooltip 样式 SHALL 按配置应用

### Requirement: Replace can optionally preserve original content
系统 SHALL 允许 `replace` 模式在替换目标中保留原内容用于展示。

#### Scenario: Preserve original content for discounted price
- **GIVEN** 使用方为 `replace` 行为配置 showOriginal 与 strikeOriginal
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 替换目标 SHALL 展示“原内容（可选划线） + 替换文案”
