<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 17:57:26
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-21 20:29:08
-->

<template>
  <div class="home">
    <span>counter:{{ storeHome.counter }}</span>
    <button @click="increment">counter + 1</button>
  </div>
</template>

<script setup lang="ts">
import useLogin from '@/stores/home'

const storeHome = useLogin()
function increment() {
  storeHome.counter++
}
</script>

<style></style>
