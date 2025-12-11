# Spec: Upload Directive

**Capability:** upload-directive  
**Status:** New (ADDED)  
**Last Updated:** 2025-12-11

## Overview

`v-upload` 是一个通用的文件上传验证指令，能够自动适配各种文件上传场景：原生 input 元素、第三方 UI 库组件、以及通过 JavaScript 编程式触发的文件选择。

## ADDED Requirements

### Requirement: 基础指令定义

The v-upload directive MUST support both simple numeric parameter and full configuration object parameter for file size and type constraints.

**ID:** REQ-UPLOAD-DIR-001  
**Priority:** P0

#### Scenario: 使用数字参数限制文件大小
```vue
<input type="file" v-upload="4096" />
```
**Given** 用户在 input 元素上使用 v-upload 指令并传入数字 4096  
**When** 指令初始化  
**Then** 指令 MUST 将 4096 解析为最大文件大小（4MB）

#### Scenario: 使用配置对象
```vue
<input 
  type="file" 
  v-upload="{
    maxSize: 4096,
    accept: ['image/*'],
    multiple: true,
    maxFiles: 5
  }"
/>
```
**Given** 用户提供完整的配置对象  
**When** 指令初始化  
**Then** 指令 MUST 解析所有配置选项并应用到验证逻辑中

---

### Requirement: 原生 Input 元素支持

The directive MUST correctly handle native `<input type="file">` elements, validating selected files and triggering appropriate events.

**ID:** REQ-UPLOAD-DIR-002  
**Priority:** P0

#### Scenario: 文件选择后自动验证
```vue
<input 
  type="file" 
  v-upload="2048"
  @upload-success="handleSuccess"
  @upload-error="handleError"
/>
```
**Given** 用户选择了一个 1MB 的文件  
**When** change 事件触发  
**Then** 指令 MUST 验证文件大小并触发 `upload-success` 事件

#### Scenario: 文件大小超过限制
```vue
<input type="file" v-upload="2048" @upload-error="handleError" />
```
**Given** 用户选择了一个 5MB 的文件，限制为 2MB  
**When** change 事件触发  
**Then** 指令 MUST 阻止事件传播、清空 input value 并触发 `upload-error` 事件

---

### Requirement: 第三方组件适配

The directive MUST adapt to third-party UI library upload components by finding and binding to their internal file input elements.

**ID:** REQ-UPLOAD-DIR-003  
**Priority:** P0

#### Scenario: Vuetify v-file-input 集成
```vue
<v-file-input
  v-upload="4096"
  label="上传文件"
  @upload-success="handleSuccess"
  @upload-error="handleError"
/>
```
**Given** 指令绑定到 Vuetify 的 v-file-input 组件  
**When** 指令挂载  
**Then** 指令 MUST 查找组件内部的 `<input type="file">` 元素并绑定事件

#### Scenario: 处理动态渲染的 input
```vue
<custom-upload v-upload="2048" />
```
**Given** 第三方组件的内部 input 是异步创建的  
**When** input 元素被添加到 DOM  
**Then** 指令 MUST 使用 MutationObserver 检测并自动绑定事件

---

### Requirement: 编程式上传支持

The directive MUST support usage on regular elements (like buttons), automatically creating a hidden file input to enable programmatic file selection.

**ID:** REQ-UPLOAD-DIR-004  
**Priority:** P0

#### Scenario: 按钮触发文件选择
```vue
<button 
  v-upload="4096"
  @upload-success="handleUpload"
  @upload-error="handleError"
>
  选择文件
</button>
```
**Given** 指令绑定到普通 button 元素  
**When** 指令挂载  
**Then** 指令 MUST 创建隐藏的 `<input type="file">` 并监听按钮点击事件

**When** 用户点击按钮  
**Then** 指令 MUST 触发隐藏 input 的 click 事件打开文件选择对话框

#### Scenario: 配置隐藏 input 的属性
```vue
<div 
  v-upload="{
    maxSize: 4096,
    accept: ['image/png', 'image/jpeg'],
    multiple: true
  }"
  @upload-success="handleUpload"
>
  点击上传图片
</div>
```
**Given** 指令配置了 accept 和 multiple 选项  
**When** 指令创建隐藏 input  
**Then** 隐藏 input MUST 设置对应的 accept 和 multiple 属性

---

### Requirement: 文件大小验证

The directive MUST accurately validate file sizes against the configured maximum size limit.

**ID:** REQ-UPLOAD-DIR-005  
**Priority:** P0

#### Scenario: 单文件大小验证
```vue
<input type="file" v-upload="2048" @upload-error="handleError" />
```
**Given** 配置最大文件大小为 2048KB（2MB）  
**When** 用户选择一个 2500KB 的文件  
**Then** 验证 MUST 失败并触发错误事件，错误类型为 `FILE_TOO_LARGE`

**When** 用户选择一个 1500KB 的文件  
**Then** 验证 MUST 通过并触发成功事件

#### Scenario: 多文件验证
```vue
<input 
  type="file" 
  multiple
  v-upload="{ maxSize: 1024, multiple: true }"
  @upload-error="handleError"
/>
```
**Given** 用户选择了 3 个文件：500KB, 800KB, 1500KB  
**When** 验证执行  
**Then** 指令 MUST 检查每个文件并发现第三个文件超限，触发错误事件

---

### Requirement: 文件类型验证

The directive MUST support MIME type validation to ensure only acceptable file types are selected.

**ID:** REQ-UPLOAD-DIR-006  
**Priority:** P0

#### Scenario: 验证图片类型
```vue
<input 
  type="file" 
  v-upload="{ maxSize: 4096, accept: ['image/*'] }"
  @upload-error="handleError"
/>
```
**Given** 配置只接受图片类型  
**When** 用户选择一个 PDF 文件（application/pdf）  
**Then** 验证 MUST 失败，错误类型为 `INVALID_TYPE`

