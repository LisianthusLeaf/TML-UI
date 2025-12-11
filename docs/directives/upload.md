# v-upload 指令

通用文件上传验证指令，能够自动适配各种文件上传场景：原生 input 元素、第三方 UI 库组件、以及通过 JavaScript 编程式触发的文件选择。

## 基础用法

### 原生 Input 元素

最简单的用法是直接在 `<input type="file">` 元素上使用指令：

```vue
<template>
  <div>
    <input 
      type="file" 
      v-upload="2048"
      @upload-success="handleSuccess"
      @upload-error="handleError"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const error = ref('')

const handleSuccess = (event) => {
  console.log('已选择文件:', event.detail)
  error.value = ''
}

const handleError = (event) => {
  error.value = event.detail.message
}
</script>
```

### 使用配置对象

使用完整的配置对象来设置更详细的验证规则：

```vue
<template>
  <input 
    type="file" 
    v-upload="{
      maxSize: 5120,        // 最大 5MB
      accept: ['image/*'],  // 只接受图片
      multiple: true,       // 允许多选
      maxFiles: 5          // 最多 5 个文件
    }"
    @upload-success="handleUpload"
    @upload-error="showError"
  />
</template>

<script setup>
const handleUpload = (event) => {
  const files = Array.from(event.detail)
  console.log(`已选择 ${files.length} 个文件`)
}

const showError = (event) => {
  alert(`上传错误: ${event.detail.message}`)
}
</script>
```

## 第三方组件集成

`v-upload` 指令可以与第三方 UI 库的上传组件无缝集成。

### Vuetify

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

### Element Plus

```vue
<template>
  <el-upload
    v-upload="{ maxSize: 4096, accept: ['image/*'] }"
    action="/upload"
    :auto-upload="false"
    @upload-success="handleSuccess"
    @upload-error="handleError"
  >
    <el-button>点击上传</el-button>
  </el-upload>
</template>
```

## 编程式上传

在普通按钮或其他元素上使用指令，点击时自动触发文件选择：

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
    📄 上传文档（最多3个）
  </button>
</template>

<script setup>
const handleDocuments = (event) => {
  const files = Array.from(event.detail)
  console.log(`已选择 ${files.length} 个文档:`, files.map(f => f.name))
}
</script>

<style scoped>
.upload-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
```

## API 参考

### 指令参数

`v-upload` 接受两种类型的参数：

#### 简化形式

直接传入数字作为最大文件大小（KB）：

```vue
<input type="file" v-upload="2048" />
<!-- 等价于 v-upload="{ maxSize: 2048 }" -->
```

#### 配置对象

传入完整的配置对象：

```vue
<input 
  type="file" 
  v-upload="{
    maxSize: 5120,
    accept: ['image/*'],
    multiple: true,
    maxFiles: 5
  }"
/>
```

### UploadOptions 接口

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `maxSize` | `number` | 否 | - | 最大文件大小（单位：KB） |
| `accept` | `string[]` | 否 | - | 接受的文件类型（MIME types），支持通配符如 `image/*`、`video/*` |
| `multiple` | `boolean` | 否 | `false` | 是否允许多选（仅编程式上传时有效，原生 input 请使用 `multiple` 属性） |
| `maxFiles` | `number` | 否 | - | 最大文件数量限制 |

**TypeScript 定义：**

```typescript
interface UploadOptions {
  maxSize?: number
  accept?: string[]
  multiple?: boolean
  maxFiles?: number
}
```

### 事件

指令会在绑定的元素上触发自定义事件。

#### upload-success

**触发时机：** 文件验证通过时触发

**事件类型：** `CustomEvent<FileList>`

**事件详情 (event.detail)：** `FileList` 对象，包含通过验证的文件列表

**示例：**

```vue
<input 
  type="file" 
  v-upload="4096"
  @upload-success="handleSuccess"
/>

<script setup>
const handleSuccess = (event) => {
  const files = event.detail // FileList 对象
  console.log('通过验证的文件:', files)
  
  // 转换为数组以便操作
  const fileArray = Array.from(files)
  fileArray.forEach(file => {
    console.log(`文件名: ${file.name}, 大小: ${file.size} bytes`)
  })
}
</script>
```

#### upload-error

**触发时机：** 文件验证失败时触发

**事件类型：** `CustomEvent<UploadError>`

**事件详情 (event.detail)：** `UploadError` 对象

**UploadError 接口：**

```typescript
interface UploadError {
  /** 错误类型 */
  type: UploadErrorType
  /** 出错的文件 */
  file: File
  /** 错误消息（中文） */
  message: string
}
```

**示例：**

```vue
<input 
  type="file" 
  v-upload="2048"
  @upload-error="handleError"
