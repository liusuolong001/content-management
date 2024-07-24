/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 12:22:42
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 15:54:34
 */
export interface IStatusOption {
  label: string
  value: number
}

export interface IPagination {
  offset: number
  size: number
}

export interface ISearchForm {
  name: string
  cellphone: string
  enable: number
  realname: string
}
