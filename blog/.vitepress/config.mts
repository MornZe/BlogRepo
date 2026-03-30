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
const repoOwner = process.env.VERCEL_GIT_REPO_OWNER || 'MornZe-Dev'
const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || 'VitePress-Blog'
const commitUrl = `https://github.com/${repoOwner}/${repoSlug}/commit/${commitId}`

const gitIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:3px;display:inline-block">
  <circle cx="7" cy="6" r="1.8" />
  <circle cx="7" cy="18" r="1.8" />
  <circle cx="17" cy="6" r="1.8" />
  <path d="M7 8v8" fill="none"/>
  <path d="M9 18h6a2 2 0 0 0 2-2v-5" fill="none"/>
  <path d="M14 14l3-3l3 3" fill="none"/>
</svg>`

const vercelIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="vertical-align:-2px;margin:0 4px;display:inline-block">
  <path d="M12 2L2 22h20L12 2z"/>
</svg>`

export default defineConfig({
  lang: 'zh-CN',
  title: "QiTryBlog",
  description: "QiTry's VitePress Blog",
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
      copyright: `
Copyright © 2026 QiTry 
· <a href="${commitUrl}" target="_blank" rel="noopener" style="color:var(--vp-c-text-2);text-decoration:none;white-space:nowrap">
${gitIcon}${commitId}@${branch}
</a><br/>
-- 本站由 ${vercelIcon}Vercel 强力赞助驱动  · 用<span style="color:#e25555;font-size:1.2em;vertical-align:-1px;display:inline-block;">❤️</span>创造 --
`
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
      pattern: 'https://cnb.cool/MornZe-Dev/VitePress-Blog/-/edit/main/blog/:path',
      text: '在 CNB.Cool 上编辑此页'
    },

    darkModeSwitchLabel: '切换主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    externalLinkIcon: true
  }
})
