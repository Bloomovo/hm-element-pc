<template>
  <div class="login-page">
    <el-card class="el-card">
      <template #header>黑马面经运营后台</template>
      <!-- 表单提交校验 -->
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item lable="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item lable="密码：" prop="password">
          <el-input placeholder="请输入密码：" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkFrom">登录</el-button>
          <el-button @click="resert">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入 login
import { login } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // element-ui校验
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{5,11}$/, message: '长度在 5 到 10 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 登录表单校验
    checkFrom () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        // usernam admin
        // password admin
        const { data } = await login(this.form)
        console.log(data)
        // console.log('1111')
      })
    },
    // 重置表单
    resert () {
      this.$refs.loginForm.resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  // background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: rgba(114,124,245,1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
