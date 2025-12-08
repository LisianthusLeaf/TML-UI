# Change: 初始化 Vue3 组件库项目

**Change ID:** `init-vue3-component-library`  
**Status:** Draft  
**Created:** 2025-12-08  
**Author:** AI Assistant

## Why

需要建立一个现代化的 Vue3 组件库开发环境，提供完整的开发工具链、示例组件和文档系统，为后续组件开发奠定基础。

## What Changes

- **新增项目配置**: package.json, tsconfig.json, vite.config.ts, eslint, prettier
- **新增项目结构**: src/components/, docs/, tests/ 目录
- **新增基础设施能力**: 构建系统、开发服务器、测试框架、文档系统
- **新增 Button 组件**: 包含完整实现、测试和文档的示例组件
- **新增开发脚本**: dev, build, test, docs:dev, docs:build, lint

## Impact

- **新增规范**: 
  - `component-library-infrastructure` - 项目基础设施能力
  - `button-component` - Button 组件能力
- **影响范围**: 全新项目，无现有代码影响
- **依赖项**: Vue 3.3+, Vite 5+, TypeScript 5+, Vitepress, Vitest

---

## 详细说明

### 项目目标

1. **建立项目基础架构**：配置 Vite、TypeScript、Vue3 的现代化开发环境
2. **提供开发工具**：集成代码规范、格式化、类型检查工具
3. **创建示例组件**：实现一个标准的 Button 组件作为模板
4. **搭建文档系统**：使用 Vitepress 提供组件文档和预览
5. **支持组件测试**：配置单元测试和组件测试环境

### 包含范围

### 包含内容

- **项目配置文件**
  - `package.json` - 项目依赖和脚本
  - `tsconfig.json` - TypeScript 配置
  - `vite.config.ts` - Vite 构建配置
  - `.eslintrc.js` - ESLint 代码规范
  - `.prettierrc` - Prettier 格式化配置
  - `vitest.config.ts` - 测试配置

- **项目结构**
  - `src/components/` - 组件源码目录
  - `src/styles/` - 全局样式目录
  - `docs/` - Vitepress 文档目录
  - `tests/` - 测试文件目录

- **示例组件**
  - Button 组件（包含 props、事件、插槽）
  - Button 组件的单元测试
  - Button 组件的文档和示例

- **开发脚本**
  - `npm run dev` - 启动开发服务器
  - `npm run build` - 构建组件库
  - `npm run docs:dev` - 启动文档服务器
  - `npm run docs:build` - 构建文档
  - `npm run test` - 运行测试
  - `npm run lint` - 代码检查

### 不包含内容

- 复杂的主题系统
- 国际化支持
- 服务端渲染配置
- CI/CD 配置
- npm 发布配置

## 技术决策

### 核心技术栈

- **Vue 3.3+** - 使用 Composition API 和 `<script setup>` 语法
- **TypeScript 5+** - 提供类型安全
- **Vite 5+** - 快速的构建工具
- **Vitepress** - 文档系统
- **Vitest** - 单元测试框架
- **Vue Test Utils** - 组件测试工具

### 代码规范

- **ESLint** - 使用 Vue3 推荐配置
- **Prettier** - 统一代码格式
- **命名约定**
  - 组件名：PascalCase（如 `TmlButton.vue`）
  - 文件名：kebab-case（如 `tml-button.vue`）
  - Props：camelCase
  - 事件：kebab-case

### 项目结构

```
TmlUI/
├── src/
│   ├── components/
│   │   └── button/
│   │       ├── tml-button.vue
│   │       └── index.ts
│   ├── styles/
│   │   └── base.css
│   └── index.ts
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── index.md
│   └── components/
│       └── button.md
├── tests/
│   └── button.spec.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 实施计划

参见 `tasks.md` 获取详细的实施检查清单。

## 影响分析

### 新增功能

- Vue3 组件库开发环境
- Button 组件示例
- 组件文档系统
- 测试框架

### 依赖项

**生产依赖**:
- vue@^3.3.0

**开发依赖**:
- vite@^5.0.0
- typescript@^5.0.0
- @vitejs/plugin-vue@^5.0.0
- vitepress@^1.0.0
- vitest@^1.0.0
- @vue/test-utils@^2.4.0
- eslint@^8.50.0
- prettier@^3.0.0

### 风险和缓解

**风险**：版本兼容性问题  
**缓解**：使用稳定版本的依赖，锁定主要版本号

**风险**：构建配置复杂度  
**缓解**：使用 Vite 默认配置，最小化自定义

## 验收标准

- [ ] 项目可以成功安装依赖
- [ ] 开发服务器可以正常启动（`npm run dev`）
- [ ] 组件库可以成功构建（`npm run build`）
- [ ] 文档可以正常访问（`npm run docs:dev`）
- [ ] Button 组件可以正常渲染
- [ ] Button 组件测试全部通过
- [ ] ESLint 检查无错误
- [ ] TypeScript 类型检查通过

## 后续工作

- 添加更多基础组件（Input、Select、Dialog 等）
- 实现主题定制系统
- 添加组件库 playground
- 配置 CI/CD 流程
- 准备 npm 发布配置

## 参考资料

- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vitepress 官方文档](https://vitepress.dev/)
- [Vue Test Utils 文档](https://test-utils.vuejs.org/)
