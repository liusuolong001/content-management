<template>
  <div class="app_menus">
    <div class="top">
      <div class="text">{{ message }}</div>
    </div>
    <div class="menus">
      <div class="horizontal-menus-container">
        <div v-for="(item, index) in menus" :key="item.id" class="menu-column">
          <!-- 一级菜单标题 -->
          <div class="menu-header" @click="toggleMenu(item.id)">
            <el-icon><component :is="icons[index]" /></el-icon>
            <span v-if="item.name" class="header-text">{{ item.name }}</span>
            <el-icon class="arrow-icon">
              <component :is="expandedMenu === item.id ? 'ArrowDown' : 'ArrowRight'" />
            </el-icon>
          </div>

          <!-- 二级菜单项 - 水平平铺在左边 -->
          <div v-if="expandedMenu === item.id && item.children" class="horizontal-items">
            <div
              v-for="(subItem, subIndex) in item.children"
              :key="subItem.id"
              class="menu-item-wrapper"
              :style="{ order: subIndex === 0 ? 2 : subIndex === 1 ? 1 : subIndex + 2 }"
            >
              <div
                class="menu-item"
                :class="{ active: activeItem === subItem.id }"
                @click="handleMenuItemClick(subItem)"
              >
                <span v-if="subItem.name">{{ subItem.name }}</span>
              </div>
            </div>
          </div>
        </div>
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
const activeItem = ref<string>('')

function handleMenuItemClick(item: any) {
  activeItem.value = item.id
  router.push({
    path: item.url ?? '/404'
  })
}

function toggleMenu(menuId: string) {
  expandedMenu.value = expandedMenu.value === menuId ? null : menuId
}

const pathMenus = pathMapToMenu(menus, route.path)
</script>

<style lang="less" scoped>
.app_menus {
  height: 100%;
  background-color: #75d67b;
}

.top {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #75d67b;

  .text {
    color: #594e87;
    font-size: 16px;
    font-weight: bold;
  }
}

.horizontal-menus-container {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  overflow-y: auto;
}

.menu-column {
  padding: 10px 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  &:last-child {
    border-bottom: none;
  }
}

.menu-header {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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

.horizontal-items {
  display: flex;
  flex-direction: row-reverse; /* 从右向左排列 */
  flex-wrap: wrap;
  justify-content: flex-end; /* 右对齐 */
  gap: 8px;
  margin-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;

  /* 使用 order 属性控制顺序 */
  .menu-item-wrapper {
    order: 0;
  }
}

.menu-item {
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  color: #ffffff;
  font-size: 13px;
  border: 1px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &.active {
    background-color: #f9db61;
    color: #333;
    font-weight: bold;
    border-color: #e6c34a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

/* 设置特定顺序：第二个在第一个左边 */
.horizontal-items .menu-item-wrapper:nth-child(1) {
  order: 2; /* 第一个在第二位 */
}

.horizontal-items .menu-item-wrapper:nth-child(2) {
  order: 1; /* 第二个在第一位（最左边） */
}

/* 从第三个开始按顺序排列 */
.horizontal-items .menu-item-wrapper:nth-child(n + 3) {
  order: 3; /* 第三个及以后在第三位及以后 */
}

/* 处理超过3个的情况 */
.horizontal-items .menu-item-wrapper:nth-child(4) {
  order: 4;
}
.horizontal-items .menu-item-wrapper:nth-child(5) {
  order: 5;
}
.horizontal-items .menu-item-wrapper:nth-child(6) {
  order: 6;
}
/* 可以继续添加更多... */
</style>
