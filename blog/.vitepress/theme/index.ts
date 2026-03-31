import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  
  setup() {
    const route = useRoute()
    let rainbowStyle: HTMLStyleElement | undefined
  }
}
