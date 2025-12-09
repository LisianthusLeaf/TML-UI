# 更新日志

TML-UI 遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

完整的更新日志请查看 [GitHub Releases](https://github.com/Time-Machine-Lab/TML-UI/releases) 或项目根目录的 [CHANGELOG.md](https://github.com/Time-Machine-Lab/TML-UI/blob/main/CHANGELOG.md)。

## 版本历史

### v1.0.0 (2025-12-09)

🎉 **首个正式版本发布！**

#### 核心组件

- **TmlButton** - 功能完善的按钮组件
  - 5 种按钮类型（default, primary, success, warning, danger）
  - 3 种尺寸（small, medium, large）
  - 支持禁用和加载状态
  - 完整的 TypeScript 支持

- **TmlRow / TmlCol** - 强大的响应式栅格系统
  - 基于 24 栏布局
  - 支持 5 个响应式断点（sm, md, lg, xl, xxl）
  - 灵活的间距和对齐配置
  - 支持列偏移和排序

- **TmlWaterfall** - 高性能瀑布流布局
  - 自适应列数计算
  - 自动监听内容变化
  - 支持无限滚动
  - 性能优化（transform 定位、事件节流）

#### 样式系统

- **Tailwind CSS 集成**
  - 完整的 Tailwind CSS v3.4 支持
  - 与 CSS 变量系统无缝集成
  - 响应式设计支持

- **CSS 变量系统**
  - 完整的设计 token
  - 支持主题定制

#### 文档与工具

- 完善的组件文档（API、示例、最佳实践）
- 详细的使用指南
- TypeScript 类型定义
- 单元测试覆盖
- 完整的开发环境配置

#### 技术栈

- Vue 3.5.13
- TypeScript 5.7.2
- Vite 6.0.3
- Tailwind CSS 3.4.17
- Vitest 2.1.8

---

### v0.1.0 (2025-12-08)

初始版本，包含基础的 Button 组件和项目架构。

---

## 如何升级

### 从 0.1.0 升级到 1.0.0

1. 更新依赖：
```bash
npm install tml-ui@latest
```

2. 主要变更：
   - ✅ 新增 `TmlRow` / `TmlCol` 栅格组件
   - ✅ 新增 `TmlWaterfall` 瀑布流组件
   - ✅ 新增 Tailwind CSS 支持（可选）
   - ✅ 组件 API 保持向后兼容

3. 无需代码修改：
   - 如果你只使用了 `TmlButton` 组件，无需修改任何代码
   - 新增的组件和功能都是增量更新

4. 可选升级：
   - 如果希望使用 Tailwind CSS，参考 [Tailwind CSS 使用指南](./tailwind.md)

## 发布说明

### 发布周期

- **主版本（Major）**: 包含破坏性变更，发布时会提供详细的迁移指南
- **次版本（Minor）**: 新增功能，保持向后兼容
- **修订版本（Patch）**: Bug 修复和性能优化

### 支持政策

- **最新版本**: 持续维护和更新
- **前一个主版本**: 提供 6 个月的安全更新

### 版本规范

TML-UI 遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/) 规范：

- **主版本号（Major）**: 当你做了不兼容的 API 修改
- **次版本号（Minor）**: 当你做了向下兼容的功能性新增
- **修订号（Patch）**: 当你做了向下兼容的问题修正

## 贡献更新日志

如果你提交了 Pull Request，请在合并前更新 CHANGELOG.md：

1. 在 `[Unreleased]` 部分添加你的更改
2. 使用以下分类：
   - `Added` - 新增功能
   - `Changed` - 功能变更
   - `Deprecated` - 即将废弃的功能
   - `Removed` - 已移除的功能
   - `Fixed` - Bug 修复
   - `Security` - 安全性修复

3. 使用清晰的描述，包含：
   - 🎯 **做了什么**: 简洁描述变更内容
   - 💡 **为什么**: 说明变更原因（如果不明显）
   - 📝 **如何使用**: 提供使用示例（新功能）

示例：
```markdown
### Added
- ✨ 新增 `TmlButton` 的 `round` 属性，支持圆角按钮样式
```

## 订阅更新

- ⭐ 在 [GitHub](https://github.com/Time-Machine-Lab/TML-UI) 上 Star 项目以关注更新
- 👀 Watch 项目以接收版本发布通知
- 📢 加入我们的社区讨论最新功能

## 问题反馈

如果在升级过程中遇到问题：

1. 查看 [GitHub Issues](https://github.com/Time-Machine-Lab/TML-UI/issues)
2. 搜索是否有类似问题
3. 如果没有，创建新 Issue 并提供：
   - 当前版本号
   - 升级到的版本号
   - 详细的错误信息
   - 最小可复现示例
