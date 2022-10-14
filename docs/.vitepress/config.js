module.exports = {
  title: 'Chrome extensions development',
  themeConfig: {
    logo: '/images/logo-c.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/liyunfei22/chrome-extensions-tutorial' }
    ],
    sidebar: [
      {
        text: 'Chrome extensions 概况',
        items: [
          { text: 'extension 安装', link: '/about/install' },
          { text: 'Hello World', link: '/about/helloWorld'},
          { text: 'Manifest V3', link: '/about/Manifest' },
          { text: '架构概述', link: '/about/architecture' },
          { text: 'API', link: '/about/Api' },
        ]
      },
      {
        text: '核心概念',
        items: [
          { text: 'Service Worker', link: '/core/Service-worker' },
          { text: 'Content Script', link: '/core/Content-script' },
          { text: 'Cross-Origin XHR 跨域请求', link: '/core/Cross-Origin-XHR' },
          { text: 'Storage 存储', link: '/core/Storage' },
          { text: 'Alarms 定时器', link: '/core/alarms' },
          { text: 'UI', link: '/core/UI' },
          { text: 'History', link: '/core/History' },
          { text: 'Bookmark', link: '/core/Bookmark' },
        ]
      }
    ]
  },
  description: 'Chrome extensions 开发入门'
}
