/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 12:56:48
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 15:54:53
 */

import { defineStore } from 'pinia'

const useUser = defineStore('user', {
  state() {
    return {
      list: [],
      total: 0
    }
  },

  getters: {},
  actions: {}
})

export default useUser
