import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('../modules/**/*.ts', {
  eager: true,
  import: 'default'
})

const routes: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key] || {}
  let modRoutesList = []
  if (Array.isArray(modulesRoutes)) {
    modRoutesList = [...modulesRoutes]
  } else {
    modRoutesList = [modulesRoutes]
  }
  routes.push(...modRoutesList)
})

// 根目录
const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/home'
}

// 404页面
const notFoundPage: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('~/views/404Page.vue')
}

export default [rootRoute, ...routes, notFoundPage]
