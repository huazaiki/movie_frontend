<script>
import { User, Lock, Message, Phone } from '@element-plus/icons-vue';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        userId: 0,
        userName: '',
        userPwd: '',
        userEmail: '',
        userPhone: '',
        isAdmin: 0 // 新增 isAdmin 属性
      }
    }
  },
  methods: {
    userRegister() {
      // 调用 register 方法并处理注册后的逻辑
      this.register(this.form, () => this.$router.push('/index'))
    },

    // 定义注册方法
    register(user, success, failure = this.defaultFailure) {
      this.internalPost(
        '/api/v1/consumer/register',
        user,
        { 'Content-Type': 'application/json' },
        (data) => {
          success(data)
        },
        failure
      )
    },

    // 通用 POST 请求方法
    internalPost(url, data, headers, success, failure, error = this.defaultError) {
      axios
        .post(url, data, { headers: headers })
        .then(({ data }) => {
          if (data.code === 200) success(data.data)
          else failure(data.message, data.code, url)
        })
        .catch((err) => error(err))
    },

    // 默认错误处理
    defaultError(error) {
      console.error(error)
    },

    // 默认失败处理
    defaultFailure(message, status, url) {
      console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
    }
  }
}
</script>

<template>
  <div style="text-align: center; margin: 0 20px">
    <div style="margin-top: 150px; max-width: 400px; margin-left: auto; margin-right: auto">
      <div style="font-size: 25px; font-weight: bold">注册</div>
      <div style="font-size: 14px; color: grey">正在注册中，请先填入相关信息进行注册</div>
    </div>
    <div style="margin-top: 50px; max-width: 400px; margin-left: auto; margin-right: auto">
      <el-form :model="form" :rules="rule" ref="formRef">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" maxlength="10" type="text" placeholder="用户名">
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
        <el-form-item prop="userEmail">
          <el-input v-model="form.userEmail" maxlength="20" type="text" placeholder="邮箱">
            <template #prefix>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPhone">
          <el-input v-model="form.userPhone" maxlength="20" type="text" placeholder="联系方式">
            <template #prefix>
              <el-icon>
                <Phone />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="userRegister" style="width: 270px" type="warning" plain>立即注册</el-button>
    </div>
  </div>
</template>

<style scoped></style>