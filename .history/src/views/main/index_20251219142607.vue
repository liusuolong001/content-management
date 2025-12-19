<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 移除 el-aside，将菜单放在 el-header 上方 -->
      <el-container>
        <el-header class="top-header">
          <Menus></Menus>
          <Header></Header>
        </el-header>
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

  .main-content {
    background-color: #f5f5f6;
    flex: 1;
    padding: 20px;
    overflow: auto;
    padding-top: 500px;
  }
}
</style>
