<template>
  <div class="app-container">
    <header class="header">
      <h1>TML UI - Vue 3 组件库</h1>
      <p>现代化的 Vue 3 + TypeScript 组件库</p>
    </header>

    <main class="main-content">
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
    </main>

    <footer class="footer">
      <p>TML UI © 2025 - MIT License</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TmlButton from './components/button/tml-button.vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
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
</style>
