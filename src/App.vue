<template>
  <div class="app-container">
    <header class="header">
      <h1>TML UI - Vue 3 组件库</h1>
      <p>现代化的 Vue 3 + TypeScript 组件库</p>
    </header>

    <main class="main-content">
      <section class="demo-section">
        <h2>Grid 栅格布局演示</h2>

        <div class="demo-group">
          <h3>基础栅格</h3>
          <TmlRow>
            <TmlCol :span="24"><div class="grid-demo">col-24</div></TmlCol>
          </TmlRow>
          <TmlRow>
            <TmlCol :span="12"><div class="grid-demo">col-12</div></TmlCol>
            <TmlCol :span="12"><div class="grid-demo">col-12</div></TmlCol>
          </TmlRow>
          <TmlRow>
            <TmlCol :span="8"><div class="grid-demo">col-8</div></TmlCol>
            <TmlCol :span="8"><div class="grid-demo">col-8</div></TmlCol>
            <TmlCol :span="8"><div class="grid-demo">col-8</div></TmlCol>
          </TmlRow>
        </div>

        <div class="demo-group">
          <h3>栅格间距</h3>
          <TmlRow :gutter="16">
            <TmlCol :span="6"><div class="grid-demo">col-6</div></TmlCol>
            <TmlCol :span="6"><div class="grid-demo">col-6</div></TmlCol>
            <TmlCol :span="6"><div class="grid-demo">col-6</div></TmlCol>
            <TmlCol :span="6"><div class="grid-demo">col-6</div></TmlCol>
          </TmlRow>
        </div>

        <div class="demo-group">
          <h3>列偏移</h3>
          <TmlRow>
            <TmlCol :span="8"><div class="grid-demo">col-8</div></TmlCol>
            <TmlCol :span="8" :offset="8"><div class="grid-demo">col-8 offset-8</div></TmlCol>
          </TmlRow>
        </div>

        <div class="demo-group">
          <h3>响应式布局</h3>
          <TmlRow :gutter="16">
            <TmlCol :span="24" :sm="12" :md="8" :lg="6">
              <div class="grid-demo">响应式列</div>
            </TmlCol>
            <TmlCol :span="24" :sm="12" :md="8" :lg="6">
              <div class="grid-demo">响应式列</div>
            </TmlCol>
            <TmlCol :span="24" :sm="12" :md="8" :lg="6">
              <div class="grid-demo">响应式列</div>
            </TmlCol>
            <TmlCol :span="24" :sm="12" :md="8" :lg="6">
              <div class="grid-demo">响应式列</div>
            </TmlCol>
          </TmlRow>
        </div>
      </section>

      <section class="demo-section">
        <h2>Button 组件演示</h2>

        <div class="demo-group">
          <h3>基础按钮</h3>
          <div class="button-row">
            <tml-button>Default</tml-button>
            <tml-button type="primary">Primary</tml-button>
            <tml-button type="success">Success</tml-button>
            <tml-button type="warning">Warning</tml-button>
            <tml-button type="danger">Danger</tml-button>
          </div>
        </div>

        <div class="demo-group">
          <h3>不同尺寸</h3>
          <div class="button-row">
            <tml-button size="large" type="primary">Large</tml-button>
            <tml-button size="medium" type="primary">Medium</tml-button>
            <tml-button size="small" type="primary">Small</tml-button>
          </div>
        </div>

        <div class="demo-group">
          <h3>禁用状态</h3>
          <div class="button-row">
            <tml-button disabled>Default</tml-button>
            <tml-button type="primary" disabled>Primary</tml-button>
            <tml-button type="success" disabled>Success</tml-button>
          </div>
        </div>

        <div class="demo-group">
          <h3>加载状态</h3>
          <div class="button-row">
            <tml-button type="primary" loading>Loading</tml-button>
            <tml-button type="success" loading>Loading</tml-button>
          </div>
        </div>

        <div class="demo-group">
          <h3>点击事件</h3>
          <div class="button-row">
            <tml-button type="primary" @click="handleClick">Click Me</tml-button>
          </div>
          <p v-if="clickCount > 0" class="click-info">已点击 {{ clickCount }} 次</p>
        </div>
      </section>
      
      <section class="demo-section">
        <h2>v-upload 指令演示</h2>

        <div class="demo-group">
          <h3>基础图片上传</h3>
          <input 
            type="file" 
            v-upload="{ maxSize: 5120, accept: ['image/*'] }"
            @upload-success="handleImageUpload"
            @upload-error="showUploadError"
            class="file-input"
          />
          <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>
          <p v-if="uploadedFileName" class="upload-success">
            已选择: {{ uploadedFileName }}
          </p>
        </div>

        <div class="demo-group">
          <h3>多文件上传</h3>
          <input 
            type="file" 
            multiple
            v-upload="{
              maxSize: 10240,
              accept: ['application/pdf', 'image/*'],
              multiple: true,
              maxFiles: 5
            }"
            @upload-success="handleMultiUpload"
            @upload-error="showUploadError"
            class="file-input"
          />
          <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>
          <ul v-if="uploadedFiles.length" class="file-list">
            <li v-for="file in uploadedFiles" :key="file.name">
              {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
            </li>
          </ul>
        </div>

        <div class="demo-group">
          <h3>编程式上传（按钮触发）</h3>
          <tml-button 
            type="primary"
            v-upload="{
              maxSize: 20480,
              accept: ['video/*'],
              multiple: true,
              maxFiles: 3
            }"
            @upload-success="handleVideoUpload"
            @upload-error="showUploadError"
          >
            📹 选择视频文件
          </tml-button>
          <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>
          <p v-if="videoCount > 0" class="upload-success">
            已选择 {{ videoCount }} 个视频文件
          </p>
        </div>
      </section>
      
      <section class="demo-section">
        <h2>瀑布流演示</h2>

        <div class="demo-group">
          <h3>基础瀑布流</h3>
          <div class="waterfall-controls">
            <tml-button type="primary" @click="addItem">添加项目</tml-button>
            <tml-button type="danger" @click="removeItem">移除项目</tml-button>
            <tml-button @click="resetItems">重置</tml-button>
            <span class="item-count">当前项目数: {{ waterfallItems.length }}</span>
          </div>
          
          <TmlWaterfall
            :columns="5"
            :gap="16"
            :min-item-width="160"
            :max-item-width="320"
            @reach-bottom="handleReachBottom"
          >
            <div
              v-for="item in waterfallItems"
              :key="item.id"
              class="waterfall-item"
              :style="{ height: `${item.height}px`, backgroundColor: item.color }"
            >
              <div class="item-content">
                <p class="item-title">{{ item.title }}</p>
                <p class="item-desc">高度: {{ item.height }}px</p>
              </div>
            </div>
          </TmlWaterfall>

          <div v-if="isLoadingMore" class="loading-indicator">
            加载更多中...
          </div>
        </div>

        <div class="demo-group">
          <h3>响应式列数</h3>
          <p class="description">调整浏览器窗口大小，观察列数自动变化</p>
          <div class="waterfall-controls">
            <label>列数: 
              <input 
                v-model.number="responsiveColumns" 
                type="number" 
                min="1" 
                max="10" 
                class="column-input"
              />
            </label>
            <label>间距: 
              <input 
                v-model.number="responsiveGap" 
                type="number" 
                min="0" 
                max="100" 
                class="column-input"
              />
            </label>
          </div>

          <TmlWaterfall
            :columns="responsiveColumns"
            :gap="responsiveGap"
            :observe-resizes="true"
          >
            <div
              v-for="item in fixedItems"
              :key="item.id"
              class="waterfall-item"
              :style="{ height: `${item.height}px`, backgroundColor: item.color }"
            >
              <div class="item-content">
                <p class="item-title">{{ item.title }}</p>
              </div>
            </div>
          </TmlWaterfall>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>TML UI © 2025 - MIT License</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TmlButton from './components/button/tml-button.vue'