/>

<script setup>
const handleError = (event) => {
  const { type, file, message } = event.detail
  console.error(`错误类型: ${type}`)
  console.error(`文件: ${file.name}`)
  console.error(`消息: ${message}`)
}
</script>
```

### 错误类型（UploadErrorType）

#### FILE_TOO_LARGE

**说明：** 文件大小超过 `maxSize` 限制

**消息格式：** `文件 {fileName} 大小 {fileSize} KB 超过限制 {maxSize} KB`

**示例：**

```vue
<input type="file" v-upload="2048" @upload-error="handleError" />
```

用户选择了一个 3MB (3072 KB) 的文件时：
```javascript
{
  type: 'FILE_TOO_LARGE',
  file: File,
  message: '文件 example.jpg 大小 3072 KB 超过限制 2048 KB'
}
```

#### INVALID_TYPE

**说明：** 文件类型不在 `accept` 列表中

**消息格式：** `文件 {fileName} 类型 {fileType} 不在允许的类型列表中`

**示例：**

```vue
<input 
  type="file" 
  v-upload="{ maxSize: 4096, accept: ['image/*'] }"
  @upload-error="handleError"
/>
```

用户选择了 PDF 文件时：
```javascript
{
  type: 'INVALID_TYPE',
  file: File,
  message: '文件 document.pdf 类型 application/pdf 不在允许的类型列表中'
}
```

#### TOO_MANY_FILES

**说明：** 选择的文件数量超过 `maxFiles` 限制

**消息格式：** `选择了 {count} 个文件，超过最大限制 {maxFiles} 个`

**示例：**

```vue
<input 
  type="file" 
  multiple
  v-upload="{ maxSize: 2048, maxFiles: 3 }"
  @upload-error="handleError"
