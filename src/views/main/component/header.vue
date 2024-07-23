<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-23 09:45:44
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 23:46:35
-->

<template>
  <div class="header">
    <div class="left" @click="handleCollapse">
      <el-icon><component :is="closeMenus ? 'CircleCheck' : 'CircleClose'" /></el-icon>
    </div>
    <div class="right" @click="openDrawer">
      <img class="images" src="~@/assets//images//liusuolong.jpeg" alt="" />
    </div>

    <!-- 抽屉 -->
    <el-drawer v-model="drawer" width="20%">
      <div class="content" v-for="it in list" :key="it.key" @click="handleClose(it)">
        <el-icon class="text"><component :is="it.icon" /></el-icon>
        <div class="text">{{ it.text }}</div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import type { IHeaderList } from '../type'

/* 发射关闭菜单事件 子组件 */
const emit = defineEmits(['closeMenus'])

const router = useRouter()
const closeMenus = ref<boolean>(false)
const drawer = ref<boolean>(false)
const list = ref<IHeaderList[]>([{ key: 1, icon: `Bell`, text: 'Sign out' }])

function openDrawer() {
  drawer.value = true
}

function handleCollapse() {
  closeMenus.value = !closeMenus.value
  emit('closeMenus', closeMenus.value)
}

/**
 * 退出操作
 */
function handleClose(i: IHeaderList) {
  localCache.removeCache('token')
  router.push({
    path: '/login'
  })
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .left {
    cursor: pointer;
  }

  .right {
    width: 35px;
    height: 35px;
    cursor: pointer;

    .images {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  :deep(.el-drawer) {
    cursor: pointer;
    font-size: 13px;
    width: 14% !important; /* 自定义宽度 */
    border-radius: 13px 0 0 13px;

    .el-drawer__header {
      margin-bottom: 0;
    }

    .content {
      height: 30px;
      display: flex;
      align-items: center;
      border-radius: 10px;

      .text {
        padding-left: 8px;
      }

      &:hover {
        background-color: #f5f5f6;
      }
    }
  }
}
</style>