import { TmlRow, TmlCol } from './components/grid'
import { TmlWaterfall } from './components/list/waterfall'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}

// 瀑布流演示数据
interface WaterfallItem {
  id: number
  title: string
  height: number
  color: string
}

const colors = [
  '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399',
  '#53a8ff', '#85ce61', '#ebb563', '#f78989', '#a6a9ad',
  '#3a8ee6', '#5daf34', '#cf9236', '#dd6161', '#73767a'
]

let itemIdCounter = 0

// 生成随机高度的项目
function generateItem(): WaterfallItem {
  itemIdCounter++
  return {
    id: itemIdCounter,
    title: `项目 ${itemIdCounter}`,
    height: Math.floor(Math.random() * 200) + 150, // 150-350px
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}

// 生成初始数据
function generateItems(count: number): WaterfallItem[] {
  return Array.from({ length: count }, () => generateItem())
}

const waterfallItems = ref<WaterfallItem[]>(generateItems(20))
const isLoadingMore = ref(false)

// 添加项目
const addItem = () => {
  waterfallItems.value.push(generateItem())
}

// 移除项目
const removeItem = () => {
  if (waterfallItems.value.length > 0) {
    waterfallItems.value.pop()
  }
}

// 重置项目
const resetItems = () => {
  itemIdCounter = 0
  waterfallItems.value = generateItems(20)
}

// 到达底部时加载更多
const handleReachBottom = (payload: any) => {
  if (payload.atBottom && !isLoadingMore.value && waterfallItems.value.length < 100) {
    isLoadingMore.value = true
    // 模拟异步加载
    setTimeout(() => {
      const newItems = generateItems(10)
      waterfallItems.value.push(...newItems)
      isLoadingMore.value = false
    }, 1000)
  }
}

// 响应式演示
const responsiveColumns = ref(5)
const responsiveGap = ref(16)
const fixedItems = ref<WaterfallItem[]>(generateItems(15))

// v-upload 指令演示
const uploadError = ref('')
const uploadedFileName = ref('')
const uploadedFiles = ref<File[]>([])
const videoCount = ref(0)

const handleImageUpload = (event: CustomEvent) => {
  const files = event.detail as FileList
  if (files.length > 0) {
    uploadedFileName.value = files[0].name
    uploadError.value = ''
  }
}

const handleMultiUpload = (event: CustomEvent) => {
  const files = Array.from(event.detail as FileList)
  uploadedFiles.value = files
  uploadError.value = ''
}

const handleVideoUpload = (event: CustomEvent) => {
  const files = event.detail as FileList
  videoCount.value = files.length
  uploadError.value = ''
}

const showUploadError = (event: CustomEvent) => {
  uploadError.value = event.detail.message
  uploadedFileName.value = ''
  uploadedFiles.value = []
  videoCount.value = 0
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, var(--tml-color-primary) 0%, #53a8ff 100%);
  color: white;
  padding: 48px 24px;
  text-align: center;
}

.header h1 {
  font-size: 48px;
  margin-bottom: 16px;
  font-weight: 700;
}

.header p {
  font-size: 20px;
  opacity: 0.9;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  width: 100%;
}

.demo-section h2 {
  font-size: 32px;
  margin-bottom: 32px;
  color: var(--tml-text-color-primary);
}

.demo-group {
  margin-bottom: 48px;
  padding: 24px;
  background: var(--tml-bg-color);
  border: 1px solid var(--tml-border-color-light);
  border-radius: 8px;
}

.demo-group h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--tml-text-color-regular);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.click-info {
  margin-top: 16px;
  padding: 12px;
  background: var(--tml-bg-color-page);
  border-radius: 4px;
  color: var(--tml-color-primary);
  font-weight: 500;
}

