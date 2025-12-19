<template>
  <div class="app_menus">
    <div class="top">
      <div class="text">{{ message }}</div>
    </div>
    <div class="menus">
      <div class="horizontal-parent-menus">
        <!-- 父级菜单反向排列 -->
        <div v-for="(item, index) in reversedMenus" :key="item.id" class="parent-menu-column">
          <!-- 一级菜单标题 -->
          <div
            class="parent-menu-header"
            :class="{ 'active-parent': expandedMenu === item.id }"
            @click="toggleMenu(item.id)"
          >
            <el-icon><component :is="getIcon(item.id)" /></el-icon>
            <span v-if="item.name" class="header-text">{{ item.name }}</span>
            <el-icon class="arrow-icon">
              <component :is="expandedMenu === item.id ? 'ArrowDown' : 'ArrowRight'" />
            </el-icon>
          </div>
        </div>
      </div>

      <!-- 子级菜单保持不变 -->
      <div class="vertical-sub-menus">
        <el-menu
          v-if="expandedMenu"
          :default-active="defaultActive"
          class="el-menu-vertical"
          background-color="#75d67b"
          text-color="#ffffff"
          active-text-color="#f9db61"
          :collapse="closeMenus"
          :unique-opened="true"
        >
          <!-- 获取当前展开父级菜单的子菜单 -->
          <template v-if="currentParentMenu && currentParentMenu.children">
            <template v-for="subItem in currentParentMenu.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <template #title>
                  <span v-if="subItem.name">{{ subItem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pathMapToMenu } from '@/utils/map-menus'
import localCache from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
import { Monitor, Setting, Goods, ChatLineRound, ArrowDown, ArrowRight } from '@element-plus/icons-vue'
import { computed, ref, watch } from 'vue'

defineProps({
  closeMenus: {
    type: Boolean,
    default: false
  }
})

const message = ref<string>('')
const menus = localCache.getCache('menuUser')
const router = useRouter()
const route = useRoute()
const icons = [Monitor, Setting, Goods, ChatLineRound]
const expandedMenu = ref<string | null>(null)
const defaultActive = ref<string>('')

// 获取图标映射
const iconMap = computed(() => {
  const map: Record<string, any> = {}
  menus?.forEach((item: any, index: number) => {
    map[item.id] = icons[index] || Monitor
  })
  return map
})

// 获取当前展开的父级菜单
const currentParentMenu = computed(() => {
  if (!expandedMenu.value || !menus) return null
  return menus.find((item: any) => item.id === expandedMenu.value)
})

// 反转父级菜单顺序（让第二个在第一个左边）
const reversedMenus = computed(() => {
  if (!menus) return []
  // 创建副本并反转
  return [...menus].reverse()
})

function getIcon(menuId: string) {
  return iconMap.value[menuId] || Monitor
}

function handleMenuItemClick(item: any) {
  defaultActive.value = item.id + ''
  router.push({
    path: item.url ?? '/404'
  })
}

function toggleMenu(menuId: string) {
  expandedMenu.value = expandedMenu.value === menuId ? null : menuId

  // 如果展开菜单，设置默认激活项
  if (expandedMenu.value && currentParentMenu.value?.children?.length) {
    const firstChild = currentParentMenu.value.children[0]
    defaultActive.value = firstChild.id + ''
  }
}

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    const pathMenus = pathMapToMenu(menus, newPath)
    if (pathMenus) {
      defaultActive.value = pathMenus.id + ''

      // 找到包含该子菜单的父级菜单并展开
      if (menus) {
        const parentMenu = menus.find((item: any) => item.children?.some((child: any) => child.id === pathMenus.id))
        if (parentMenu) {
          expandedMenu.value = parentMenu.id
        }
      }
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.app_menus {
  height: 100%;
  background-color: #75d67b;
  display: flex;
  flex-direction: column;
}

.top {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #75d67b;
  flex-shrink: 0;

  .text {
    color: #594e87;
    font-size: 16px;
    font-weight: bold;
  }
}

.menus {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.horizontal-parent-menus {
  display: flex;
  flex-direction: row-reverse; /* 反向排列，第二个在第一个左边 */
  justify-content: flex-end; /* 从右边开始排列 */
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  padding: 10px 15px;
  gap: 15px;
}

.parent-menu-column {
  display: flex;
}

.parent-menu-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &.active-parent {
    background-color: #f9db61;
    color: #333;
    font-weight: bold;
    border-color: #e6c34a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .header-text {
    margin-left: 10px;
    flex-grow: 1;
    font-size: 14px;
    font-weight: 500;
  }

  .arrow-icon {
    margin-left: 10px;
    font-size: 12px;
  }
}

.vertical-sub-menus {
  flex: 1;
  overflow-y: auto;
  padding: 15px;

  .el-menu-vertical {
    border-right: none;
    background-color: transparent;

    .el-menu-item {
      margin-bottom: 5px;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }

      &.is-active {
        background-color: #f9db61 !important;
        color: #333 !important;
        font-weight: bold;
      }
    }
  }
}
</style>
