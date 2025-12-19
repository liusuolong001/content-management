import { defineStore } from 'pinia'
import { login } from '@/api/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
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
    },
    loadLocalCacheAction() {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const menuUser = localCache.getCache('menuUser')
      if (token && userInfo && menuUser) {
        const routes = mapMenusToRoutes(menuUser)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  }
})

export default useLogin
