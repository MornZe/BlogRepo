import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'
import './rainbow.css'

export default {
  extends: DefaultTheme,
  
  setup() {
    const route = useRoute()
    let rainbowStyle: HTMLStyleElement | undefined

    // 监听路由变化，仅在首页添加彩虹动画
    watch(
      () => route.path,
      () => {
        if (typeof window === 'undefined') return
        
        const isHome = route.path === '/' || route.path === '/index.html'
        
        if (isHome) {
          document.documentElement.classList.add('rainbow-animation')
          
          // 可选：添加动态背景粒子效果
          if (!rainbowStyle) {
            rainbowStyle = document.createElement('style')
            rainbowStyle.textContent = `
              .VPContent::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(
                  ellipse at 50% 50%,
                  rgba(189, 52, 254, 0.08) 0%,
                  transparent 50%
                );
                pointer-events: none;
                z-index: -1;
                animation: pulse 8s ease-in-out infinite;
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 0.8; transform: scale(1.1); }
              }
            `
            document.head.appendChild(rainbowStyle)
          }
        } else {
          document.documentElement.classList.remove('rainbow-animation')
          rainbowStyle?.remove()
          rainbowStyle = undefined
        }
      },
      { immediate: true }
    )
  }
}
