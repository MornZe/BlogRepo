// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import ViteRestart from 'vite-plugin-restart'
import { generateSidebar } from 'vitepress-sidebar'

const techRaw = generateSidebar({
  documentRootPath: 'blog/tech',
  useTitleFromFileHeading: true,
  sortMenusByFrontmatterOrder: true,
})

const archiveRaw = generateSidebar({
  documentRootPath: 'blog/archive',
  useTitleFromFileHeading: true,
  sortMenusByFrontmatterOrder: true,
})

const addPrefix = (items, prefix) => items.map(item => ({
  text: item.text,
  link: prefix + item.link.replace(/^\//, '')
}))

const techItems = addPrefix(Array.isArray(techRaw) ? techRaw : [], '/tech/')
const archiveItems = addPrefix(Array.isArray(archiveRaw) ? archiveRaw : [], '/archive/')

const commitId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'dev'
const branch = process.env.VERCEL_GIT_COMMIT_REF || 'main'
const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || 'MornZe'
const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || 'BlogRepo'
const commitUrl = `https://github.com/${repoOwner}/${repoSlug}/commit/${commitId}`

const commitIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:2px"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>`

export default defineConfig({
  lang: 'zh-CN',
  title: "MornZeBlog",
  description: "MornZe's VitePress Blog",
  lastUpdated: true,

  vite: {
    plugins: [
      ViteRestart({
        restart: ['blog/**/*.md']
      })
    ]
  },

  themeConfig: {
    logo: 'https://fastly.jsdelivr.net/gh/MornZe/Blog-Static-Resource@main/images/353fa653cdde9ba2.png',

    nav: [
      { text: '网站首页', link: '/' },
      { text: '关于我是谁', link: '/about' },
      { text: '文章索引', link: '/posts' },
      { text: '前往个人主页', link: 'https://zeink.cc/' },
      { text: '使用极简起始页', link: 'https://start.zeink.cc/' },
      {
        text: '我的项目',
        items: [
          { text: 'LogShare', link: 'https://logshare.cn' },
          { text: 'Lemwood Mirror', link: 'https://mirror.lemwood.icu' },
          { text: 'Logshare Headless API', link: 'https://api.logshare.cn/' },
        ]
      },
      { text: '技术随笔', items: techItems },
      { text: '无病呻吟', items: archiveItems },
    ],

    sidebar: [
      { text: '网站首页', link: '/' },
      { text: '关于我是谁', link: '/about' },
      { text: '文章索引', link: '/posts' },
      {
        text: '我的项目',
        collapsed: true,
        items: [
          { text: 'LogShare', link: 'https://logshare.cn' },
          { text: 'Lemwood Mirror', link: 'https://mirror.lemwood.icu' },
          { text: 'Logshare Headless API', link: 'https://api.logshare.cn/' },
        ]
      },
      {
        text: '技术随笔',
        collapsed: false,
        items: techItems
      },
      {
        text: '无病呻吟',
        collapsed: false,
        items: archiveItems
      },
    ],

    footer: {
      message: '代码基于 MIT、文章基于 CC BY-NC-SA 4.0 许可发布',
      copyright: `Copyright © 2026 MornZe · <a href="${commitUrl}" target="_blank" rel="noopener" style="color:var(--vp-c-text-2);text-decoration:none">${commitIcon}${commitId}@${branch}</a>`
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    returnToTopLabel: '回到顶部',
    langMenuLabel: '切换语言',
    skipToContentLabel: '跳转到内容',
    outline: {
      label: '目录',
      level: 'deep'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/MornZe/BlogRepo/edit/main/blog/:path',
      text: '在 GitHub 上编辑此页'
    },
    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    externalLinkIcon: true
  }
})
