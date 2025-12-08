# Change: 引入 Tailwind CSS

**Change ID:** `add-tailwind-css`  
**Status:** Draft  
**Created:** 2025-12-08  
**Author:** AI Assistant

## Why

当前项目使用原生 CSS 和 CSS 变量进行样式管理，存在以下限制：
- 需要手写大量样式代码，开发效率低
- 缺乏统一的设计系统和间距规范
- 响应式设计需要手动编写媒体查询
- 缺少常用工具类，重复代码较多

引入 Tailwind CSS 可以：
- **提升开发效率**：通过 utility-first 类快速构建 UI
- **统一设计系统**：使用 Tailwind 的设计 token（颜色、间距、字体等）
- **减少样式代码**：利用预设类减少自定义 CSS
- **增强响应式能力**：内置响应式修饰符简化适配
- **支持主题定制**：通过配置文件统一管理设计规范

## What Changes

- **新增依赖**: tailwindcss, postcss, autoprefixer
- **新增配置**: tailwind.config.js, postcss.config.js
- **修改样式系统**: 集成 Tailwind directives，保留现有 CSS 变量系统
- **更新构建流程**: 配置 PostCSS 处理 Tailwind
- **更新文档**: 添加 Tailwind 使用指南和最佳实践

## Impact

- **修改规范**: 
  - `component-library-infrastructure` - 扩展样式系统能力
- **影响范围**: 
  - 样式系统架构（新增 Tailwind 层，保留现有 CSS 变量）
  - 构建配置（新增 PostCSS 处理）
  - 开发体验（可使用 Tailwind utility 类）
- **依赖项**: tailwindcss ^3.4.0, postcss ^8.4.0, autoprefixer ^10.4.0
- **兼容性**: 不影响现有组件，可渐进式采用 Tailwind

---

## 详细说明

### 集成方案

**混合使用策略**：
- 保留现有 CSS 变量系统用于主题定制
- 使用 Tailwind utility 类加速开发
- 组件样式优先使用 Tailwind，必要时使用自定义 CSS
- 通过 Tailwind 配置扩展设计 token，与 CSS 变量保持一致

### 包含内容

#### 1. 安装依赖
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

#### 2. Tailwind 配置文件
创建 `tailwind.config.js`：
- 配置内容路径（扫描 src/ 和 docs/ 目录）
- 扩展主题配置（颜色、间距、字体等）
- 集成 CSS 变量作为 Tailwind theme
- 配置插件（如需要）

#### 3. PostCSS 配置
创建 `postcss.config.js`：
- 启用 tailwindcss 插件
- 启用 autoprefixer 插件

#### 4. 样式入口文件
修改 `src/styles/base.css`：
```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 保留现有 CSS 变量 */
:root {
  /* ... 现有变量 ... */
}
```

#### 5. Vite 配置更新
确保 Vite 正确处理 PostCSS（默认已支持）

#### 6. 文档更新
- 添加 `docs/guide/tailwind.md` - Tailwind 使用指南
- 更新 `docs/guide/quick-start.md` - 说明样式系统选择
- 添加示例：如何结合 Tailwind 和 CSS 变量

### 配置详情

#### Tailwind 配置示例
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{md,vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--tml-color-primary)',
        success: 'var(--tml-color-success)',
        warning: 'var(--tml-color-warning)',
        danger: 'var(--tml-color-danger)',
        info: 'var(--tml-color-info)'
      },
      borderRadius: {
        'tml': 'var(--tml-border-radius)',
        'tml-sm': 'var(--tml-border-radius-sm)',
        'tml-lg': 'var(--tml-border-radius-lg)'
      }
    }
  },
  plugins: []
}
```

### 不包含内容

- 不移除现有 CSS 变量系统
- 不强制所有组件使用 Tailwind
- 不包含 Tailwind UI 等第三方组件库
- 不修改现有组件的样式实现（保持兼容）

## 技术决策

### 为什么选择 Tailwind CSS？

1. **Utility-First 理念**：快速构建界面，减少 CSS 文件大小
2. **设计系统**：内置一致的设计 token
3. **生态成熟**：大量插件和工具支持
4. **性能优化**：PurgeCSS 自动移除未使用的样式
5. **TypeScript 友好**：支持类型提示（通过插件）

### 集成策略

- **渐进式采用**：新组件可使用 Tailwind，旧组件保持不变
- **混合模式**：Tailwind utility 类 + CSS 变量主题系统
- **最佳实践**：
  - 布局和间距使用 Tailwind
  - 主题颜色通过 CSS 变量保持可定制性
  - 复杂组件样式使用 `@apply` 或自定义 CSS

### 样式优先级

1. **Tailwind utility 类**：快速样式和布局
2. **CSS 变量**：主题定制和品牌颜色
3. **自定义 CSS**：复杂组件和特殊需求

## Migration Path

### 开发者迁移

1. **现有代码无需修改**：完全兼容现有组件
2. **新组件建议使用 Tailwind**：提高开发效率
3. **文档提供示例**：展示 Tailwind 和 CSS 变量的结合使用

### 用户影响

- **零影响**：用户端无需改动，打包产物包含必要样式
- **更小的包体积**（长期）：PurgeCSS 优化未使用的样式

## Validation

### 验证标准

- [ ] Tailwind 正确安装并配置
- [ ] PostCSS 正确处理 Tailwind directives
- [ ] 开发服务器启动无错误
- [ ] 构建输出包含正确的 Tailwind 样式
- [ ] 现有组件样式不受影响
- [ ] CSS 变量与 Tailwind theme 正确集成
- [ ] 文档包含 Tailwind 使用指南

### 测试场景

1. **开发环境测试**
   - 启动 dev server，检查 Tailwind 类生效
   - 热更新正常工作
   - 样式修改实时响应

2. **构建产物测试**
   - 构建组件库，检查样式正确打包
   - 未使用的 Tailwind 类被正确移除
   - CSS 变量和 Tailwind 样式共存

3. **兼容性测试**
   - 现有 Button 组件样式不受影响
   - CSS 变量主题切换正常工作
   - 文档站点样式正确显示

## References

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Vite + Tailwind CSS 指南](https://tailwindcss.com/docs/guides/vite)
- [在 Vue 3 中使用 Tailwind](https://tailwindcss.com/docs/guides/vue-3-vite)
