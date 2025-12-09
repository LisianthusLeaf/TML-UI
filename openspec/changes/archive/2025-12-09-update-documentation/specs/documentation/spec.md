# Component Documentation Specification

## Overview

本规范定义 TML UI 组件库的组件 API 文档和更新日志的标准和要求。

## ADDED Requirements

### Requirement: 更新日志文档页面

文档系统 SHALL 提供更新日志文档页面，链接到项目主更新日志。

#### Scenario: 查看文档中的更新日志

- **GIVEN** 用户想要在文档中查看版本更新历史
- **WHEN** 用户访问 `/guide/changelog` 页面
- **THEN** 系统 SHALL 显示：
  - 链接到主 CHANGELOG.md 文件
  - 最新版本的更新概览
  - 版本历史列表
  - 升级指南（如有破坏性变更）
  - GitHub Releases 链接

## MODIFIED Requirements

### Requirement: Button 组件 API 文档

Button 组件文档 SHALL 包含完整的 API 参考信息。

#### Scenario: 查看 Button 组件 API

- **GIVEN** 用户想要了解 Button 组件的完整 API
- **WHEN** 用户访问 Button 组件文档页面
- **THEN** 系统 SHALL 显示：
  - 完整的 Props API 表格，包含：type, size, disabled, loading 等属性
  - 每个 prop 的类型、默认值、是否必填和详细说明
  - Events API 表格，包含 click 事件等
  - Slots API 表格，包含 default 插槽说明
  - TypeScript 类型定义（ButtonType, ButtonSize 等）
  - 实际可运行的示例代码

### Requirement: Grid 组件 API 文档

Grid 组件文档 SHALL 包含 TmlRow 和 TmlCol 的完整 API 参考。

#### Scenario: 查看 Grid 组件 API

- **GIVEN** 用户想要使用栅格布局
- **WHEN** 用户访问 Grid 组件文档页面
- **THEN** 系统 SHALL 显示：
  - TmlRow 完整 Props API（gutter, justify, align, tag）
  - TmlCol 完整 Props API（span, offset, push, pull, 响应式属性）
  - 每个 prop 的类型定义和详细说明
  - gutter 支持数字和数组的完整说明
  - 响应式属性（xs, sm, md, lg, xl）的使用方法
  - TypeScript 类型定义
  - 响应式布局完整示例
  - 常见布局模式示例

### Requirement: Waterfall 组件 API 文档

Waterfall 组件文档 SHALL 包含完整的 API 参考和使用指南。

#### Scenario: 查看 Waterfall 组件 API

- **GIVEN** 用户想要实现瀑布流布局
- **WHEN** 用户访问 Waterfall 组件文档页面
- **THEN** 系统 SHALL 显示：
  - 完整的 Props API 表格：
    - columns（列数配置）
    - gap（间距配置）
    - minItemWidth（最小项宽度）
    - maxItemWidth（最大项宽度）
    - triggerDistance（触底触发距离）
  - Events API 表格（reach-bottom 事件及参数）
  - Slots API 表格（default 插槽）
  - TypeScript 类型定义（WaterfallProps, ReachBottomEvent）
  - 图片瀑布流完整示例
  - 无限滚动加载示例
  - 性能优化建议

### Requirement: 项目更新日志

项目 SHALL 维护完整的更新日志文件。

#### Scenario: 查看项目更新历史

- **GIVEN** 用户想要了解项目的版本历史
- **WHEN** 用户打开 CHANGELOG.md 文件
- **THEN** 系统 SHALL 显示：
  - 遵循 Keep a Changelog 格式
  - v1.0.0 版本的完整信息：
    - 版本号和发布日期（2025-12-09）
    - 新增的所有功能和组件
    - 技术栈信息（Vue 3, TypeScript, Vite, Tailwind CSS）
    - 安装和使用说明
  - 每个版本按时间倒序排列
  - 使用标准分类：Added, Changed, Deprecated, Removed, Fixed, Security

## ADDED Non-Functional Requirements

### Requirement: API 文档一致性

API 文档 SHALL 与实际代码保持一致。

#### Scenario: 验证 API 文档准确性

- **GIVEN** 组件源码已实现
- **WHEN** 编写或更新组件 API 文档
- **THEN** 文档 SHALL：
  - 包含源码中定义的所有 Props
  - 包含源码中定义的所有 Events
  - 包含源码中定义的所有 Slots
  - 类型定义与源码 TypeScript 类型一致
  - 默认值与源码中的默认值一致

### Requirement: 示例代码可运行性

所有文档中的示例代码 SHALL 可以实际运行。

#### Scenario: 测试文档示例

- **GIVEN** 文档中包含示例代码
- **WHEN** 用户复制示例代码到项目中
- **THEN** 示例代码 SHALL：
  - 可以直接运行，无需修改
  - 包含所有必要的 import 语句
  - 使用正确的组件名称和 API
  - 产生文档中描述的预期效果

### Requirement: 文档格式统一性

所有组件文档 SHALL 遵循统一的格式标准。

#### Scenario: 阅读多个组件文档

- **GIVEN** 用户需要查看多个组件的文档
- **WHEN** 用户在不同组件文档间切换
- **THEN** 所有文档 SHALL：
  - 使用统一的 API 表格格式
  - 使用统一的术语（Props/Events/Slots）
  - 使用统一的代码风格（`<script setup>`）
  - 使用统一的类型表示方法
  - 遵循相同的章节顺序

## Design Decisions

### API 文档表格格式

**决策**: 使用统一的表格格式记录组件 API

**Props 表格格式**:
```markdown
| 属性名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
```

**Events 表格格式**:
```markdown
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
```

**Slots 表格格式**:
```markdown
| 插槽名 | 说明 | 参数 |
|--------|------|------|
```

### TypeScript 类型定义展示

**决策**: 在 API 文档中展示 TypeScript 类型定义

**展示方式**:
```markdown
## 类型定义

\```typescript
interface ButtonProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'
\```
```

### 示例代码规范

**决策**: 所有示例代码使用 `<script setup>` 语法并包含完整导入

**示例模板**:
```markdown
\```vue
<template>
  <tml-button type="primary">按钮</tml-button>
</template>

<script setup lang="ts">
import { TmlButton } from 'tml-ui'
</script>
\```
```

### 更新日志格式

**决策**: 遵循 Keep a Changelog 规范

**格式标准**:
```markdown
# Changelog

## [版本号] - YYYY-MM-DD

### Added
- 新增功能

### Changed
- 变更内容

### Deprecated
- 废弃功能

### Removed
- 移除功能

### Fixed
- Bug 修复

### Security
- 安全更新
```

### 文档更新流程

**决策**: API 文档必须与源码保持同步

**验证步骤**:
1. 对照源码检查所有 Props
2. 对照源码检查所有 Events
3. 对照源码检查所有 Slots
4. 验证类型定义与源码一致
5. 测试所有示例代码可运行
6. 检查文档构建无错误
