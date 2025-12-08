# Change Proposal: add-grid-layout-components

## Summary

添加 TRow 和 TCol 网格布局组件,提供响应式布局系统,支持从 576px 到 2160px 的多种屏幕尺寸。

## Background

当前组件库缺少布局组件,开发者需要自己处理响应式布局逻辑。TRow 和 TCol 组件将提供类似 Bootstrap、Ant Design 等成熟 UI 框架的网格系统,基于 24 栏栅格,支持多种响应式断点,简化响应式布局开发。

## Motivation

1. **统一布局方案**: 提供标准化的栅格布局系统,保持项目布局一致性
2. **响应式设计**: 支持 5 个响应式断点(sm/md/lg/xl/xxl),覆盖 576px-2160px 屏幕范围
3. **灵活性**: 支持 span/offset/push/pull 等多种布局控制方式
4. **易用性**: 简洁的 API 设计,降低学习成本

## Goals

- 实现 TRow 行容器组件,支持 flex 布局和多种对齐方式
- 实现 TCol 列组件,基于 24 栏栅格系统
- 支持 5 个响应式断点: `sm`(≥576px), `md`(≥768px), `lg`(≥992px), `xl`(≥1200px), `xxl`(≥1600px)
- 支持列宽(span)、偏移(offset)、推拉(push/pull)等布局特性
- 支持行内列间距(gutter)配置
- 提供完整的 TypeScript 类型定义
- 编写单元测试,确保功能稳定性
- 提供详细的文档和示例

## Non-Goals

- 不实现 CSS Grid 布局方案(仅使用 Flexbox)
- 不支持小于 576px 的断点(移动端优先但不支持超小屏幕特定配置)
- 不提供预设的常见布局模板

## Proposed Solution

### 技术方案

1. **TRow 组件**:
   - 使用 Flexbox 布局
   - Props: `gutter`(间距), `justify`(水平对齐), `align`(垂直对齐)
   - 通过 CSS 变量传递 gutter 值给子 TCol 组件

2. **TCol 组件**:
   - 基于 24 栏栅格系统
   - Props: `span`(占据列数), `offset`(偏移列数), `push`/`pull`(定位)
   - 响应式 Props: `sm`, `md`, `lg`, `xl`, `xxl` (对象形式配置响应式行为)
   - 使用 CSS `calc()` 和百分比实现栅格布局

3. **响应式断点**:
   ```typescript
   const breakpoints = {
     sm: 576,   // 小屏幕及以上
     md: 768,   // 中等屏幕及以上
     lg: 992,   // 大屏幕及以上
     xl: 1200,  // 超大屏幕及以上
     xxl: 1600  // 超超大屏幕及以上(覆盖到 2160px)
   }
   ```

4. **样式实现**:
   - 使用媒体查询实现响应式
   - 生成 24 列的栅格类
   - 支持通过 CSS 变量自定义间距

### API 设计

#### TRow 组件

```vue
<TRow :gutter="16" justify="start" align="top">
  <TCol :span="12">Column 1</TCol>
  <TCol :span="12">Column 2</TCol>
</TRow>
```

Props:
- `gutter?: number | [number, number]` - 栅格间距,支持水平/垂直间距
- `justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'`
- `align?: 'top' | 'middle' | 'bottom' | 'stretch'`
- `wrap?: boolean` - 是否自动换行,默认 true

#### TCol 组件

```vue
<TCol 
  :span="24" 
  :offset="0"
  :sm="12"
  :md="{span: 8, offset: 2}"
  :lg="{span: 6, pull: 1}"
>
  Content
</TCol>
```

Props:
- `span?: number` - 栅格占据的列数(0-24)
- `offset?: number` - 栅格左侧的间隔格数
- `push?: number` - 栅格向右移动格数
- `pull?: number` - 栅格向左移动格数
- `sm?: number | ColConfig` - ≥576px 响应式栅格配置
- `md?: number | ColConfig` - ≥768px 响应式栅格配置
- `lg?: number | ColConfig` - ≥992px 响应式栅格配置
- `xl?: number | ColConfig` - ≥1200px 响应式栅格配置
- `xxl?: number | ColConfig` - ≥1600px 响应式栅格配置

ColConfig 类型:
```typescript
interface ColConfig {
  span?: number
  offset?: number
  push?: number
  pull?: number
}
```

## Alternatives Considered

1. **使用 CSS Grid 替代 Flexbox**:
   - 优点: 更强大的二维布局能力
   - 缺点: 浏览器兼容性较差,学习曲线较陡
   - 决策: 选择 Flexbox,兼容性更好,满足大多数场景

2. **12 栏栅格 vs 24 栏栅格**:
   - 12 栏: 更简单,但灵活性较低
   - 24 栏: 更灵活,支持更精细的布局控制
   - 决策: 选择 24 栏,与主流 UI 框架保持一致

3. **移动端优先 vs 桌面端优先**:
   - 决策: 移动端优先,但起始断点为 576px(不支持超小屏特定配置)

## Impact Assessment

### Breaking Changes
无,这是新增功能,不影响现有组件。

### Performance Impact
- 使用 Flexbox 和 CSS 媒体查询,性能影响可忽略
- 组件渲染性能良好,适合大量使用

### Documentation Impact
需要新增文档:
- 组件 API 文档
- 响应式布局指南
- 常见布局示例(2 列/3 列/侧边栏布局等)

### Testing Impact
需要新增测试:
- TRow 组件渲染测试
- TCol 组件渲染测试
- 响应式 Props 测试
- Gutter 间距测试
- 对齐方式测试

## Timeline

- 规格编写: 0.5 天
- TRow 组件开发: 1 天
- TCol 组件开发: 1.5 天
- 单元测试: 1 天
- 文档编写: 0.5 天
- Code Review 和优化: 0.5 天

总计: 约 5 天

## Open Questions

1. 是否需要支持嵌套栅格(Row 嵌套 Row)?
   - 建议: 支持,这是常见需求
   
2. Gutter 的默认值应该是多少?
   - 建议: 默认 0,由用户按需设置
   
3. 是否需要提供 `order` prop 来控制 flex order?
   - 建议: 后续版本再考虑,保持初版简洁

## Success Criteria

- [x] TRow 和 TCol 组件功能完整,API 清晰
- [x] 支持所有声明的响应式断点
- [x] 单元测试覆盖率 ≥ 80%
- [x] 文档包含至少 5 个实际使用示例
- [x] 通过 Code Review,无重大问题
- [x] 性能测试通过,无明显性能问题
