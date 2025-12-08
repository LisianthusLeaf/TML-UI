# component-library-infrastructure Spec Delta

**Change ID:** `add-tailwind-css`

## MODIFIED Requirements

### Requirement: 样式系统

The component library MUST provide a flexible styling system that supports both Tailwind CSS utility classes and CSS variables for theme customization.

**优先级:** P0  
**类型:** 功能性

#### Scenario: 使用 Tailwind utility 类构建组件

**Given** 开发者创建新组件  
**When** 使用 Tailwind utility 类（如 `px-4`, `py-2`, `bg-primary`）  
**Then** 样式应该正确应用到组件  
**And** 开发服务器支持热更新  
**And** 构建产物包含必要的 Tailwind 样式

#### Scenario: Tailwind 主题与 CSS 变量集成

**Given** 项目配置了 CSS 变量主题  
**When** 在 Tailwind 配置中引用 CSS 变量（如 `colors.primary: 'var(--tml-color-primary)'`）  
**Then** Tailwind 类应该使用 CSS 变量的值  
**And** 主题切换时 Tailwind 类的颜色应该相应变化

#### Scenario: PurgeCSS 优化未使用样式

**Given** 项目使用了部分 Tailwind 类  
**When** 执行生产构建 `npm run build`  
**Then** 未使用的 Tailwind 样式应该被自动移除  
**And** 最终打包体积应该经过优化  
**And** 只包含项目中实际使用的样式类

#### Scenario: 开发者查阅样式系统文档

**Given** 开发者需要了解如何编写组件样式  
**When** 访问文档中的样式系统指南  
**Then** 应该有清晰的 Tailwind 使用说明  
**And** 应该包含 Tailwind 与 CSS 变量混合使用的示例  
**And** 应该说明何时使用 Tailwind，何时使用自定义 CSS

## ADDED Requirements

### Requirement: Tailwind CSS 配置

The project MUST include Tailwind CSS configuration files to enable utility-first CSS development.

**优先级:** P0  
**类型:** 功能性

#### Scenario: Tailwind 正确扫描项目文件

**Given** 项目配置了 `tailwind.config.js`  
**When** `content` 配置包含所有源文件路径（`src/**/*.{vue,js,ts,jsx,tsx}`, `docs/**/*.{md,vue}`）  
**Then** Tailwind 应该正确检测所有使用的 utility 类  
**And** 构建时包含所有需要的样式  
**And** 开发时新增的类能立即生效

#### Scenario: 自定义主题配置

**Given** 开发者需要扩展 Tailwind 默认主题  
**When** 在 `tailwind.config.js` 的 `theme.extend` 中添加自定义配置  
**Then** 自定义的颜色、间距、圆角等应该可用  
**And** 可以通过 Tailwind 类使用这些自定义值  
**And** 自定义配置与 CSS 变量保持一致

### Requirement: PostCSS 集成

The project MUST use PostCSS to process Tailwind directives and auto-prefix CSS.

**优先级:** P0  
**类型:** 功能性

#### Scenario: PostCSS 处理 Tailwind directives

**Given** 样式文件包含 `@tailwind` directives  
**When** Vite 构建或开发服务器启动  
**Then** PostCSS 应该将 Tailwind directives 转换为实际 CSS  
**And** Autoprefixer 应该添加必要的浏览器前缀  
**And** 最终生成的 CSS 在目标浏览器中正常工作

#### Scenario: PostCSS 配置正确加载

**Given** 项目根目录有 `postcss.config.js`  
**When** Vite 启动或构建  
**Then** 应该自动加载 PostCSS 配置  
**And** 应该按顺序执行 tailwindcss 和 autoprefixer 插件  
**And** 不应该有配置加载错误

### Requirement: 向后兼容性

The Tailwind CSS integration MUST NOT break existing components using CSS variables and custom CSS.

**优先级:** P0  
**类型:** 非功能性

#### Scenario: 现有组件样式不受影响

**Given** 项目中有使用 CSS 变量和自定义 CSS 的现有组件  
**When** 集成 Tailwind CSS 后  
**Then** 现有组件的样式应该完全不受影响  
**And** CSS 变量主题切换功能正常工作  
**And** 所有现有测试用例应该通过

#### Scenario: 渐进式采用 Tailwind

**Given** 开发者想在新组件中使用 Tailwind  
**When** 创建新组件时混合使用 Tailwind 类和 CSS 变量  
**Then** 两种样式方式应该可以共存  
**And** 不应该有样式冲突  
**And** 组件功能正常

## Implementation Notes

### Tailwind 配置示例

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

### PostCSS 配置示例

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

### 样式文件更新

在 `src/styles/base.css` 中添加 Tailwind directives：

```css
/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 现有 CSS 变量保持不变 */
:root {
  --tml-color-primary: #409eff;
  /* ... 其他变量 ... */
}
```

### 最佳实践

1. **布局和间距**：优先使用 Tailwind utility 类
2. **主题颜色**：通过 CSS 变量保持可定制性
3. **复杂样式**：使用 Scoped CSS 或 `@apply` directive
4. **响应式设计**：利用 Tailwind 的响应式修饰符
