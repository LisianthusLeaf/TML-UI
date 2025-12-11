# Change: Add Upload Functionality

**Change ID:** `add-upload-functionality`  
**Status:** ✅ Completed  
**Created:** 2025-12-11  
**Completed:** 2025-12-11  
**Author:** AI Assistant

## Why

当前项目缺少文件上传相关的功能。在实际开发中，文件上传的方式多种多样：
- 直接使用原生 `<input type="file">`
- 使用第三方 UI 库的上传组件（如 Vuetify 的 `<v-file-input>`、Element Plus 的 `<el-upload>` 等）
- 通过按钮点击事件触发 `input.click()` 来编程式选择文件

目前缺少一个通用的解决方案来统一处理文件验证（大小、类型），需要在不同场景下重复编写验证逻辑。`v-upload` 指令将提供一个统一的、与组件无关的文件验证层，带来以下好处：

- **统一验证逻辑**：一个指令适配所有场景，无需重复代码
- **增强用户体验**：前端及时验证文件，避免不必要的上传尝试
- **组件无关**：不绑定特定 UI 库，可与任何组件或元素配合使用
- **声明式使用**：通过指令在模板中声明验证规则，代码简洁
- **灵活配置**：支持文件大小、类型、数量等多种验证选项

## What Changes

- **新增指令**: `v-upload` - 通用文件上传验证指令
- **新增目录**: `src/directives/upload/` - 指令实现和工具函数
- **新增类型**: TypeScript 类型定义（UploadOptions、UploadError 等）
- **新增文档**: `docs/directives/upload.md` - 指令使用文档
- **更新导出**: 在 `src/directives/index.ts` 和 `src/index.ts` 中导出指令

## Impact

- **新增能力**: 
  - `upload-directive` - 文件上传验证指令
- **影响范围**: 
  - 指令系统（新增 v-upload）
  - 类型系统（新增上传相关类型定义）
  - 文档系统（新增指令文档）
- **依赖项**: 无，使用原生 File API
- **兼容性**: 仅支持现代浏览器（Chrome、Firefox、Safari、Edge 最新两个版本）
- **破坏性变更**: 无

---

## 详细说明

`v-upload` 指令通过以下策略实现通用适配：

1. **自动检测场景**：指令会检测绑定的元素类型
   - 原生 `<input type="file">`: 直接监听 `change` 事件
   - 第三方组件: 查找内部的 `<input type="file">` 元素并监听
   - 普通按钮: 检测点击事件，拦截并创建隐藏的 file input

2. **文件验证**：在文件选择后立即验证
   - 验证文件大小
   - 验证文件类型（MIME type）
   - 验证通过触发 `upload-success` 事件
   - 验证失败触发 `upload-error` 事件并阻止后续流程

3. **事件传递**：保持原有组件的事件流
   - 验证通过时，允许事件继续传播
   - 验证失败时，阻止事件传播并清空 input value

### 使用场景

#### 场景 1: 原生 input 元素
```vue
<template>
  <input 
    type="file" 
    v-upload="4096"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  />
</template>
```

#### 场景 2: 第三方组件库（Vuetify）
```vue
<template>
  <v-file-input
    v-upload="4096"
    label="上传文件"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  />
</template>
```

#### 场景 3: Element Plus
```vue
<template>
  <el-upload
    v-upload="{ maxSize: 4096, accept: ['image/*'] }"
    action="/upload"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  >
    <el-button>点击上传</el-button>
  </el-upload>
</template>
```

#### 场景 4: 编程式触发（普通按钮）
```vue
<template>
  <!-- 指令会自动创建隐藏的 file input 并处理点击事件 -->
  <button 
    v-upload="4096"
    @upload-success="handleUpload"
    @upload-error="handleError"
  >
    选择文件
  </button>
</template>

<script setup>
const handleUpload = (files) => {
  // files 是通过验证的 FileList
  console.log('选择的文件:', files)
}
</script>
```

