<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-23 09:45:44
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 11:41:19
-->

<template>
  <div class="header">
    <div class="left">
      <el-icon @click="handleCollapse"><component :is="closeMenus ? 'CircleCheck' : 'CircleClose'" /></el-icon>
      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <template v-for="(item, index) in breadcrumb" :key="index">
            <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
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
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLogin from '@/stores/login'
import localCache from '@/utils/cache'
import { ArrowRight } from '@element-plus/icons-vue'
import { pathMapBreadcrumbs, firstMenu } from '@/utils/map-menus'
import type { IHeaderList, IBreadcrumb } from '../type'

/* 发射关闭菜单事件 子组件 */
const emit = defineEmits(['closeMenus'])

const router = useRouter()
const route = useRoute()
const storeLogin = useLogin()
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

/* 退出操作 */
function handleClose(i: IHeaderList) {
  localCache.removeCache('token')
  router.push({
    path: '/login'
  })
}

/* 顶部面包屑实现 默认监听一次 */
const breadcrumb = ref<IBreadcrumb[]>([])

watch(
  () => route.path,
  (newValue) => {
    breadcrumb.value = pathMapBreadcrumbs(storeLogin.menuUser, newValue)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .left {
    cursor: pointer;
    display: flex;
    align-items: center;

    .el-icon {
      color: white;
    }

    :deep(.el-breadcrumb__inner) {
      color: white;
    }
    :deep(.el-breadcrumb__separator) {
      color: white;
    }

    .breadcrumb {
      padding-left: 10px;
    }
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
