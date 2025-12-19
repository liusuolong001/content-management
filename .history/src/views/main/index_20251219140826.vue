<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 移除 el-aside，将菜单放在 el-header 上方 -->
      <el-container>
        <el-header class="top-header">
          <Header></Header>
        </el-header>
        <!-- 菜单导航栏 -->
        <div class="menu-container">
          <Menus></Menus>
        </div>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import useLogin from '@/stores/main'
import Menus from './component/menus.vue'
import Header from './component/header.vue'

const router = useRouter()
const storeHome = useLogin()
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
}

.home-container {
  height: 100%;
  flex-direction: column;

  .top-header {
    background-color: #75d67b;
    height: 60px;
    padding: 0;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .menu-container {
    background-color: #f9e36a;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    z-index: 999;

    // 确保菜单水平排列
    :deep(.el-menu) {
      height: 100%;

      // 如果是水平菜单
      &.el-menu--horizontal {
        border-bottom: none;

        .el-menu-item,
        .el-sub-menu__title {
          height: 100%;
          line-height: 50px;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.2);
            border-bottom-color: #409eff;
          }
        }

        .el-sub-menu {
          .el-sub-menu__title {
            height: 100%;
          }
        }
      }
    }
  }

  .main-content {
    background-color: #f5f5f6;
    flex: 1;
    padding: 20px;
    overflow: auto;
    padding-top: 500px;
  }
}
</style>
