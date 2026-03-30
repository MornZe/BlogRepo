# VitePress-Blog

琪初基于VitePress 2.0.0 Alpha 16开发搭建的博客，使用CNB托管代码、通过CNB流水线语法自动推送代码至Github，由Vercel驱动。

已知问题：由于代码获取Vercel环境变量来读取Commit ID导致页脚暂时只能显示Github Commit ID，后续更新将在CNB推送阶段获取Commit ID打包味文件连带推送至Github，以实现将Vercel环境变量替换为CNB.Cool
