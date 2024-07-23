<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-22 18:56:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 20:53:28
-->

<template>
  <div class="app_menus">
    <div class="top">
      <img class="icon" src="~@/assets//images//pinia.svg" alt="" />
      <div class="text">{{ message }}</div>
    </div>
    <div class="menus">
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        background-color="#75d67b"
        text-color="#ffffff"
        active-text-color="#f9db61"
        :collapse="closeMenus"
      >
        <template v-for="(item, index) in menus" :key="item.id">
          <!-- 二级菜单 -->
          <template v-if="item.type === 1">
            <!-- 二级菜单可以展开的标题 -->
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon><component :is="icons[index]" /></el-icon>
                <span v-if="item.name">{{ item.name }}</span>
              </template>
              <!-- 遍历里边的item -->
              <template v-for="subItem in item.children" :key="subItem.id">
                <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                  <template #title>
                    <span v-if="subItem.name">{{ subItem.name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineProps({
  closeMenus: {
    type: Boolean,
    default: false
  }
})

const message = ref<string>('')
const menus = localCache.getCache('menuUser')
const router = useRouter()
const icons = [Monitor, Setting, Goods, ChatLineRound]

function handleMenuItemClick(item: any) {
  router.push({
    path: item.url ?? '/404'
  })
}
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // background-color: #e1b13a;
  background-color: #75d67b;

  .icon {
    width: 30px;
    height: 100%;
    transform: skew(-10deg, 10deg);
  }

  .text {
    color: #594e87;
    font-size: 16px;
  }
}
</style>
