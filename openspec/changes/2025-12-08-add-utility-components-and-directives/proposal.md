# 提案：调整项目目录结构以支持工具组件和自定义指令

**日期**: 2025-12-08  
**状态**: 提议中  
**类型**: 项目结构优化

## 概述

调整 TmlUI 组件库的项目目录结构，为未来添加工具型组件、表单验证组件和自定义指令预留空间。本次调整仅涉及目录结构的创建和组织，不包括具体组件的实现。

## 背景与动机

当前 TmlUI 的目录结构主要支持基础 UI 组件（如 Button）。为了使项目更具扩展性，能够容纳更多类型的功能模块，我们需要：

1. **规划工具组件目录**：为瀑布流、虚拟滚动等复杂组件预留位置
2. **建立表单系统目录**：为表单组件和验证系统提供独立的模块空间
3. **创建指令目录**：统一管理自定义 Vue 指令
4. **添加 Composables 和 Utils 目录**：为可组合函数和工具函数提供标准化位置

这次目录调整将为项目的长期发展奠定良好的基础架构。

## 目标

- ✅ 创建清晰的目录结构，支持不同类型的功能模块
- ✅ 建立统一的命名和组织规范
- ✅ 更新入口文件以支持新的目录结构
- ✅ 确保目录结构具有良好的可扩展性
- ✅ 不影响现有代码的正常运行

## 技术方案

### 1. 新增目录结构

```
src/
├── components/           # UI 组件
│   └── button/          # 现有按钮组件
│
├── form/                # 表单系统（新增目录）
│   └── .gitkeep         # 保持目录存在
│
├── directives/          # 自定义指令（新增目录）
│   └── index.ts         # 指令注册入口（空实现）
│
├── composables/         # 可组合函数（新增目录）
│   └── index.ts         # Composables 导出入口（空实现）
│
├── utils/               # 工具函数（新增目录）
│   └── index.ts         # 工具函数导出入口（空实现）
│
└── styles/              # 样式文件
    ├── base.css
    └── variables.css
```

### 2. 测试目录结构

```
tests/
├── button.spec.ts       # 现有测试
├── form/                # 表单测试目录（新增）
│   └── .gitkeep
├── directives/          # 指令测试目录（新增）
│   └── .gitkeep
├── composables/         # Composables 测试目录（新增）
│   └── .gitkeep
└── utils/               # 工具函数测试目录（新增）
    └── .gitkeep
```

### 3. 文档目录结构

```
docs/
├── index.md
├── guide/
│   ├── index.md
│   └── quick-start.md
└── components/
    └── button.md
```

（文档目录暂不调整，待具体组件实现时再添加对应文档）

### 2. 目录命名规范

#### 2.1 组件目录
- 位置：`src/components/`
- 命名：`{component-name}/`（kebab-case）
- 示例：`button/`, `waterfall/`, `virtual-list/`

#### 2.2 表单目录
- 位置：`src/form/`
- 用途：存放表单相关组件、验证器、Composables
- 子目录：按功能模块划分（如 `form/`, `validators/`, `composables/`）

#### 2.3 指令目录
- 位置：`src/directives/`
- 命名：`v-{directive-name}/`
- 示例：`v-lazy/`, `v-loading/`, `v-debounce/`

#### 2.4 Composables 目录
- 位置：`src/composables/`
- 命名：`use{ComposableName}/`（PascalCase）
- 示例：`useDebounce/`, `useThrottle/`, `useIntersectionObserver/`

#### 2.5 工具函数目录
- 位置：`src/utils/`
- 命名：功能描述性文件名（kebab-case）
- 示例：`dom.ts`, `validators.ts`, `format.ts`

### 3. 入口文件调整

创建空的入口文件以支持新的目录结构：

#### `src/directives/index.ts`（新增）
```typescript
// 自定义指令注册入口
// 暂无指令实现，保留空导出以支持未来扩展

export default {}
```

