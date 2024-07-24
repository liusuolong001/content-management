/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 17:56:41
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 11:14:11
 */

import { defineStore } from 'pinia'
import type { IBreadcrumb } from '@/views/main/type'

const useMain = defineStore('main', {
  /*   persist: {
    key: 'my-custom-key'
  }, */
  state() {
    return {
      breadcrumb: []
    }
  },
  getters: {},
  actions: {}
})

export default useMain
