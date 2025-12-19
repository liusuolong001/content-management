<!--
 * @Description:
 * @Author: liusuolong001
 * @Date: 2024-07-21 18:13:37
 * @LastEditors: liusuolong001
 * @LastEditTime: 2024-07-24 15:19:11
-->
<template>
  <div class="login">
    <img class="icon" src="~@/assets//images//pinia.svg" alt="" />
    <div class="horizontal-gradient">
      <div class="content">
        <!-- 遮罩 -->
        <div :class="[active ? 'right-gradient' : 'left-gradient', 'cover']">
          <div class="info">
            <div class="top">WELCOME</div>
            <div class="center">JOIN US</div>
            <div class="bottom">
              <img class="images" src="~@/assets//images//liusuolong.jpeg" alt="" />
            </div>
          </div>
        </div>
        <!-- 遮罩底下内容 -->
        <!-- 注册 -->
        <div class="reg_login">
          <div class="regis">
            <div class="text">Registration</div>
            <el-form ref="regisFormRef" :rules="regisRules" :model="regisForm" class="ruleForm">
              <el-form-item prop="name">
                <el-input v-model="regisForm.name" style="width: 290px" placeholder="Account" clearable />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="regisForm.password" style="width: 290px" placeholder="password" clearable />
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                  v-model="regisForm.confirmPassword"
                  style="width: 290px"
                  placeholder="confirmPassword"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="regis(regisFormRef)">Registration</el-button>
                <span class="account_login" @click="switchingMasks(regisFormRef)">Have an name, login</span>
              </el-form-item>
            </el-form>
          </div>
          <!-- 登陆 -->
          <div class="regis">
            <div class="text">Login</div>
            <el-form ref="ruleFormRef" :rules="ruleRules" :model="ruleForm" class="ruleForm">
              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" style="width: 290px" placeholder="Account" clearable />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  style="width: 290px"
                  placeholder="password"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login(ruleFormRef)">login</el-button>
                <span class="account_login" @click="switchingMasks(ruleFormRef)">Do not have an name, register</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
import useLogin from '@/stores/login'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUsersId, getMenuUsers } from '@/api/login'
import type { FormInstance, FormRules } from 'element-plus'
import type { IRegistration, ILogin } from './type'

const router = useRouter()
const storeLogin = useLogin()
let active = ref<boolean>(true)

/**
 * 注册操作
 */
const regisForm = reactive<IRegistration>({
  name: '',
  password: '',
  confirmPassword: ''
})

const regisRules = reactive<FormRules<IRegistration>>({
  name: [{ required: true, message: 'Please input Activity name', trigger: 'change' }],
  password: [
    {
      required: true,
      message: 'Please select Activity password',
      trigger: 'change'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please select Activity confirmPassword',
      trigger: 'change'
    }
  ]
})

/**
 * 登陆操作
 */
const ruleForm = reactive<ILogin>({
  name: '',
  password: ''
})

const ruleRules = reactive<FormRules<ILogin>>({
  name: [{ required: true, message: 'Please input Activity name', trigger: 'change' }],
  password: [
    {
      required: true,
      message: 'Please select Activity password',
      trigger: 'change'
    }
  ]
})

const ruleFormRef = ref<FormInstance>()
async function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      storeLogin
        .getLogin({
          name: ruleForm.name,
          password: ruleForm.password
        })
        .then(async (resolve) => {
          /* 获取这个用户是哪个角色 */
          const userRes = await getUsersId(resolve.data.id)
          storeLogin.userInfo = userRes.data
          localCache.setCache('userInfo', userRes.data)
          /* 获取这个角色菜单 */
          const menuUserRes = await getMenuUsers(userRes.data.role.id)
          storeLogin.menuUser = menuUserRes.data
          localCache.setCache('menuUser', menuUserRes.data)
          // 将本地的菜单与路由进行匹配动态添加到route里 刷新的时候这段动态添加代码并没有被执行一遍
          const routes = mapMenusToRoutes(menuUserRes.data)

          routes.forEach((route) => {
            router.addRoute('main', route)
          })
          ElMessage.success('login success')
          router.push({
            path: '/main'
          })
        })
    }
  })
}

function switchingMasks(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  if (active.value) {
    active.value = false
    return
  }
  active.value = true
}
</script>

<style lang="less">
.login {
  display: flex;
  position: relative;

  .icon {
    width: 214px;
    height: 320px;
    position: absolute;
    right: 5%;
    top: 2%;
    transform: skew(-10deg, 10deg);
  }
}

.horizontal-gradient {
  height: 100vh;
  width: 100%;
  background: linear-gradient(to right, rgb(249, 227, 106), rgb(105, 206, 109));
  box-shadow: 10px 10px 5px grey;

  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 840px;
    height: 500px;
    border-radius: 30px;
    background: linear-gradient(to right, rgb(249, 227, 106), rgb(105, 206, 109));
    cursor: pointer;
    position: relative;

    .cover {
      width: 420px;
      height: 100%;
      transition: all 0.8s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 9;

      .info {
        color: white;
        .top {
          font-size: 32px;
        }
        .center {
          font-size: 15px;
          text-align: center;
          margin-top: 20px;
        }

        .bottom {
          text-align: center;
          .images {
            text-align: center;
            border-radius: 50%;
            width: 150px;
            height: 150px;
            margin-top: 20px;
          }
        }
      }
    }

    .left-gradient {
      border-radius: 0px 30px 30px 0px;
      transform: translate(420px, 0);
      background-color: rgb(105, 206, 109);
    }

    .right-gradient {
      border-radius: 30px 0 0 30px;
      background-color: rgb(249, 227, 106);
    }
  }
}
</style>
