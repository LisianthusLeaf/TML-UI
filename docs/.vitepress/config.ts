import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TML UI',
  description: 'A Vue 3 Component Library built with TypeScript',
  lang: 'zh-CN',
  base: '/TML-UI/',
  
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: '指令', link: '/directives/upload' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/quick-start' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' }
          ]
        },
        {
          text: '布局组件',
          items: [
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'Waterfall 瀑布流', link: '/components/waterfall' }
          ]
        }
      ],
      '/directives/': [
        {
          text: '指令',
          items: [
            { text: 'v-upload 上传', link: '/directives/upload' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/tml-ui' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present'
    }
  }
})
