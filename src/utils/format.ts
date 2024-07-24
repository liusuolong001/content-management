/*
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-24 14:50:25
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 14:54:31
 */

import dayjs from 'dayjs'

/**
 * @description: 处理时间
 * @param {string} time
 * @return {*}
 */
export function formatTime(time: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(time).format(format)
}