.footer {
  background: var(--tml-bg-color-page);
  padding: 24px;
  text-align: center;
  color: var(--tml-text-color-secondary);
  border-top: 1px solid var(--tml-border-color-light);
}

.grid-demo {
  background: #0092ff;
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 8px;
}

/* 瀑布流演示样式 */
.waterfall-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--tml-bg-color-page);
  border-radius: 8px;
}

.item-count {
  font-weight: 500;
  color: var(--tml-color-primary);
  margin-left: auto;
}

.column-input {
  width: 80px;
  padding: 6px 12px;
  border: 1px solid var(--tml-border-color-light);
  border-radius: 4px;
  margin-left: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.column-input:focus {
  outline: none;
  border-color: var(--tml-color-primary);
}

.waterfall-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.waterfall-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.item-content {
  padding: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.item-desc {
  font-size: 14px;
  opacity: 0.9;
}

.loading-indicator {
  text-align: center;
  padding: 24px;
  color: var(--tml-color-primary);
  font-size: 16px;
  font-weight: 500;
}

.description {
  color: var(--tml-text-color-secondary);
  margin-bottom: 16px;
  font-size: 14px;
}

/* v-upload 指令演示样式 */
.file-input {
  padding: 10px;
  border: 2px dashed var(--tml-border-color-light);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s;
  width: 100%;
  font-size: 14px;
}

.file-input:hover {
  border-color: var(--tml-color-primary);
}

.upload-error {
  color: var(--tml-color-danger);
  margin-top: 12px;
  padding: 10px;
  background: #fef0f0;
  border-radius: 4px;
  font-size: 14px;
}

.upload-success {
  color: var(--tml-color-success);
  margin-top: 12px;
  padding: 10px;
  background: #f0f9ff;
  border-radius: 4px;
  font-size: 14px;
}

.file-list {
  margin-top: 12px;
  padding-left: 24px;
  list-style: disc;
}

.file-list li {
  margin: 6px 0;
  color: var(--tml-text-color-regular);
  font-size: 14px;
}
</style>
