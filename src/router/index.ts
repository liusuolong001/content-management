/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 02:01:12
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
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
  const token = localStorage.getItem('token')
  if (!token && to.path != '/login') {
    return '/login'
  }
})

export default router
