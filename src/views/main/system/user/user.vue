<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-23 18:47:17
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-25 06:08:30
-->
<template>
  <div class="user">
    <div class="page-header">
      <el-form :model="searchForm" label-width="auto" ref="searchFormRef">
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名" prop="name">
              <el-input placeholder="用户名" v-model="searchForm.name" clearable /> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="realname">
              <el-input placeholder="姓名" v-model="searchForm.realname" clearable /> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="电话" prop="cellphone">
              <el-input placeholder="电话" v-model="searchForm.cellphone" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="enable">
              <el-select clearable v-model="searchForm.enable" style="width: 240px">
                <el-option
                  placeholder="状态"
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                /> </el-select></el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="创建时间" prop="createAt">
              <el-date-picker
                v-model="createAt"
                type="daterange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              /> </el-form-item
          ></el-col>
          <div class="search-button">
            <el-button @click="reset(searchFormRef)">重置</el-button>
            <el-button type="primary" @click="search(searchFormRef)">搜索</el-button>
          </div>
        </el-row>
      </el-form>
    </div>

    <div class="page-table">
      <el-button @click="addMethod">新建用户</el-button>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="80" />
        <el-table-column prop="name" label="用户名" width="170" />
        <el-table-column prop="realname" label="姓名" width="170" />
        <el-table-column prop="cellphone" label="电话" width="170" />
        <el-table-column prop="enable" label="状态" width="150" align="center">
          <template #default="scoped">
            <el-button
              text
              :type="scoped.row.enable === 1 ? 'success' : 'danger'"
              @click="handleStatus(scoped.row.enable)"
              >{{ scoped.row.enable === 1 ? ' 启用' : '禁用' }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" width="230">
          <template #default="scoped">{{ formatTime(scoped.row.createAt) }}</template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" width="230">
          <template #default="scoped">{{ formatTime(scoped.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="180" align="center">
          <template #default="scoped">
            <el-button type="primary" text @click="editMethod">编辑 </el-button>
            <el-button type="primary" text @click="deleteMethod(scoped.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="500"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加用户 -->
    <user-add-dialog v-model:parCount="parCount"></user-add-dialog>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/stores/user'
import { reactive, ref, onMounted, watch } from 'vue'
import { getUserList, getDeleteUser } from '@/api/system'
import { formatTime } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import userAddDialog from './userAddDialog.vue'
import type { IStatusOption, IPagination, ISearchForm } from './type'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 测试组件v-mode:parCount 双向绑值
const parCount = ref<number>(10)
const searchFormRef = ref<FormInstance>()
const loading = ref<boolean>(true)
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)

const pagination = ref<IPagination>({
  offset: 0,
  size: 10
})
const createAt = ref<any[]>()
const storeUser = useUser()
const searchForm = reactive<ISearchForm>({
  name: '',
  cellphone: '',
  enable: 1,
  realname: ''
})

const statusOptions = ref<IStatusOption[]>([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])

const tableData = ref<any[]>([])
const total = ref<number>(0)

function reset(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  createAt.value = []
  getUserListMethod()
}
function search(formEl: FormInstance | undefined) {
  getUserListMethod()
}

function addMethod() {}
function editMethod() {}
function deleteMethod(row: any) {
  ElMessageBox.confirm(t('user.deleteUserMessage'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning'
  }).then(() => {
    getDeleteUserListMethod(row.id)
  })
}

function handleSizeChange(size: number) {
  pagination.value.size = size
  getUserListMethod()
}
function handleCurrentChange(current: number) {
  pagination.value.offset = (current - 1) * pagination.value.size
  getUserListMethod()
}

function handleStatus(i: number) {
  console.log('1')
}

const getUserListMethod = async () => {
  loading.value = true
  const res = await getUserList({ ...searchForm, offset: pagination.value.offset, size: pagination.value.size })
  tableData.value = res.data.list
  total.value = res.data.totalCount
  loading.value = false
}

const getDeleteUserListMethod = async (id: number) => {
  loading.value = true
  const res = await getDeleteUser(id)
  ElMessage({
    type: 'success',
    message: t('common.deleteMessage')
  })
  loading.value = false
}

onMounted(() => {
  getUserListMethod()
})
</script>

<style lang="less" scoped></style>
