import type { RouteRecordRaw } from 'vue-router'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('~/views/homePage.vue')
  },
  {
    path: '/render',
    name: 'render',
    component: () => import('~/views/renderPage.vue')
  }
]

export default routes
