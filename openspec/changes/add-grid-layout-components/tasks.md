# Tasks: add-grid-layout-components

## Implementation Tasks

### Phase 1: 组件基础结构
- [x] 创建 `src/components/grid/` 目录
- [x] 创建 `src/components/grid/tml-row.vue` 文件
- [x] 创建 `src/components/grid/tml-col.vue` 文件
- [x] 创建 `src/components/grid/index.ts` 导出文件
- [x] 定义 TRow 和 TCol 的 TypeScript 类型定义

### Phase 2: TRow 组件开发
- [x] 实现 TRow 基础模板结构
- [x] 实现 `gutter` prop 功能(支持单个数字和数组形式)
- [x] 实现 `justify` prop 功能(水平对齐)
- [x] 实现 `align` prop 功能(垂直对齐)
- [x] 实现 `wrap` prop 功能(是否换行)
- [x] 添加 TRow 组件样式
- [x] 通过 CSS 变量或 provide/inject 向子组件传递 gutter 值

### Phase 3: TCol 组件开发
- [x] 实现 TCol 基础模板结构
- [x] 实现 `span` prop 功能(基础列宽)
- [x] 实现 `offset` prop 功能(左侧间隔)
- [x] 实现 `push` prop 功能(向右移动)
- [x] 实现 `pull` prop 功能(向左移动)
- [x] 实现响应式 props: `sm`, `md`, `lg`, `xl`, `xxl`
- [x] 生成动态 CSS 类名逻辑
- [x] 添加 TCol 组件样式

### Phase 4: 样式实现
- [x] 创建 `src/styles/grid.scss` 文件（使用 SCSS）
- [x] 实现基础栅格样式(24 列系统)
- [x] 实现响应式断点媒体查询(576px/768px/992px/1200px/1600px)
- [x] 实现 offset/push/pull 相关样式类
- [x] 实现 gutter 间距样式
- [x] 在 `src/styles/base.css` 中引入 grid.scss

### Phase 5: 类型定义和导出
- [x] 定义 `ColConfig` 接口类型
- [x] 定义 TRow Props 类型
- [x] 定义 TCol Props 类型
- [x] 在 `src/index.ts` 中导出 TRow 和 TCol 组件
- [x] 导出相关类型定义供外部使用

### Phase 6: 单元测试
- [x] 创建 `tests/grid/row.spec.ts` 测试文件
- [x] 编写 TRow 渲染测试
- [x] 编写 TRow gutter 功能测试
- [x] 编写 TRow justify/align 测试
- [x] 创建 `tests/grid/col.spec.ts` 测试文件
- [x] 编写 TCol 基础渲染测试
- [x] 编写 TCol span/offset/push/pull 测试
- [x] 编写响应式 props 测试
- [x] 编写嵌套栅格测试
- [x] 确保测试覆盖率 ≥ 80%

### Phase 7: 文档编写
- [x] 创建 `docs/components/grid.md` 文档文件
- [x] 编写组件概述和基本用法
- [x] 添加基础栅格示例
- [x] 添加栅格间距示例
- [x] 添加栅格偏移示例
- [x] 添加响应式布局示例
- [x] 添加对齐方式示例
- [x] 添加嵌套栅格示例
- [x] 添加常见布局模式示例(两栏/三栏/侧边栏等)
- [x] 添加 API 文档表格

### Phase 8: 集成和验证
- [x] 在示例应用中测试组件功能
- [x] 验证响应式断点在不同屏幕尺寸下的表现
- [x] 验证与其他组件的兼容性
- [x] 运行完整测试套件确保无回归
- [x] 执行 ESLint 检查
- [x] 执行 TypeScript 类型检查

## Testing Checklist
- [x] TRow 组件单元测试通过
- [x] TCol 组件单元测试通过
- [x] 响应式功能测试通过
- [x] 浏览器兼容性测试(Chrome/Firefox/Safari/Edge)
- [x] 代码覆盖率达到 80% 以上

## Documentation Checklist
- [x] API 文档完整
- [x] 至少包含 5 个实际使用示例
- [x] 包含响应式布局说明
- [x] 包含常见问题解答

## Code Quality Checklist
- [x] 代码符合项目编码规范
- [x] 通过 ESLint 检查
- [x] 通过 TypeScript 类型检查
- [x] 无 console 警告或错误
- [x] 组件 Props 有合理的默认值和类型验证
