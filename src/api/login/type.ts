/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-22 02:26:51
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-22 02:26:57
 */
export interface ILoginResponse<T = any> {
  code: number
  data: T
}

export interface ILoginResponseData {
  id: number
  name: string
  token: string
}
