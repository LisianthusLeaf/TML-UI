# Login 登录页面

带有星座背景动画和行星环登录按钮的第三方登录页面。

<a href="/TML-UI/pages/login-fullscreen" class="preview-btn" target="_blank">
  <span>全屏预览</span>
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path fill="currentColor" d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
  </svg>
</a>

<style>
.preview-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  margin-bottom: 16px;
}
.preview-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  color: #fff;
}
</style>

## 特性说明

| 特性 | 说明 |
| --- | --- |
| 星座背景 | Canvas 绘制的动态星空，星座缓慢旋转 |
| 行星环登录 | 登录按钮沿椭圆环分布，悬停展开显示登录方式名称 |
| 流动光点 | 行星环上有流动的发光粒子效果 |
| 云层动画 | 半透明云层缓慢漂浮 |
| 毛玻璃效果 | 按钮和卡片使用 `backdrop-filter` 实现毛玻璃效果 |
| 第三方登录 | 支持 QQ、微信、GitHub、Google 登录 |
| 服务条款抽屉 | 可展开/收起的服务条款卡片 |
| 响应式布局 | 移动端自动切换为垂直布局 |
