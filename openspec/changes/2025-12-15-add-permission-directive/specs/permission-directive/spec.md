## ADDED Requirements

### Requirement: Permission directive applies rule by key/path
系统 SHALL 提供一个可复用的自定义指令，使用方通过传入“功能 ID/路径”（类似 i18n key）来决定目标元素在当前权限下的表现。

#### Scenario: Apply by key/path
- **GIVEN** 使用方在模板中对某元素使用权限指令并传入 key（例如 `product.price`）
- **AND** 使用方提供了权限校验函数与规则配置
- **WHEN** 指令在元素 mounted 或 updated 时执行
- **THEN** 指令 SHALL 根据 key 解析出对应规则
- **AND** 指令 SHALL 按规则对元素应用对应表现

### Requirement: Support permission levels for different presentation
系统 SHALL 支持“权限等级”（或角色/范围）解析，并允许在不同等级下对同一 key 展示不同内容或不同表现。

#### Scenario: Different levels show different replacement text
- **GIVEN** 使用方注入的权限解析器可返回 level（例如 `none/masked/full`）
- **AND** 某 key 的规则按 level 配置不同的替换文案
- **WHEN** 当前用户 level 为 `none`
- **THEN** 指令 SHALL 对带标识属性的子元素应用 `none` 对应的替换文案
- **WHEN** 当前用户 level 为 `masked`
- **THEN** 指令 SHALL 对带标识属性的子元素应用 `masked` 对应的替换文案
- **WHEN** 当前用户 level 为 `full`
- **THEN** 指令 SHALL 允许展示原始内容（不做替换）

### Requirement: Configurable modes (hide/disable/replace)
系统 SHALL 支持至少三种权限表现：隐藏、禁用、替换。

#### Scenario: Hide mode
- **GIVEN** 某 key 的规则 mode 为 hide
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 隐藏目标元素

#### Scenario: Disable mode
- **GIVEN** 某 key 的规则 mode 为 disable
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 禁用目标元素（保持可见但不可交互）

#### Scenario: Replace mode only affects marked descendants
- **GIVEN** 某 key 的规则 mode 为 replace
- **AND** 目标元素内部存在带有“标识属性”的子元素（`data-permission-replace`）
- **WHEN** 当前用户不具备该 key 权限
- **THEN** 指令 SHALL 仅替换带标识属性的子元素内容
- **AND** 指令 SHALL NOT 直接替换目标元素整体内容

### Requirement: Restore original state
系统 SHALL 在权限变化或规则变化时恢复元素的原始状态，避免累积式 DOM 污染。

#### Scenario: Restore on update
- **GIVEN** 指令已对元素应用 hide/disable/replace 之一
- **WHEN** 指令 updated 且权限校验结果变为允许（或规则变更为不处理）
- **THEN** 指令 SHALL 恢复元素及其被替换子元素的原始状态

### Requirement: Reusable across projects
系统 SHALL 允许以“注入校验函数与规则配置”的方式复用该指令，且不强绑定具体权限数据来源（store/接口）。

#### Scenario: Consumer injects permission checker
- **GIVEN** 使用方以工厂函数创建指令并注入 `hasPermission(key)`
- **WHEN** 在不同项目中使用相同指令实现
- **THEN** 指令 SHALL 仅依赖注入的校验函数与规则配置工作
- **AND** SHALL NOT 依赖某个特定的状态管理方案
