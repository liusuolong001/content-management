/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-23 18:46:22
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 22:26:48
 */
const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue')
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  children: []
}
