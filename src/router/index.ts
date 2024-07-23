/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 12:27:00
 */
import { createRouter, createWebHistory } from 'vue-router'
import localCache from '@/utils/cache'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

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
      component: () => import(/* webpackChunkName: "main" */ '@/views/main/index.vue')
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
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (!token && to.path === '/main') {
    return '/login'
  }
})

export default router