#### `src/composables/index.ts`（新增）
```typescript
// Composables 导出入口
// 暂无 Composable 实现，保留空导出以支持未来扩展

export {}
```

#### `src/utils/index.ts`（新增）
```typescript
// 工具函数导出入口
// 暂无工具函数实现，保留空导出以支持未来扩展

export {}
```

#### `src/index.ts`（保持不变）
当前入口文件保持原样，不做修改：
```typescript
import { App } from 'vue'
import TmlButton from './components/button'
import './styles/variables.css'
import './styles/base.css'

const components = [TmlButton]

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name || 'TmlButton', component)
  })
}

export { TmlButton }
export type { ButtonProps, ButtonEmits } from './components/button/tml-button.vue'

export default {
  install
}
```

## 实施计划

### 阶段 1：创建目录结构（预计 1 天）

#### 步骤 1.1：创建源码目录
- [ ] 创建 `src/form/` 目录并添加 `.gitkeep`
- [ ] 创建 `src/directives/` 目录并添加 `index.ts`
- [ ] 创建 `src/composables/` 目录并添加 `index.ts`
- [ ] 创建 `src/utils/` 目录并添加 `index.ts`

#### 步骤 1.2：创建测试目录
- [ ] 创建 `tests/form/` 目录并添加 `.gitkeep`
- [ ] 创建 `tests/directives/` 目录并添加 `.gitkeep`
- [ ] 创建 `tests/composables/` 目录并添加 `.gitkeep`
- [ ] 创建 `tests/utils/` 目录并添加 `.gitkeep`

#### 步骤 1.3：验证项目正常运行
- [ ] 运行 `npm run dev` 确保开发服务器正常启动
- [ ] 运行 `npm run build` 确保构建成功
- [ ] 运行 `npm run test` 确保测试通过
- [ ] 运行 `npm run type-check` 确保类型检查通过

### 阶段 2：文档更新（预计 0.5 天）
- [ ] 更新 `README.md`，说明新的目录结构
- [ ] 在 `openspec/project.md` 中记录目录结构规范（如需要）

## 文档更新

需要更新以下文档：

1. **README.md**: 添加目录结构说明部分
2. **openspec/project.md**: 记录目录组织规范和命名约定（可选）

## 风险与挑战

1. **构建配置兼容性**: 需要确保新的目录结构不影响 Vite 和 TypeScript 的构建配置
2. **Git 空目录**: 空目录需要添加 `.gitkeep` 文件才能被 Git 跟踪
3. **导入路径**: 虽然暂时为空实现，但需要确保入口文件的导出语法正确

## 成功指标

- ✅ 所有新目录成功创建并被 Git 跟踪
- ✅ 开发服务器（`npm run dev`）正常运行
- ✅ 构建命令（`npm run build`）成功执行
- ✅ 类型检查（`npm run type-check`）无错误
- ✅ 现有测试全部通过

## 备选方案

如果需要更灵活的目录组织，可以考虑：

1. **扁平化结构**: 将所有组件放在 `src/components/` 下，不区分基础组件和工具组件
2. **插件化目录**: 每个大的功能模块（如表单系统）作为独立的子包，使用 monorepo 管理
3. **延迟创建**: 仅在需要时创建对应目录，而不是一次性创建所有目录

## 讨论与反馈

请团队成员在以下方面提供反馈：

1. 目录结构的组织方式是否合理？
2. 命名规范是否清晰易懂？
3. 是否需要调整或添加其他目录？
4. 是否有更好的目录组织方案？

## 后续计划

目录结构创建完成后，可以按需进行以下工作：

1. 在 `src/components/` 下添加工具组件（瀑布流、虚拟滚动等）
2. 在 `src/form/` 下实现表单系统
3. 在 `src/directives/` 下实现自定义指令
4. 在 `src/composables/` 下添加可组合函数
5. 在 `src/utils/` 下添加工具函数

---

**提案人**: GitHub Copilot  
**审核人**: 待指定  
**最后更新**: 2025-12-08