**When** 用户选择一个 PNG 文件（image/png）  
**Then** 验证 MUST 通过

#### Scenario: 精确的 MIME type 匹配
```vue
<input 
  type="file" 
  v-upload="{
    maxSize: 4096,
    accept: ['image/png', 'image/jpeg']
  }"
  @upload-error="handleError"
/>
```
**Given** 配置只接受 PNG 和 JPEG  
**When** 用户选择一个 GIF 文件  
**Then** 验证 MUST 失败

---

### Requirement: 多文件数量限制

The directive SHALL support limiting the number of files that can be selected at once.

**ID:** REQ-UPLOAD-DIR-007  
**Priority:** P1

#### Scenario: 限制最多 3 个文件
```vue
<input 
  type="file" 
  multiple
  v-upload="{
    maxSize: 2048,
    multiple: true,
    maxFiles: 3
  }"
  @upload-error="handleError"
/>
```
**Given** 配置最多允许 3 个文件  
**When** 用户选择了 5 个文件  
**Then** 验证 MUST 失败，错误类型为 `TOO_MANY_FILES`

**When** 用户选择了 2 个文件  
**Then** 验证 MUST 通过

---

### Requirement: 事件系统

The directive MUST provide clear event interfaces for success and error scenarios.

**ID:** REQ-UPLOAD-DIR-008  
**Priority:** P0

#### Scenario: upload-success 事件
```vue
<input type="file" v-upload="4096" @upload-success="handleSuccess" />
```
**Given** 文件验证通过  
**When** 触发 upload-success 事件  
**Then** 事件的 detail MUST 包含通过验证的 FileList

#### Scenario: upload-error 事件
```vue
<input type="file" v-upload="2048" @upload-error="handleError" />
```
**Given** 文件验证失败（文件过大）  
**When** 触发 upload-error 事件  
**Then** 事件的 detail MUST 包含 error 类型、file 对象和 message 描述

---

### Requirement: 事件拦截与状态清理

When validation fails, the directive MUST prevent event propagation and clean up the input state to allow re-selection.

**ID:** REQ-UPLOAD-DIR-009  
**Priority:** P0

#### Scenario: 阻止无效文件的事件传播
```vue
<input 
  type="file" 
  v-upload="2048"
  @change="handleChange"
  @upload-error="handleError"
/>
```
**Given** 用户选择了一个过大的文件  
**When** 验证失败  
**Then** 指令 MUST 调用 stopPropagation 和 preventDefault，@change 处理器不应被触发

#### Scenario: 清空 input value
```vue
<input type="file" v-upload="2048" @upload-error="handleError" />
```
**Given** 用户选择了一个无效文件  
**When** 验证失败后  
**Then** input 的 value MUST 被清空，用户可以重新选择相同的文件

---

### Requirement: TypeScript 类型支持

The directive MUST provide complete TypeScript type definitions for all configuration options and events.

**ID:** REQ-UPLOAD-DIR-010  
**Priority:** P1

#### Scenario: 导出类型定义
```typescript
import type { UploadOptions, UploadError } from 'tml-ui'

const options: UploadOptions = {
  maxSize: 4096,
  accept: ['image/*'],
  multiple: true
}
```
**Given** 开发者使用 TypeScript  
**When** 导入类型定义  
**Then** MUST 提供 UploadOptions、UploadError、UploadEventDetail 等类型

---

### Requirement: 生命周期管理

The directive MUST properly manage its lifecycle, including initialization, updates, and cleanup of resources.

**ID:** REQ-UPLOAD-DIR-011  
**Priority:** P0

#### Scenario: 挂载时初始化
**Given** 指令绑定到元素  
**When** 组件挂载  
**Then** 指令 MUST 检测元素类型、创建必要元素并绑定事件监听器

#### Scenario: 卸载时清理资源
**Given** 指令已经初始化  
**When** 组件卸载  
**Then** 指令 MUST 移除所有事件监听器、删除隐藏元素并清理 MutationObserver

---

## Examples

### 示例 1: 基础图片上传
```vue
<template>
  <div>
    <input 
      type="file" 
      v-upload="{ maxSize: 5120, accept: ['image/*'] }"
      @upload-success="handleUpload"
      @upload-error="showError"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const handleUpload = (event) => {
  console.log('Files:', event.detail)
  error.value = ''
}

const showError = (event) => {
  error.value = event.detail.message
}
</script>
```

### 示例 2: 第三方组件集成
```vue
<template>
  <v-file-input
    v-upload="4096"
    label="选择文件"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  />
</template>

<script setup>
const handleSuccess = (event) => {
  console.log('Files:', event.detail)
}

const handleError = (event) => {
  alert(`上传错误: ${event.detail.message}`)
}
</script>
```

### 示例 3: 编程式上传
```vue
<template>
  <button 
    v-upload="{
      maxSize: 10240,
      accept: ['application/pdf'],
      multiple: true,
      maxFiles: 3
    }"
    @upload-success="handleDocuments"
    class="upload-btn"
  >
    上传文档（最多3个）
  </button>
</template>

<script setup>
const handleDocuments = (event) => {
  const files = Array.from(event.detail)
  console.log(`已选择 ${files.length} 个文档`)
}
</script>
```

## Testing Requirements

- 配置解析（数字参数、对象参数）
- 元素类型检测
- 文件大小验证逻辑
- 文件类型验证逻辑
- 事件触发和拦截
- 原生 input 完整流程
- 第三方组件集成
- 编程式上传流程

## Security Considerations

文件类型验证只是前端验证，MUST 在文档中明确说明服务端需要再次验证。MIME type 可以被伪造，前端验证仅用于用户体验优化。
