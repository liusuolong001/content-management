<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-19 22:31:16
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 18:44:55
-->
<template>
  <!-- 配置国际化语言element-plus -->
  <div class="app">
    <ElConfigProvider :locale="storeMain.lang === 'enUs' ? en_Us : zhCn">
      <RouterView></RouterView>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en_Us from 'element-plus/es/locale/lang/en'
import useMain from './stores/main'
import { useI18n } from 'vue-i18n'

const storeMain = useMain()
const { locale } = useI18n()
onMounted(() => {
  locale.value = storeMain.lang
})
</script>

<style scoped>
.app {
}
</style>
