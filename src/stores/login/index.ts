/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-22 01:23:24
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 02:27:41
 */
import { defineStore } from 'pinia'
import { login } from '@/api/login'
import type { ILogin } from '@/views/login/type'
import type { ILoginResponse, ILoginResponseData } from '@/api/login/type'

const useLogin = defineStore('login', {
  state() {
    return {
      id: 0,
      name: '',
      token: ''
    }
  },
  getters: {},
  actions: {
    getLogin(row: ILogin) {
      return new Promise<ILoginResponse<ILoginResponseData>>((resolve, reject) => {
        login(row)
          .then((result) => {
            this.id = result.data.id
            this.name = result.data.name
            this.token = result.data.token
            if (this.token) {
              localStorage.setItem('token', this.token)
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
