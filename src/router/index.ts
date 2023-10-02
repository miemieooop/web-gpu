import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'

import routes from './routes/index'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * 路由初始化函数
 * @param app
 */
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
