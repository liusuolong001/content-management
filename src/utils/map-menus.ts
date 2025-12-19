import _ from 'lodash'
import type { IBreadcrumb } from '@/views/main/type'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  /**
   * import.meta.glob是vite的工具，第一个参数用来加载某个文件夹;**加载所有子文件
   * 第二个参数eager直接响应不进行懒加载
   */
  const routeFiles: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  console.log('000', routeFiles)

  for (const key in routeFiles) {
    // 从routeFiles中拿到key匹配
    const module = routeFiles[key]
    allRoutes.push(module.default)
    // console.log('@', routeFiles, key, module.default)
    // console.log('allRoutes', allRoutes)
  }
  // 2.根据菜单获取需要添加的routes
  // recurse：递归
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      /**
       * 前端手动测试一级菜单跳转
       */
      if (menu.type === 1) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      }
      // if (menu.type === 2) {
      //   const route = allRoutes.find((route) => route.path === menu.url)
      //   if (route) routes.push(route)
      //   if (!firstMenu) {
      //     firstMenu = menu
      //   }
      // } else {
      //   _recurseGetRoute(menu.children)
      // }
    }
  }

  _recurseGetRoute(userMenus)
  console.log('routes', routes)
  return routes
}

/**
 * @description: 根据路径匹配面包屑
 * @param {any} userMenus
 * @param {string} currentPath
 * @return {*}
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  console.log('userMenus', userMenus)

  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

/**
 * @description: 根据路由去匹配菜单
 * @param {any} userMenus
 * @param {string} currentPath
 * @return {*}
 */
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // const findMenu = pathMapToMenu(menu.children ?? [], currentPath) // 当一级菜单存在 多个二级菜单的时候使用找到对应的路由 需求未定暂时这样做 现将二级菜单隐藏
      const findMenu = _.find(userMenus ?? [], (item) => item.url === currentPath) // 当只有一个一级菜单的时候使用找到对应路由 暂时按照一级菜单做
      // console.log('userMenus', userMenus, 'currentPath', currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: currentPath })
        breadcrumbs?.push({ name: findMenu.name, path: currentPath })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
