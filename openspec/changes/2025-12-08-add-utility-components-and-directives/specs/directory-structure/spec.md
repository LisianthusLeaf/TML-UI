# 规格：目录结构调整

**版本**: 1.0  
**状态**: 草案  
**创建日期**: 2025-12-08

## 概述

为 TmlUI 项目创建基础目录结构，以支持未来添加工具组件、表单系统和自定义指令。本规格仅涉及目录的创建和占位文件，不包括具体组件的实现。

## 新增目录结构

```
src/
├── components/           # UI 组件
│   └── button/          # 按钮组件（现有）
│
├── form/                # 表单系统（新增）
│   └── .gitkeep         # 占位文件，保持目录被 Git 跟踪
│
├── directives/          # 自定义指令（新增）
│   └── index.ts         # 指令注册入口（空实现）
│
├── composables/         # 可组合函数（新增）
│   └── index.ts         # Composables 导出入口（空实现）
│
├── utils/               # 工具函数（新增）
│   └── index.ts         # 工具函数导出入口（空实现）
│
└── styles/              # 样式文件
    ├── base.css         # 基础样式（现有）
    └── variables.css    # CSS 变量（现有）
```

### 说明

- **form/**: 未来用于存放表单相关组件和验证系统，当前仅创建目录
- **directives/**: 用于存放自定义 Vue 指令，提供空的 index.ts 以支持导入
- **composables/**: 用于存放可组合函数，提供空的 index.ts 以支持导入
- **utils/**: 用于存放工具函数，提供空的 index.ts 以支持导入
- **components/**: 保持现有结构，未来可在此添加工具组件

## 测试目录结构

```
tests/
├── button.spec.ts       # 按钮测试（现有）
├── form/                # 表单测试目录（新增）
│   └── .gitkeep
├── directives/          # 指令测试目录（新增）
│   └── .gitkeep
├── composables/         # Composables 测试目录（新增）
│   └── .gitkeep
└── utils/               # 工具函数测试目录（新增）
    └── .gitkeep
```

### 说明

使用 `.gitkeep` 文件确保空目录被 Git 跟踪，为未来的测试文件预留位置。

## 目录创建步骤

### 步骤 1：创建源码目录

```powershell
# 创建表单目录
New-Item -ItemType Directory -Path "src/form"
New-Item -ItemType File -Path "src/form/.gitkeep"

# 创建指令目录
New-Item -ItemType Directory -Path "src/directives"

# 创建 composables 目录
New-Item -ItemType Directory -Path "src/composables"

# 创建工具函数目录
New-Item -ItemType Directory -Path "src/utils"
```

### 步骤 2：创建入口文件

创建 `src/directives/index.ts`：
```typescript
// 自定义指令注册入口
// 暂无指令实现，保留空导出以支持未来扩展

export default {}
```

创建 `src/composables/index.ts`：
```typescript
// Composables 导出入口
// 暂无 Composable 实现，保留空导出以支持未来扩展

export {}
```

创建 `src/utils/index.ts`：
```typescript
// 工具函数导出入口
// 暂无工具函数实现，保留空导出以支持未来扩展

export {}
```

### 步骤 3：创建测试目录

```powershell
# 创建测试子目录
New-Item -ItemType Directory -Path "tests/form"
New-Item -ItemType File -Path "tests/form/.gitkeep"

New-Item -ItemType Directory -Path "tests/directives"
New-Item -ItemType File -Path "tests/directives/.gitkeep"

New-Item -ItemType Directory -Path "tests/composables"
New-Item -ItemType File -Path "tests/composables/.gitkeep"

New-Item -ItemType Directory -Path "tests/utils"
New-Item -ItemType File -Path "tests/utils/.gitkeep"
```

### 步骤 4：验证

```powershell
# 验证项目可以正常运行
npm run dev
npm run build
npm run test
npm run type-check
```

## 入口文件说明

### src/index.ts（保持不变）

当前入口文件无需修改，保持原有实现：

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

### 新增入口文件

详见"目录创建步骤"中的步骤 2，创建以下空实现的入口文件：
- `src/directives/index.ts`
- `src/composables/index.ts`
- `src/utils/index.ts`

## 命名规范

### 目录命名
- **组件目录**: `{component-name}/`（kebab-case）
- **指令目录**: `v-{directive-name}/`（kebab-case）
- **Composables 目录**: `use{ComposableName}/`（PascalCase）
- **工具函数文件**: `{function-name}.ts`（kebab-case）

### 文件命名
- **组件文件**: `tml-{component-name}.vue`
- **TypeScript 文件**: `{name}.ts`
- **类型定义文件**: `types.ts`
- **入口文件**: `index.ts`

### 占位文件
- 空目录使用 `.gitkeep` 文件确保被 Git 跟踪
- 空的入口文件使用 `export {}` 或 `export default {}` 占位

## 注意事项

1. **Git 跟踪**: 使用 `.gitkeep` 文件确保空目录被 Git 跟踪
2. **空实现**: 入口文件虽然为空，但必须保证语法正确，避免导入错误
3. **不破坏现有代码**: 新增目录和文件不应影响现有功能的正常运行
4. **验证步骤**: 每次修改后都要运行 dev、build、test 命令验证
5. **渐进式**: 目录结构创建完成后，可以按需逐步添加具体实现

## 预期效果

完成本规格后，项目将具有：
- ✅ 清晰的目录组织结构
- ✅ 为未来功能预留的空间
- ✅ 不影响现有功能的正常运行
- ✅ 统一的命名和组织规范
- ✅ 良好的可扩展性

## 未来扩展方向

目录结构创建完成后，可以按需在各目录下添加具体实现：

1. **src/components/**: 添加工具组件（如 waterfall、virtual-list 等）
2. **src/form/**: 实现表单系统和验证器
3. **src/directives/**: 实现自定义指令（如 v-lazy、v-loading 等）
4. **src/composables/**: 添加可组合函数（如 useDebounce、useThrottle 等）
5. **src/utils/**: 添加工具函数（如 DOM 操作、验证函数等）

---

**版本历史**:
- v1.0 (2025-12-08): 初始版本，仅创建基础目录结构
