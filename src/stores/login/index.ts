/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-22 01:23:24
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 19:33:19
 */
import { defineStore } from 'pinia'
import { login } from '@/api/login'
import localCache from '@/utils/cache'
import type { ILogin } from '@/views/login/type'
import type { IResponse, IResponseData } from '@/types/login'

const useLogin = defineStore('login', {
  state() {
    return {
      id: 0,
      name: '',
      token: localCache.getCache('token') ?? '',
      userInfo: localCache.getCache('userInfo') ?? {}, //角色信息
      menuUser: localCache.getCache('menuUser') ?? [] //所有菜单
    }
  },
  getters: {},
  actions: {
    getLogin(row: ILogin) {
      return new Promise<IResponse<IResponseData>>((resolve, reject) => {
        login(row)
          .then((result) => {
            this.id = result.data.id
            this.name = result.data.name
            this.token = result.data.token
            // 本地保存
            if (this.token) {
              localCache.setCache('token', this.token)
            }
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export default useLogin
