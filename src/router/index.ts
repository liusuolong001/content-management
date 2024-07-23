/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 00:05:24
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import(/* webpackChunkName: "main" */ '@/views/main/index.vue'),
      children: []
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
    }
  ]
})

/**
 * 路由守卫 防止通过地址栏跳转到内容页面
 */
router.beforeEach(async (to) => {
  const token = localCache.getCache('token')
  if (!token && to.path === '/main') {
    return '/login'
  }
})

export default router
