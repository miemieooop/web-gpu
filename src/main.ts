import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupRouter } from '~/router/index'
import { setupStore } from '~/store/index'
import 'virtual:windi.css'

/**
 * 定义启动初始化函数
 */
const bootstrap = () => {
  const app = createApp(App)

  // 安装初始化路由
  setupRouter(app)

  // 安装初始化store
  setupStore(app)

  app.mount('#app')
}

// 启动
bootstrap()
