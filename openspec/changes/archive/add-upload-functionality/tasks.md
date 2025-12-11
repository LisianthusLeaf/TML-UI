# Tasks: Add Upload Functionality

**Change ID:** `add-upload-functionality`  
**Status:** ✅ Completed

## Implementation Checklist

### Phase 1: Core Infrastructure
- [x] 创建 `src/directives/upload/` 目录结构
- [x] 定义 TypeScript 类型和接口
  - [x] UploadOptions 配置接口
  - [x] UploadError 错误类型
  - [x] UploadEventDetail 事件详情类型

### Phase 2: File Validation Utilities
- [x] 实现文件验证工具函数
  - [x] `validateFileSize`: 验证文件大小
  - [x] `validateFileType`: 验证文件类型（MIME type）
  - [x] `validateFiles`: 批量验证文件
  - [x] `matchMimeType`: MIME type 匹配工具
- [x] 编写工具函数单元测试

### Phase 3: Directive Core Implementation
- [x] 实现 `v-upload` 指令核心逻辑
  - [x] 元素类型检测（原生 input / 组件 / 普通元素）
  - [x] 配置解析（支持数字和对象参数）
  - [x] 生命周期钩子（mounted, updated, unmounted）

### Phase 4: Scenario 1 - Native Input Support
- [x] 实现原生 `<input type="file">` 支持
  - [x] 监听 change 事件
  - [x] 文件验证
  - [x] 触发自定义事件（upload-success / upload-error）
  - [x] 验证失败时清空 input value
- [x] 编写原生 input 场景测试

### Phase 5: Scenario 2 - Third-party Component Support
- [x] 实现第三方组件适配
  - [x] 查找组件内部的 `<input type="file">` 元素
  - [x] 处理异步渲染的 input（使用 MutationObserver）
  - [x] 绑定事件监听器到内部 input
  - [x] 支持常见组件库（Vuetify、Element Plus 等）
- [x] 编写第三方组件场景测试

### Phase 6: Scenario 3 - Programmatic Upload Support
- [x] 实现普通按钮的编程式上传
  - [x] 创建隐藏的 file input 元素
  - [x] 监听按钮点击事件
  - [x] 触发隐藏 input 的 click
  - [x] 处理文件选择和验证
  - [x] 支持配置选项（accept、multiple）
- [x] 编写编程式上传场景测试

### Phase 7: Error Handling & Events
- [x] 实现完整的错误处理机制
  - [x] 定义错误类型（FILE_TOO_LARGE、INVALID_TYPE、TOO_MANY_FILES）
  - [x] 生成详细的错误信息
  - [x] 触发 CustomEvent 传递错误详情
- [x] 实现事件拦截和传递逻辑
  - [x] 验证失败时阻止事件传播
  - [x] 验证成功时允许事件继续
- [x] 编写事件处理测试

### Phase 8: Integration & Export
- [x] 更新 `src/directives/upload/index.ts` 导出指令
- [x] 更新 `src/directives/index.ts` 导出 v-upload
- [x] 更新 `src/index.ts` 统一导出
- [x] 确保全局注册时指令可用

### Phase 9: Documentation
- [x] 创建 `docs/directives/upload.md` 指令文档
  - [x] 基础用法（原生 input）
  - [x] 第三方组件用法（Vuetify、Element Plus 示例）
  - [x] 编程式触发用法（普通按钮）
  - [x] 配置选项完整说明
  - [x] 事件说明（upload-success、upload-error）
  - [x] 错误类型说明
  - [x] 最佳实践和注意事项
- [x] 更新 VitePress 配置添加新文档页面

### Phase 10: Testing & Validation
- [x] 运行所有单元测试确保通过
- [x] 手动测试各种使用场景
  - [x] 原生 input 文件上传
  - [x] Vuetify v-file-input（如果可用）
  - [x] Element Plus el-upload（如果可用）
  - [x] 普通按钮编程式上传
  - [x] 文件大小验证
  - [x] 文件类型验证
  - [x] 多文件上传验证
  - [x] 错误处理
- [x] 测试覆盖率检查（目标 ≥ 80%）
- [x] ESLint 检查
- [x] TypeScript 类型检查

### Phase 11: Examples & Demo
- [x] 在 `src/App.vue` 中添加演示示例
- [x] 创建完整的示例场景
  - [x] 原生 input 示例
  - [x] 第三方组件示例（使用注释说明如何集成）
  - [x] 编程式上传示例
  - [x] 图片上传示例（带预览）
  - [x] 文档上传示例
  - [x] 多文件上传示例
  - [x] 错误处理示例

## Definition of Done

- [x] 所有代码实现完成并符合项目规范
- [x] 支持原生 input、第三方组件、编程式触发三种场景
- [x] 所有单元测试通过，覆盖率 ≥ 80%
- [x] 文档完整，包含所有使用场景和示例
- [x] 示例代码可运行且功能正常
- [x] 代码审查通过
- [x] 无 ESLint 错误或警告
- [x] TypeScript 无类型错误

## Notes

### 配置选项
- `maxSize`: 最大文件大小（KB），如 4096 表示 4MB
- `accept`: 允许的文件类型（MIME type 数组或通配符），如 `['image/*']`
- `multiple`: 是否允许多文件选择（默认 false）
- `maxFiles`: 最多允许选择的文件数量（仅在 multiple 为 true 时有效）

### 事件定义
- `upload-success`: 文件验证通过
  - `detail`: FileList 或 File[]
- `upload-error`: 文件验证失败
  - `detail.error`: 错误类型（FILE_TOO_LARGE | INVALID_TYPE | TOO_MANY_FILES）
  - `detail.file`: 导致错误的文件
  - `detail.message`: 错误描述信息

### 错误类型
- `FILE_TOO_LARGE`: 文件大小超过限制
- `INVALID_TYPE`: 文件类型不匹配
- `TOO_MANY_FILES`: 文件数量超过限制

### 实现注意事项
- 必须正确处理事件冒泡和传播
- 验证失败后必须清空 input value，防止用户无法重新选择相同文件
- 对于第三方组件，需要使用 MutationObserver 监听 DOM 变化
- 隐藏 input 必须正确设置 accept 和 multiple 属性
- 所有文件大小计算使用字节，配置使用 KB
