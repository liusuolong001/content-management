<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-23 09:45:44
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 20:03:28
-->

<template>
  <div class="header">
    <!-- 顶部搜索框 -->
    <div
      id="searchId"
      v-show="renderVnode"
      v-bind:class="[shouldAppear === true ? 'appear-top-button' : 'appear-button-top', 'search']"
    >
      <el-input
        v-model="search"
        placeholder="此搜索只是个人做做Css动画哦🥰～ (二次点击搜索关闭哦)"
        style="padding: 3px 20px 4px 20px"
      >
        <template #prefix>
          <el-icon><component :is="'Search'" /></el-icon>
        </template>
      </el-input>
    </div>
    <!-- header 数据展示 -->
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
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img class="translation" src="~@/assets//images//translation.png" alt=""
        /></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setLocal('enUs')">{{ $t('english') }}</el-dropdown-item>
            <el-dropdown-item @click="setLocal('zhCn')"> {{ $t('chinese') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <img id="translationId" class="translation" src="~@/assets//images//search.png" alt="" @click="searchTop" />
      <img class="images" src="~@/assets//images//liusuolong.jpeg" alt="" @click="openDrawer" />
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
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLogin from '@/stores/login'
import useMain from '@/stores/main'
import localCache from '@/utils/cache'
import { ArrowRight } from '@element-plus/icons-vue'
import { pathMapBreadcrumbs, firstMenu } from '@/utils/map-menus'
import { useI18n } from 'vue-i18n'
import type { IHeaderList, IBreadcrumb } from '../type'

/* 发射关闭菜单事件 子组件 */
const emit = defineEmits(['closeMenus'])
const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const storeLogin = useLogin()
const storeMain = useMain()
const closeMenus = ref<boolean>(false)
const drawer = ref<boolean>(false)
const list = ref<IHeaderList[]>([{ key: 1, icon: `Bell`, text: 'Sign out' }])
const shouldAppear = ref<boolean>(false) // 动画属性
const renderVnode = ref<boolean>(true) // 第一次进入页面首次并且挂在的dom元素
const search = ref<string>('')

onMounted(() => {
  renderVnode.value = false
})

function openDrawer() {
  drawer.value = true
}
function searchTop() {
  shouldAppear.value = !shouldAppear.value
  renderVnode.value = true
}
function handleCollapse() {
  closeMenus.value = !closeMenus.value
  emit('closeMenus', closeMenus.value)
}

/* 退出操作 */
function handleClose(i: IHeaderList) {
  localCache.removeCache('token')
  localCache.removeCache('lang')
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

// 设置系统语言
function setLocal(lang: string) {
  localCache.setCache('lang', lang)
  storeMain.lang = lang
  locale.value = lang
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  @keyframes slideTop {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  .appear-top-button {
    animation: slideDown 0.5s ease-out forwards;
  }

  .appear-button-top {
    animation: slideTop 0.5s ease-out forwards;
  }
  .search {
    position: absolute;
    background-color: white;
    width: 62%;
    height: 50px;
    line-height: 50px;
    left: 20%;
    border-radius: 6px;
  }

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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
    .images {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .translation {
      width: 20px;
      height: 20px;
      margin-right: 28px;
    }

    .el-dropdown-link {
      padding-top: 4px;
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
