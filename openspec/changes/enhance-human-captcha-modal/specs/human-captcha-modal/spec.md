# human-captcha-modal Specification Delta

## ADDED Requirements

### Requirement: Closable configuration option

系统 MUST 提供 `closable` 配置项，允许使用方控制弹窗是否可被用户主动关闭（非验证通过场景）。

**优先级:** P0  
**类型:** 功能性

#### Scenario: Closable default behavior (closable: true)

**Given** 使用方未指定 `closable` 或 `closable: true`  
**When** 弹窗打开  
**Then** 用户 SHALL 可以通过 Escape 键关闭弹窗  
**And** 用户 SHALL 可以通过点击遮罩层关闭弹窗  
**And** API SHALL resolve 为 `false`

#### Scenario: Non-closable mode (closable: false)

**Given** 使用方配置 `closable: false`  
**When** 弹窗打开  
**Then** 用户按下 Escape 键 SHALL NOT 关闭弹窗  
**And** 用户点击遮罩层 SHALL NOT 关闭弹窗  
**And** 弹窗 SHALL 仅在验证通过或调用 `destroy()` 后关闭

#### Scenario: Programmatic destroy still works

**Given** 使用方配置 `closable: false`  
**When** 使用方调用 `destroy()` 方法  
**Then** 弹窗 SHALL 立即销毁  
**And** API SHALL resolve 为 `false`

### Requirement: Close button display

系统 MUST 支持显示关闭按钮，并与 `closable` 配置联动。

**优先级:** P1  
**类型:** 功能性

#### Scenario: Close button visible when closable

**Given** 使用方配置 `closable: true` 或未配置  
**When** 弹窗打开  
**Then** 弹窗右上角 SHOULD 显示关闭按钮  
**And** 用户点击关闭按钮 SHALL 关闭弹窗并 resolve 为 `false`

#### Scenario: Close button hidden when non-closable

**Given** 使用方配置 `closable: false`  
**When** 弹窗打开  
**Then** 弹窗 SHALL NOT 显示关闭按钮

## MODIFIED Requirements

### Requirement: Enhanced visual styling

系统 MUST 提供优化的视觉样式，提升用户体验。

**优先级:** P1  
**类型:** 非功能性

#### Scenario: Button interactive states

**Given** 弹窗已打开  
**When** 用户将鼠标悬停在验证按钮上  
**Then** 按钮 SHOULD 显示 hover 状态（如颜色变化）

**When** 用户按下按钮  
**Then** 按钮 SHOULD 显示 active 状态（如颜色加深）

#### Scenario: Improved layout and spacing

**Given** 弹窗已打开  
**When** 渲染弹窗 UI  
**Then** 弹窗 SHALL 使用合适的内边距和元素间距  
**And** 标题、消息、按钮 SHALL 垂直居中对齐  
**And** 弹窗 SHALL 使用统一的圆角和阴影样式
