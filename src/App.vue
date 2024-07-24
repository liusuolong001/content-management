<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 19:12:05
-->
<template>
  <!-- 配置国际化语言element-plus -->
  <div class="app">
    <ElConfigProvider :locale="ptBr">
      <RouterView></RouterView>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import ptBr from 'element-plus/es/locale/lang/pt-br'
import { ElConfigProvider } from 'element-plus'
</script>

<style scoped>
.app {
}
</style>
