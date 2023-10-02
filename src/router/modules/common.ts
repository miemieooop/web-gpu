import type { RouteRecordRaw } from 'vue-router'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('~/views/homePage.vue'),
    children: [
      {
        path: 'my-demander',
        component: () => import('~/views/myDemander/demanderPage.vue')
      }
    ]
  }
]

export default routes
