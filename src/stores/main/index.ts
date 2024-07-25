/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 17:56:41
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 18:31:12
 */

import { defineStore } from 'pinia'
import type { IBreadcrumb } from '@/views/main/type'
import localCache from '@/utils/cache'

const useMain = defineStore('main', {
  /*   persist: {
    key: 'my-custom-key'
  }, */
  state() {
    return {
      breadcrumb: [],
      lang: localCache.getCache('lang') ?? 'zhCn'
    }
  },
  getters: {},
  actions: {}
})

export default useMain