/>
```

用户选择了 5 个文件时：
```javascript
{
  type: 'TOO_MANY_FILES',
  file: File, // 第一个文件
  message: '选择了 5 个文件，超过最大限制 3 个'
}
```

**TypeScript 枚举定义：**

```typescript
enum UploadErrorType {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_TYPE = 'INVALID_TYPE',
  TOO_MANY_FILES = 'TOO_MANY_FILES'
}
```

## 完整示例

```vue
<template>
  <div class="upload-container">
    <h2>文件上传示例</h2>

    <!-- 场景 1: 原生 input -->
    <div class="upload-section">
      <h3>1. 原生 Input</h3>
      <input 
        type="file" 
        v-upload="{ maxSize: 5120, accept: ['image/*'] }"
        @upload-success="handleImageUpload"
        @upload-error="showError"
      />
      <p v-if="imageError" class="error">{{ imageError }}</p>
    </div>

    <!-- 场景 2: 多文件上传 -->
    <div class="upload-section">
      <h3>2. 多文件上传</h3>
      <input 
        type="file" 
        multiple
        v-upload="{
          maxSize: 10240,
          accept: ['application/pdf', 'application/msword'],
          multiple: true,
          maxFiles: 5
        }"
        @upload-success="handleDocumentUpload"
        @upload-error="showError"
      />
      <p v-if="documentError" class="error">{{ documentError }}</p>
      <ul v-if="uploadedDocuments.length">
        <li v-for="doc in uploadedDocuments" :key="doc.name">
          {{ doc.name }} ({{ (doc.size / 1024).toFixed(2) }} KB)
        </li>
      </ul>
    </div>

    <!-- 场景 3: 编程式上传 -->
    <div class="upload-section">
      <h3>3. 按钮触发上传</h3>
      <button 
        v-upload="{
          maxSize: 20480,
          accept: ['video/*'],
          multiple: true,
          maxFiles: 3
        }"
        @upload-success="handleVideoUpload"
        @upload-error="showError"
        class="upload-btn"
      >
        📹 选择视频文件（最多3个，每个最大20MB）
      </button>
      <p v-if="videoError" class="error">{{ videoError }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 图片上传
const imageError = ref('')
const handleImageUpload = (event) => {
  console.log('图片上传成功:', event.detail)
  imageError.value = ''
  // 这里可以调用上传 API
}

// 文档上传
const documentError = ref('')
const uploadedDocuments = ref([])
const handleDocumentUpload = (event) => {
  const files = Array.from(event.detail)
  uploadedDocuments.value = files
  documentError.value = ''
  console.log(`已选择 ${files.length} 个文档`)
}

// 视频上传
const videoError = ref('')
const handleVideoUpload = (event) => {
  const files = Array.from(event.detail)
  console.log(`已选择 ${files.length} 个视频:`, files.map(f => f.name))
  videoError.value = ''
}

// 统一错误处理
const showError = (event) => {
  const errorMsg = event.detail.message
  
  // 根据目标元素决定显示在哪个错误信息中
  const target = event.target
  if (target.accept?.includes('image')) {
    imageError.value = errorMsg
  } else if (target.accept?.includes('video')) {
    videoError.value = errorMsg
  } else {
    documentError.value = errorMsg
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.upload-section h3 {
  margin-top: 0;
  color: #333;
}

.error {
  color: #f44336;
  margin-top: 10px;
}

.upload-btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #1976d2;
}

ul {
  margin-top: 15px;
  padding-left: 20px;
}

li {
  margin: 5px 0;
  color: #666;
}
</style>
```

## 最佳实践

### 1. 服务端验证

⚠️ **重要**: 前端验证仅用于提升用户体验，不能替代服务端验证。始终在服务端重新验证文件大小和类型。

```javascript
// 前端验证通过后，上传到服务器
const handleSuccess = async (event) => {
  const formData = new FormData()
  Array.from(event.detail).forEach(file => {
    formData.append('files', file)
  })

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('上传失败')
    }
    
    console.log('上传成功')
  } catch (error) {
    console.error('上传错误:', error)
  }
}
```

### 2. 用户友好的错误提示

提供清晰的错误消息，帮助用户理解问题：

```vue
<script setup>
const handleError = (event) => {
  const { type, message } = event.detail
  
  let userMessage = ''
  switch (type) {
    case 'FILE_TOO_LARGE':
      userMessage = `文件太大了！${message}`
      break
    case 'INVALID_TYPE':
      userMessage = `文件格式不支持！${message}`
      break
    case 'TOO_MANY_FILES':
      userMessage = `文件数量超过限制！${message}`
      break
  }
  
  // 使用友好的方式显示错误
  showNotification(userMessage, 'error')
}
</script>
```

### 合理设置文件大小限制

根据实际需求设置合理的文件大小限制：

| 文件类型 | 建议大小限制 | 说明 |
|---------|-------------|------|
| 头像图片 | 1-2 MB | 用户头像通常无需太高分辨率 |
| 普通图片 | 5-10 MB | 相册、产品图等 |
| 文档 | 10-20 MB | PDF、Word、Excel 等文档 |
| 视频 | 50-100 MB | 短视频，根据平台需求调整 |
| 大文件 | 500 MB+ | 考虑使用分片上传 |

## TypeScript 类型支持

TmlUI 提供了完整的 TypeScript 类型定义，获得更好的开发体验和类型安全：

### 导入类型

```typescript
import type { 
  UploadOptions, 
  UploadError,
  UploadErrorType,
  UploadSuccessEventDetail,
  UploadErrorEventDetail
} from 'tml-ui'
```

### 使用示例

```typescript
import { ref } from 'vue'
import type { UploadOptions, UploadError } from 'tml-ui'

// 定义上传配置
const uploadOptions: UploadOptions = {
  maxSize: 5120,
  accept: ['image/png', 'image/jpeg'],
  multiple: true,
  maxFiles: 10
}

// 类型安全的事件处理
const handleSuccess = (event: CustomEvent<FileList>) => {
  const files = Array.from(event.detail)
  files.forEach(file => {
    console.log(`文件: ${file.name}, 大小: ${file.size}`)
  })
}

const handleError = (event: CustomEvent<UploadError>) => {
  const { type, file, message } = event.detail
  
  switch (type) {
    case 'FILE_TOO_LARGE':
      console.error('文件太大:', file.name)
      break
    case 'INVALID_TYPE':
      console.error('文件类型不支持:', file.type)
      break
    case 'TOO_MANY_FILES':
      console.error('文件数量超限')
      break
  }
}
```

### 类型定义

```typescript
/** 上传配置选项 */
interface UploadOptions {
  /** 最大文件大小（KB） */
  maxSize?: number
  /** 接受的文件类型（MIME types），支持通配符如 image/* */
  accept?: string[]
  /** 是否允许多选 */
  multiple?: boolean
  /** 最大文件数量 */
  maxFiles?: number
}

/** 上传错误类型枚举 */
enum UploadErrorType {
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_TYPE = 'INVALID_TYPE',
  TOO_MANY_FILES = 'TOO_MANY_FILES'
}

