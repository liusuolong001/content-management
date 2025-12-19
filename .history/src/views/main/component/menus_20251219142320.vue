<template>
  <div class="app_menus">
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <div class="logo-area">
        <div class="text">{{ message }}</div>
      </div>

      <!-- 水平排列的一级菜单 -->
      <el-menu
        :default-active="defaultActive"
        class="horizontal-menu"
        mode="horizontal"
        background-color="#75d67b"
        text-color="#ffffff"
        active-text-color="#f9db61"
        :unique-opened="true"
      >
        <template v-for="(item, index) in topMenus" :key="item.id">
          <!-- 有子菜单的一级菜单项 -->
          <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :index="item.id + ''"
            popper-class="vertical-menu-popper"
          >
            <template #title>
              <el-icon><component :is="icons[index % icons.length]" /></el-icon>
              <span v-if="item.name">{{ item.name }}</span>
            </template>
            <!-- 垂直排列的二级子菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <template #title>
                  <span v-if="subItem.name">{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>

          <!-- 没有子菜单的一级菜单项 -->
          <el-menu-item v-else :index="item.id + ''" @click="handleMenuItemClick(item)">
            <el-icon><component :is="icons[index % icons.length]" /></el-icon>
            <template #title>
              <span v-if="item.name">{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="user-area"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pathMapToMenu } from '@/utils/map-menus'
import localCache from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'

// 定义props
defineProps({
  closeMenus: {
    type: Boolean,
    default: false
  }
})

const message = ref<string>('系统管理')
const router = useRouter()
const route = useRoute()
const icons = [Monitor, Setting, Goods, ChatLineRound]

// 获取菜单数据
const menus = localCache.getCache('menuUser')

// 提取一级菜单（假设type===1的是一级菜单）
const topMenus = computed(() => {
  if (!menus || !Array.isArray(menus)) return []
  return menus.filter((item) => item.type === 1)
})

// 菜单项点击处理
function handleMenuItemClick(item: any) {
  if (item.url) {
    router.push({
      path: item.url ?? '/404'
    })
  }
}

// 计算当前激活的菜单项
const pathMenus = pathMapToMenu(menus, route.path)
const defaultActive = ref<string>(pathMenus ? pathMenus.id + '' : '')

// 监听路由变化，更新激活菜单
watch(
  () => route.path,
  (newPath) => {
    const menu = pathMapToMenu(menus, newPath)
    if (menu) {
      defaultActive.value = menu.id + ''
    }
  }
)
</script>

<style lang="less" scoped>
.app_menus {
  width: 100%;
}

.top-navbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #75d67b;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    height: 100%;

    .text {
      color: #594e87;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .horizontal-menu {
    flex: 1;
    height: 100%;
    border-bottom: none;

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 60px;
      line-height: 60px;
      font-size: 16px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }

      .el-icon {
        margin-right: 8px;
        font-size: 18px;
      }
    }

    :deep(.el-sub-menu) {
      .el-menu {
        // 下拉菜单样式
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .el-menu-item {
        height: 48px;
        line-height: 48px;
        min-width: 160px;
        font-size: 14px;

        &:hover {
          background-color: #f0f9ff !important;
          color: #409eff !important;
        }
      }
    }

    :deep(.el-menu-item.is-active) {
      background-color: rgba(249, 219, 97, 0.2) !important;
      border-bottom: 3px solid #f9db61;
    }
  }

  .user-area {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    height: 100%;
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .top-navbar {
    flex-wrap: wrap;
    height: auto;

    .logo-area {
      min-width: 100%;
      height: 60px;
    }

    .horizontal-menu {
      min-width: 100%;
    }

    .user-area {
      min-width: 100%;
      height: 60px;
    }
  }
}
</style>

<style lang="less">
/* 全局样式，用于自定义下拉菜单 */
.vertical-menu-popper {
  .el-menu {
    border: none;
    border-radius: 4px;
    overflow: hidden;

    .el-menu-item {
      transition: all 0.3s;

      &:hover {
        transform: translateX(5px);
      }
    }
  }
}
</style>
