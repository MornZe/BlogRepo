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
const branch = process.env.VERCEL_GIT_COMMIT_REF || 'unknown'
const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || 'MornZe'
const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || 'BlogRepo'
const commitUrl = `https://github.com/${repoOwner}/${repoSlug}/commit/${commitId}`

const gitIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:4px"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`

const branchIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`

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
      message: `<a href="${commitUrl}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;color:var(--vp-c-text-2);text-decoration:none">${gitIcon}<code style="background:var(--vp-c-bg-soft);padding:2px 6px;border-radius:4px;font-size:12px">${commitId}</code></a> <span style="color:var(--vp-c-divider);margin:0 8px">·</span> <span style="display:inline-flex;align-items:center;color:var(--vp-c-text-2);font-size:12px">${branchIcon}${branch}</span>`,
      copyright: '基于 MIT 许可发布 · Copyright © 2026 MornZe'
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
