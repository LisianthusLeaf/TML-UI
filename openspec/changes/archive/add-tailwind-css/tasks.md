# Implementation Tasks

**Change ID:** `add-tailwind-css`

## 任务清单

### Phase 1: 安装和基础配置

- [x] **1.1** 安装 Tailwind CSS 相关依赖
  - 安装 `tailwindcss`, `postcss`, `autoprefixer`
  - 运行 `npm install -D tailwindcss@^3.4.0 postcss autoprefixer`

- [x] **1.2** 初始化 Tailwind 配置文件
  - 创建 `tailwind.config.js`
  - 配置 `content` 路径（扫描 src/ 和 docs/ 目录）
  - 配置 `theme.extend` 集成 CSS 变量

- [x] **1.3** 创建 PostCSS 配置文件
  - 创建 `postcss.config.js`
  - 配置 `tailwindcss` 和 `autoprefixer` 插件

### Phase 2: 样式系统集成

- [x] **2.1** 更新样式入口文件
  - 修改 `src/styles/base.css`
  - 添加 Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
  - 确保现有 CSS 变量在 Tailwind directives 之后

- [x] **2.2** 配置 Tailwind 主题扩展
  - 在 `tailwind.config.js` 中映射 CSS 变量到 Tailwind theme
  - 配置品牌颜色（primary, success, warning, danger, info）
  - 配置圆角、间距等设计 token

- [x] **2.3** 验证 Vite 配置
  - 确认 Vite 正确处理 PostCSS（默认支持）
  - 测试开发服务器和构建流程

### Phase 3: 文档和示例

- [x] **3.1** 创建 Tailwind 使用指南
  - 创建 `docs/guide/tailwind.md`
  - 说明 Tailwind 和 CSS 变量的混合使用策略
  - 提供常见场景的代码示例

- [x] **3.2** 更新快速开始文档
  - 修改 `docs/guide/quick-start.md`
  - 说明两种样式方案的选择（Tailwind vs 纯 CSS）

- [x] **3.3** 添加示例组件（可选）
  - 创建使用 Tailwind 的示例组件
  - 展示最佳实践

### Phase 4: 验证和测试

- [x] **4.1** 开发环境测试
  - 启动 `npm run dev`，验证 Tailwind 类生效
  - 测试热更新功能
  - 检查控制台无报错

- [x] **4.2** 构建测试
  - 运行 `npm run build`，检查构建成功
  - 验证打包产物包含正确的 Tailwind 样式
  - 确认未使用的样式被 PurgeCSS 移除

- [x] **4.3** 文档站点测试
  - 启动 `npm run docs:dev`，验证文档样式正常
  - 构建文档 `npm run docs:build`，检查产物

- [x] **4.4** 兼容性测试
  - 验证现有 Button 组件样式不受影响
  - 测试 CSS 变量主题切换功能
  - 确保所有测试用例通过（15/15 通过）

### Phase 5: 最终验收

- [x] **5.1** 代码审查
  - 检查所有配置文件格式正确
  - 确认文档完整准确
  - 代码符合项目规范

- [x] **5.2** 更新 CHANGELOG
  - 记录 Tailwind CSS 集成变更
  - 说明影响范围和使用方式

- [x] **5.3** 完成提案验证
  - 运行 `openspec validate add-tailwind-css --strict`
  - 解决所有验证问题

## 实施注意事项

### 关键点

1. **保持向后兼容**：现有 CSS 变量系统不受影响
2. **渐进式采用**：开发者可选择使用 Tailwind
3. **配置正确**：确保 content 路径包含所有需要扫描的文件
4. **主题一致性**：Tailwind 主题与 CSS 变量保持映射关系

### 常见问题

- **样式不生效**：检查 `content` 配置是否包含所有文件路径
- **构建体积大**：确认 PurgeCSS 正常工作（生产环境自动启用）
- **热更新问题**：重启开发服务器，清除缓存

### 参考资源

- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
- [Using with Vite](https://tailwindcss.com/docs/guides/vite)
- [Theme Configuration](https://tailwindcss.com/docs/theme)
