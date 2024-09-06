<script setup>
import { Lock, User } from '@element-plus/icons-vue'
import router from "@/router/main.js";
import axios from 'axios';
import { ref, reactive } from 'vue';

// export default {
//   data() {
//     return {
//       form: {
//         userName: '',
//         userPwd: '',
//       },
//       rule: {
//         userName: [
//           { required: true, message: '请输入用户名' }
//         ],
//         userPwd: [
//           { required: true, message: '请输入密码' }
//         ]
//       }
//     }
//   },
//   methods: {
//     userLogin() {
//       login(form, (data) => {
//         sessionStorage.setItem('userId', data.userId);
//         router.push('/index')
//       })
//     },
//     userRegister() {
//       router.push('/register')
//     },
//     defaultError(error) {
//       console.error(error)
//     },
//     defaultFailure(message, status, url) {
//       console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
//     },

//     // 通用 POST 请求方法
//     internalPost(url, data, headers, success, failure, error = this.defaultError) {
//       axios
//         .post(url, data, { headers: headers })
//         .then(({ data }) => {
//           if (data.code === 200) success(data.data)
//           else failure(data.message, data.code, url)
//         })
//         .catch((err) => error(err))
//     },

//     login(user, success, failure = defaultFailure) {
//       internalPost('/api/v1/consumer/login', user, {
//         'Content-Type': 'application/json'
//       }, (data) => {
//         success(data)
//       }, failure)
//     }
//   }
// }

const formRef = ref()

const form = reactive({
  userName: '',
  userPwd: '',
//   remember: false
})

const rule = {
  userName: [
    {required: true, message: '请输入用户名'}
  ],
  userPwd: [
    {required: true, message: '请输入密码'}
  ]
}

function userLogin() {
  login(form, (data) => {
    sessionStorage.setItem('userId', data.userId);
    router.push('/index')
  })
}

function userRegister() {
  router.push('/register')
}

const defaultError = (error) => {
    console.error(error)
}

const defaultFailure = (message, status, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
}

function internalPost(url, data, headers, success, failure, error = defaultError) {
  axios.post(url, data, { headers: headers }).then(({ data }) => {
    if (data.code === 200)
      success(data.data)
    else
      failure(data.message, data.code, url)
  }).catch(err => error(err))
}

function login(user, success, failure = defaultFailure) {
  internalPost('/api/v1/consumer/login', user, {
    'Content-Type': 'application/json'
  }, (data) => {
    success(data)
  }, failure)
}

</script>

<template>
  <div style="text-align: center; margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="font-size: 25px; font-weight: bold">登录</div>
      <div style="font-size: 14px; color: grey">在进入系统前，请先输入用户名和密码进行登录</div>
    </div>
    <div style="margin-top: 50px">
      <el-form :model="form" :rules="rule" ref="formRef">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" maxlength="10" type="text" placeholder="用户名/邮箱">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input v-model="form.userPwd" maxlength="20" type="password" placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 10px">
      <el-button @click="userLogin" style="width: 135px" type="success" plain>立即登录</el-button>
      <el-button @click="userRegister" style="width: 135px" type="success" plain>后台登录</el-button>
    </div>
    <el-divider>
      <span>没有账号？</span>
    </el-divider>
    <div>
      <el-button @click="userRegister" style="width: 270px" type="warning" plain>立即注册</el-button>
    </div>


  </div>
</template>

<style scoped></style>