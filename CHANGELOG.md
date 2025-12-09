# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-12-09

### Added

#### 组件

- ✨ **TmlButton** 按钮组件
  - 支持 5 种类型: default, primary, success, warning, danger
  - 支持 3 种尺寸: small, medium, large
  - 支持禁用状态（disabled）
  - 支持加载状态（loading）
  - 支持点击事件
  - 支持默认插槽和图标插槽
  - 完整的 TypeScript 类型定义
  - 完善的组件文档和示例

- ✨ **TmlRow / TmlCol** 栅格布局组件
  - 基于 24 栏的响应式栅格系统
  - 支持栅格间距（gutter），可设置水平和垂直间距
  - 支持 flex 对齐方式（justify 和 align）
  - 支持列偏移（offset）
  - 支持列排序（push 和 pull）
  - 支持 5 个响应式断点：xs, sm(≥576px), md(≥768px), lg(≥992px), xl(≥1200px), xxl(≥1600px)
  - 支持嵌套栅格
  - 完整的 TypeScript 类型定义
  - 详细的布局示例和最佳实践

- ✨ **TmlWaterfall** 瀑布流布局组件
  - 支持固定列数和自适应列数两种模式
  - 自动监听子元素尺寸变化和增删（ResizeObserver 和 MutationObserver）
  - 支持响应式布局，自动根据容器宽度调整列数
  - 支持滚动到底部事件（reach-bottom），可实现无限滚动
  - 高性能布局算法（使用 transform 定位）
  - 支持自定义列间距、最小/最大项宽度
  - 自动优化：滚动事件节流、requestAnimationFrame 优化
  - 完整的 TypeScript 类型支持
  - 详细的使用文档、性能优化建议和完整示例

#### 样式系统

- 🎨 集成 **Tailwind CSS v3.4**
  - 添加 `tailwindcss`, `postcss`, `autoprefixer` 依赖
  - 创建 `tailwind.config.js` 配置文件，映射 CSS 变量到 Tailwind 主题
  - 创建 `postcss.config.js` 配置文件
  - 在 `src/styles/base.css` 中集成 Tailwind directives
  - 支持 utility-first CSS 开发方式
  - 保持与现有 CSS 变量系统的完全兼容
  - 支持响应式设计和暗色模式（通过配置）

- 🎨 CSS 变量系统
  - 定义完整的设计 token（颜色、字体、间距、阴影等）
  - 支持主题定制
  - 与 Tailwind CSS 完美集成

#### 文档

- 📝 **完善的组件文档**
  - Button 组件：完整的 API 表格、TypeScript 类型定义、多个实际示例、最佳实践
  - Grid 组件：详细的响应式配置说明、布局示例、性能优化建议
  - Waterfall 组件：完整的 Props/Events/Slots 文档、TypeScript 类型、性能优化指南、完整的图片瀑布流示例

- 📝 **使用指南**
  - 快速开始文档（包含安装、引入、使用步骤）
  - Tailwind CSS 使用指南（基础使用、响应式设计、混合使用策略、自定义主题）
  - 样式系统选择说明

- 📝 **项目文档**
  - README.md：项目介绍、特性、安装、使用、贡献指南
  - CHANGELOG.md：版本历史记录
  - LICENSE：MIT 许可证

#### 开发工具

- 🛠️ **完整的开发环境配置**
  - TypeScript 5.6+ 支持
  - ESLint 9.x 代码规范（Flat Config）
  - Prettier 代码格式化
  - Vitest 单元测试框架
  - Vite 5.x 构建工具
  - Vue 3.5+ 支持

- 🧪 **单元测试**
  - Button 组件测试
  - Grid 组件测试（TmlRow 和 TmlCol）
  - 测试覆盖率报告

#### 构建与发布

- 📦 **构建系统**
  - Vite 构建配置
  - 类型声明文件自动生成（.d.ts）
  - ES Module (ESM) 输出格式
  - 支持按需引入
  - 自动外部化依赖（Vue、Tailwind CSS）

- 📦 **NPM 包发布**
  - 包名：`tml-ui`
  - 版本：1.0.0
  - 支持 npm 安装
  - 完整的 package.json 配置
  - 导出 TypeScript 类型定义

### Changed

- 🔧 样式系统现在支持两种方案：
  - **Tailwind CSS**（推荐）：utility-first CSS 框架
  - **CSS 变量**：传统的变量系统

### Technical Stack

- **框架**: Vue 3.5.13
- **语言**: TypeScript 5.7.2
- **构建工具**: Vite 6.0.3
- **测试框架**: Vitest 2.1.8
- **样式方案**: Tailwind CSS 3.4.17 + CSS 变量
- **代码规范**: ESLint 9.17.0
- **包管理器**: npm

### Breaking Changes

- 无（首次正式版本发布）

### Migration Guide

- 如果从 0.1.0 升级到 1.0.0，需要注意：
  - 新增了 TmlRow/TmlCol 和 TmlWaterfall 组件
  - 新增了 Tailwind CSS 支持
  - 组件导出方式保持不变

[1.0.0]: https://github.com/Time-Machine-Lab/TML-UI/releases/tag/v1.0.0
