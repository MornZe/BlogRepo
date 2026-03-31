// scripts/generate-posts.js
import { generateSidebar } from 'vitepress-sidebar'
import fs from 'fs'
import path from 'path'

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

// 扁平化并添加前缀
const flatten = (items, prefix) => {
 const result = []
 const walk = (arr) => {
   arr.forEach(item => {
     if (item.link) {
       result.push({
         text: item.text,
         link: prefix + item.link.replace(/^\//, '')
       })
     }
     if (item.items) walk(item.items)
   })
 }
 walk(items)
 return result
}

const techPosts = flatten(Array.isArray(techRaw) ? techRaw : [], '/tech/')
const archivePosts = flatten(Array.isArray(archiveRaw) ? archiveRaw : [], '/archive/')

const now = new Date().toLocaleString('zh-CN', {
 year: 'numeric',
 month: '2-digit',
 day: '2-digit',
 hour: '2-digit',
 minute: '2-digit',
 second: '2-digit'
})

const content = `# 文章列表

这里是我写过的、目前已经上传到博客的所有文章列表，更多可以看 关于我：[https://qitry.vip/about.html](https://qitry.vip/about.html)  
最后更新于 ${now}

## 技术随笔（${techPosts.length}篇）

${techPosts.map(p => `- 《[${p.text}](${p.link})》`).join('\n') || '*暂无文章*'}

## 无病呻吟（${archivePosts.length}篇）

${archivePosts.map(p => `- 《[${p.text}](${p.link})》`).join('\n') || '*暂无文章*'}
`

fs.writeFileSync(path.resolve('blog/posts.md'), content)
console.log('posts.md 生成完成')
