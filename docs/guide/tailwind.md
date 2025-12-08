# Tailwind CSS 使用指南

TML UI 集成了 Tailwind CSS，为开发者提供快速构建 UI 的能力。同时保留了 CSS 变量系统，支持灵活的主题定制。

## 概述

### 为什么集成 Tailwind CSS？

- **快速开发**：使用 utility-first 类快速构建界面
- **统一设计**：基于 Tailwind 的设计 token 保证一致性
- **响应式设计**：内置响应式修饰符简化适配工作
- **类型安全**：TypeScript 支持提供更好的开发体验
- **生产优化**：自动移除未使用的样式，优化包体积

### 与 CSS 变量的关系

TML UI 采用混合使用策略：
- Tailwind 类映射到 CSS 变量
- 主题切换时 Tailwind 样式自动更新
- 开发者可以选择使用 Tailwind 或自定义 CSS

## 基础使用

### 使用 Tailwind 类

```vue
<template>
  <button class="px-4 py-2 bg-primary text-white rounded-base hover:opacity-80">
    Primary Button
  </button>
</template>
```

### 使用主题颜色

Tailwind 配置已映射所有 CSS 变量：

```vue
<template>
  <div class="bg-primary text-white">Primary</div>
  <div class="bg-success text-white">Success</div>
  <div class="bg-warning text-white">Warning</div>
  <div class="bg-danger text-white">Danger</div>
  <div class="bg-info text-white">Info</div>
</template>
```

### 使用文本颜色

```vue
<template>
  <p class="text-primary">主要文本</p>
  <p class="text-regular">常规文本</p>
  <p class="text-secondary">次要文本</p>
  <p class="text-placeholder">占位文本</p>
</template>
```

### 使用间距

```vue
<template>
  <div class="p-small">小间距</div>
  <div class="p-base">基础间距</div>
  <div class="p-large">大间距</div>
</template>
```

### 使用圆角

```vue
<template>
  <div class="rounded-small">小圆角</div>
  <div class="rounded-base">基础圆角</div>
  <div class="rounded-round">圆角按钮</div>
  <div class="rounded-circle">圆形</div>
</template>
```

## 响应式设计

Tailwind 提供了便捷的响应式修饰符：

```vue
<template>
  <!-- 移动端垂直排列，桌面端水平排列 -->
  <div class="flex flex-col md:flex-row gap-4">
    <div class="w-full md:w-1/2">Left</div>
    <div class="w-full md:w-1/2">Right</div>
  </div>
</template>
```

响应式断点：
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 混合使用策略

### 何时使用 Tailwind

✅ **推荐使用 Tailwind**：
- 布局和间距（flex, grid, padding, margin）
- 响应式设计
- 快速原型开发
- 简单的样式组合

### 何时使用自定义 CSS

✅ **推荐使用自定义 CSS**：
- 复杂的动画和过渡效果
- 组件特有的样式逻辑
- 需要精细控制的样式
- 复杂的伪类和伪元素

### 示例：混合使用

```vue
<template>
  <button class="tml-button px-4 py-2 rounded-base">
    Click Me
  </button>
</template>

<style scoped>
/* 使用自定义 CSS 处理复杂逻辑 */
.tml-button {
  background: linear-gradient(135deg, var(--tml-color-primary), var(--tml-color-info));
  transition: all 0.3s ease;
}

.tml-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--tml-box-shadow-light);
}

/* Tailwind 处理间距和圆角 */
</style>
```

## 自定义主题扩展

如果需要扩展 Tailwind 主题，可以修改 `tailwind.config.js`：

```js
export default {
  theme: {
    extend: {
      colors: {
        // 添加自定义颜色
        custom: '#your-color',
      },
      spacing: {
        // 添加自定义间距
        '128': '32rem',
      },
    },
  },
}
```

## 生产优化

Tailwind 会自动移除未使用的样式类。确保：

1. `tailwind.config.js` 的 `content` 配置包含所有源文件
2. 不要动态拼接类名（Tailwind 无法检测）

❌ **错误示例**：
```vue
<div :class="`text-${color}`">Text</div>
```

✅ **正确示例**：
```vue
<div :class="color === 'primary' ? 'text-primary' : 'text-danger'">Text</div>
```

或使用完整类名：
```vue
<script setup>
const colorClass = computed(() => ({
  primary: 'text-primary',
  danger: 'text-danger',
}[color.value]))
</script>

<template>
  <div :class="colorClass">Text</div>
</template>
```

## 最佳实践

1. **保持一致性**：团队应约定优先使用 Tailwind 或 CSS
2. **避免过度使用**：单个元素类名不宜过多（建议 ≤ 10 个）
3. **提取组件类**：重复的样式组合可以提取为组件
4. **利用 @apply**：在自定义 CSS 中复用 Tailwind 类

```css
/* 在 CSS 中使用 @apply */
.btn-primary {
  @apply px-4 py-2 bg-primary text-white rounded-base hover:opacity-80;
}
```

5. **配合 CSS 变量**：确保主题一致性

## 常见问题

### Q: Tailwind 类不生效？

检查 `tailwind.config.js` 的 `content` 配置是否包含文件路径。

### Q: 如何调试 Tailwind？

使用浏览器开发者工具查看最终生成的 CSS，或查看构建日志。

### Q: 与 CSS Modules 冲突？

TML UI 主要使用 Scoped CSS，与 Tailwind 无冲突。

### Q: 如何自定义断点？

在 `tailwind.config.js` 中修改 `theme.screens`。

## 相关资源

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [TML UI 组件文档](./quick-start.md)
- [CSS 变量系统](../components/button.md#样式定制)
