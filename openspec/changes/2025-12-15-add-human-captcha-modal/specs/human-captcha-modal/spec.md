## ADDED Requirements

### Requirement: Programmatic human captcha modal
系统 SHALL 提供一个纯前端的人机校验弹窗能力，允许使用方以程序化 API 触发校验，并获得一个异步结果。

#### Scenario: Verify resolves with boolean result
- **GIVEN** 使用方调用程序化 API 触发人机校验弹窗
- **WHEN** 用户完成挑战并通过校验
- **THEN** API SHALL resolve 为 `true`
- **WHEN** 用户取消、关闭或超时
- **THEN** API SHALL resolve 为 `false`

### Requirement: Avoid stable selectors (best-effort)
系统 SHALL 采取尽力而为措施，避免提供可被脚本轻易稳定选中的选择器（例如固定 id / 固定自定义 class），以提升自动化命中与绕过成本。

#### Scenario: Render inside a closed ShadowRoot
- **GIVEN** 弹窗被创建并挂载到页面
- **WHEN** 渲染弹窗 UI
- **THEN** 系统 SHOULD 将 UI 渲染在 `closed ShadowRoot` 内
- **AND** 系统 SHOULD NOT 使用稳定的 `id`

### Requirement: Visible text is not DOM text nodes
系统 SHALL 支持一种默认模式：弹窗可见文案不以 DOM 文本节点形式直接存在于可交互元素中。

#### Scenario: Canvas text rendering
- **GIVEN** 使用方启用默认文案渲染模式（canvas）
- **WHEN** 弹窗展示标题、说明与按钮标签
- **THEN** 系统 SHALL 通过 `canvas` 绘制可见文本
- **AND** 交互元素（如按钮）SHALL 可不包含可见文本节点

### Requirement: Randomized near-center position
系统 SHALL 支持弹窗随机定位，且定位结果尽量靠近屏幕中间并保证弹窗在视口内。

#### Scenario: Position is randomized and clamped
- **GIVEN** 使用方启用随机定位
- **WHEN** 弹窗打开
- **THEN** 弹窗位置 SHALL 围绕视口中心产生随机偏移
- **AND** 位置 SHALL 被夹取（clamp）到视口可见范围内

### Requirement: Pluggable challenges with default click-button
系统 SHALL 支持可插拔的挑战类型，并提供一个默认挑战：点击按钮。

#### Scenario: Default click-button challenge
- **GIVEN** 使用方未指定 challenge 或指定为 click-button
- **WHEN** 弹窗打开
- **THEN** 系统 SHALL 提供一个可点击区域作为挑战
- **AND** 用户点击满足条件后 SHALL 通过校验

#### Scenario: Custom challenge injection
- **GIVEN** 使用方注入一个自定义 challenge 实现
- **WHEN** 弹窗执行校验
- **THEN** 系统 SHALL 使用该 challenge 来决定通过/失败

### Requirement: Configurable anti-automation signals (best-effort)
系统 SHALL 支持可配置的“尽力而为”反自动化信号，以提高自动化程序通过成本，并允许关闭以满足可访问性或兼容性。

#### Scenario: Minimum solve time gate
- **GIVEN** 使用方配置 `minSolveTimeMs` 大于 0
- **WHEN** 用户在弹窗出现后过快触发通过动作
- **THEN** 系统 SHOULD 将该次尝试视为未通过

#### Scenario: Pointer travel gate
- **GIVEN** 使用方配置 `requirePointerTravelPx` 大于 0
- **WHEN** 用户未满足指针移动距离阈值
- **THEN** 系统 SHOULD 将该次尝试视为未通过
