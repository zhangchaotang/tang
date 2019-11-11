<template>
  <div class="login">
    <el-card>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
    </el-card>
  </div>
</template>

<script>
import querystring from 'querystring'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      let { data: res } = await this.$axios.post('/login', querystring.stringify(this.loginForm))
      // 如果用户名或密码错误 那么提示用户不存在
      // 如果用户名和密码正确 提示登录成功
      if (res.code !== 200) {
        window.sessionStorage.clear()
        return this.$message.error(res.msg)
      }
      // 令牌相当于古代调军队的虎符 就要存下来
      window.sessionStorage.setItem('token', res.data.token)
      window.sessionStorage.setItem('username', res.data.username)

      // 当登录成功 跳转到首页
      this.$router.push('/')
      // 登录成功提示
      return this.$message.success(res.msg)
    }
  }
}
</script>

<style>
.login {
  width: 600px;
  height: 500px;
  margin: 200px auto;
}
</style>