#### 场景 5: 配置对象用法
```vue
<template>
  <input 
    type="file" 
    v-upload="{
      maxSize: 4096,           // 最大 4MB
      accept: ['image/*'],      // 只接受图片
      multiple: true,          // 允许多选
      maxFiles: 5              // 最多 5 个文件
    }"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  />
</template>
```

### 技术实现要点

1. **元素类型检测**
```typescript
// 检测是否为原生 input
if (el.tagName === 'INPUT' && el.type === 'file') {
  // 直接绑定
}
// 检测是否为组件（查找内部 input）
else if (el.querySelector('input[type="file"]')) {
  // 绑定到内部 input
}
// 普通元素（按钮等）
else {
  // 创建隐藏 input 并处理点击
}
```

2. **文件验证逻辑**
```typescript
const validateFiles = (files: FileList, options) => {
  for (const file of files) {
    // 验证大小
    if (options.maxSize && file.size > options.maxSize * 1024) {
      return { valid: false, error: 'FILE_TOO_LARGE', file }
    }
    // 验证类型
    if (options.accept && !matchMimeType(file.type, options.accept)) {
      return { valid: false, error: 'INVALID_TYPE', file }
    }
  }
  return { valid: true }
}
```

3. **事件拦截与传递**
```typescript
// 拦截原始 change 事件
const handleChange = (e: Event) => {
  const result = validateFiles(e.target.files, options)
  if (result.valid) {
    el.dispatchEvent(new CustomEvent('upload-success', { 
      detail: e.target.files 
    }))
  } else {
    e.stopPropagation()
    e.preventDefault()
    e.target.value = '' // 清空选择
    el.dispatchEvent(new CustomEvent('upload-error', { 
      detail: result 
    }))
  }
}
```

## Affected Components

### New Capabilities

- **upload-directive**: `v-upload` 指令实现，提供通用文件验证功能

### Modified Capabilities

无现有功能受影响

## Open Questions

1. 对于第三方组件，如果内部 input 是动态创建的，如何确保指令正确绑定？
2. 是否需要提供全局配置来设置默认的文件大小限制？
3. 错误信息是否需要支持国际化？
4. 是否需要提供错误信息的自定义模板？

## Success Metrics

- 所有三种使用方式（指令、组件、composable）都能正常工作
- 文件大小和类型验证准确无误
- 错误处理清晰明确
- 文档和示例完整
- 测试覆盖率 ≥ 80%

## Dependencies

无外部依赖，使用原生 File API

## Timeline

预计 1-2 天完成开发和测试

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 不同浏览器的 File API 兼容性 | 中 | 只支持现代浏览器，文档明确说明浏览器要求 |
| 第三方组件集成复杂性 | 中 | 提供详细的集成指南和示例 |
| 文件验证可能被绕过 | 低 | 文档说明这只是前端验证，服务端必须再次验证 |

## Alternatives Considered

### 方案 1: 提供独立的上传组件
**优点**：完整的 UI 和交互，开箱即用  
**缺点**：
- 无法适配第三方组件库
- 用户被限制在固定的 UI 样式中
- 与项目中已有的组件库产生冲突

**决定**：不采用，指令方式更灵活

### 方案 2: 使用 Composable 而不是指令
**优点**：更符合 Vue 3 的组合式 API 理念  
**缺点**：
- 使用复杂，需要手动绑定事件和元素
- 无法声明式地在模板中使用
- 对于简单场景过于繁琐

**决定**：不采用，但可以作为指令的内部实现

### 方案 3: 仅验证文件大小，不拦截事件
**优点**：实现简单，不影响原有流程  
**缺点**：
- 无法真正阻止不合法文件的上传
- 需要用户在多个地方处理验证结果
- 用户体验不好

**决定**：不采用，必须能够拦截和阻止不合法文件

## Approval

- [ ] Technical Lead Review
- [ ] Architecture Review
- [ ] Security Review (if applicable)
- [ ] Documentation Review
