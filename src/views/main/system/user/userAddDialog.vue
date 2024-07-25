<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-25 00:50:10
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 01:26:02
-->

<template>
  <div class="dialog"></div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import type { PropType } from 'vue'
const props = defineProps({
  parCount: {
    type: Number as PropType<number>,
    required: true
  }
})
</script>

<style lang="less" scoped></style>
