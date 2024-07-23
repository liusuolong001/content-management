/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-22 16:09:34
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 18:26:27
 */
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
