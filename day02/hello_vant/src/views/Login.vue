<template>
  <div class="login">
    <van-row>
      <van-nav-bar title="标题" left-text="返回" @click-left="$router.go(-1)" left-arrow />
    </van-row>

    <van-row class="loginForm">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        left-icon="manager"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密  码"
        placeholder="请输入密码"
        left-icon="lock"
        required
      />
    </van-row>
    <van-row type="flex" justify="center">
      <van-col :span="20">
        <van-button :block="true" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="login">登  录</van-button>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="register_btn">
      <van-col :span="20">
        <van-button :block="true" type="warning">没有账号? 点击注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      let { data: res } = await this.$http.post('/users/access_token', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.ok === 1) {
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('face', res.data.face)
        window.sessionStorage.setItem('username', this.username)
        this.$router.push('/user')
      }
    }
  }
}
</script>

<style>
.loginForm {
  padding: 0 20px;
  margin: 100px 0 40px 0;
  box-sizing: border-box;
}

.login_Btn {
  width: 100%;
}

.van-field__label {
  width: 60px;
}

.register_btn {
  margin-top: 40px;
}
</style>