/** 上传错误信息 */
interface UploadError {
  /** 错误类型 */
  type: UploadErrorType
  /** 出错的文件 */
  file: File
  /** 错误消息 */
  message: string
}

/** upload-success 事件的 detail 类型 */
type UploadSuccessEventDetail = FileList

/** upload-error 事件的 detail 类型 */
type UploadErrorEventDetail = UploadError
```

## 使用场景

### 头像上传

```vue
<template>
  <div class="avatar-upload">
    <img v-if="avatarUrl" :src="avatarUrl" alt="头像" />
    <button 
      v-upload="{
        maxSize: 2048,
        accept: ['image/png', 'image/jpeg', 'image/webp']
      }"
      @upload-success="uploadAvatar"
      @upload-error="showError"
    >
      {{ avatarUrl ? '更换头像' : '上传头像' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const avatarUrl = ref('')

const uploadAvatar = async (event) => {
  const file = event.detail[0]
  
  // 预览
  avatarUrl.value = URL.createObjectURL(file)
  
  // 上传到服务器
  const formData = new FormData()
  formData.append('avatar', file)
  
  try {
    const response = await fetch('/api/upload/avatar', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    avatarUrl.value = data.url
  } catch (error) {
    console.error('上传失败:', error)
  }
}

const showError = (event) => {
  alert(event.detail.message)
}
</script>
```

### 批量图片上传

```vue
<template>
  <div class="gallery-upload">
    <div class="preview-grid">
      <div v-for="(img, index) in images" :key="index" class="preview-item">
        <img :src="img.url" :alt="img.name" />
        <button @click="removeImage(index)">删除</button>
      </div>
    </div>
    
    <input 
      type="file" 
      multiple
      v-upload="{
        maxSize: 10240,
        accept: ['image/*'],
        maxFiles: 20
      }"
      @upload-success="addImages"
      @upload-error="handleError"
    />
    
    <p class="hint">最多上传20张图片，每张最大10MB</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([])

const addImages = (event) => {
  const files = Array.from(event.detail)
  
  files.forEach(file => {
    images.value.push({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file
    })
  })
}

const removeImage = (index) => {
  URL.revokeObjectURL(images.value[index].url)
  images.value.splice(index, 1)
}

const handleError = (event) => {
  const { type, message } = event.detail
  
  if (type === 'TOO_MANY_FILES') {
    alert(`${message}。当前已有 ${images.value.length} 张图片。`)
  } else {
    alert(message)
  }
}
</script>
```

### 文档上传（与后端集成）

```vue
<template>
  <div class="document-upload">
    <input 
      type="file" 
      multiple
      v-upload="{
        maxSize: 20480,
        accept: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ],
        maxFiles: 10
      }"
      @upload-success="uploadDocuments"
      @upload-error="handleError"
    />
    
    <div v-if="uploading" class="progress">
      上传中... {{ uploadProgress }}%
    </div>
    
    <ul v-if="uploadedFiles.length" class="file-list">
      <li v-for="file in uploadedFiles" :key="file.id">
        {{ file.name }} - {{ file.size }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const uploading = ref(false)
const uploadProgress = ref(0)
const uploadedFiles = ref([])

const uploadDocuments = async (event) => {
  const files = Array.from(event.detail)
  uploading.value = true
  uploadProgress.value = 0
  
  const formData = new FormData()
  files.forEach(file => {
    formData.append('documents', file)
  })
  
  try {
    const response = await fetch('/api/upload/documents', {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
      }
    })
    
    const data = await response.json()
    uploadedFiles.value.push(...data.files)
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败，请重试')
  } finally {
    uploading.value = false
  }
}

const handleError = (event) => {
  alert(event.detail.message)
}
</script>
```

## 注意事项

1. **MIME type 验证的局限性**: MIME type 可以被伪造，前端验证仅用于用户体验。服务端必须进行真实的文件内容验证。

2. **浏览器兼容性**: 指令使用了现代浏览器 API（CustomEvent、MutationObserver 等），仅支持现代浏览器。

3. **第三方组件**: 指令会自动查找组件内部的 `<input type="file">` 元素。如果组件使用了特殊的实现方式，可能需要使用原生 input 或编程式方式。

4. **事件冒泡**: 验证失败时，指令会阻止事件传播。确保你的错误处理逻辑监听 `upload-error` 事件。

5. **文件选择清理**: 验证失败后，input 的 value 会被清空，允许用户重新选择相同的文件。
