/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 17:56:41
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-21 18:12:07
 */

import { defineStore } from 'pinia'

const useHome = defineStore('login', {
  /*   persist: {
    key: 'my-custom-key'
  }, */
  state() {
    return {
      counter: 199
    }
  },
  getters: {},
  actions: {}
})

export default useHome
