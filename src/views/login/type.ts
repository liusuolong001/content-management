/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 22:49:10
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 02:36:03
 */

export interface IRegistration {
  name: string
  password: string
  confirmPassword: string
}

export interface ILogin {
  name: string
  password: string
}

// 接口类型 api

export interface IResponse<T = any> {
  code: number
  data: T
}

export interface IResponseData {
  id: number
  name: string
  token: string
}
