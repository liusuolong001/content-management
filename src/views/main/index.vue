<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 17:57:26
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-23 12:21:03
-->

<template>
  <div class="home">
    <el-container class="home-container">
      <el-aside :width="!closeMenus ? '255px' : '60px'">
        <Menus :closeMenus="closeMenus"></Menus>
      </el-aside>
      <el-container>
        <el-header>
          <Header @closeMenus="handleCloseMenus"></Header>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import useLogin from '@/stores/home'
import Menus from './component/menus.vue'
import Header from './component/header.vue'

const router = useRouter()
const storeHome = useLogin()

const closeMenus = ref<boolean>(false)
function handleCloseMenus(params: boolean) {
  closeMenus.value = params
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
}
.home-container {
  height: 100%;

  .el-aside {
    background-color: #f9e36a;
    transition: width 0.8s ease;
  }

  .el-header {
    background-color: #75d67b;
  }

  .el-main {
    background-color: #f5f5f6;
  }
}
</style>
