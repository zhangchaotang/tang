<template>
  <div class="login">
    <van-row>
      <van-nav-bar title="修改密码" left-text="返回" @click-left="$router.go(-1)" left-arrow />
    </van-row>

    <van-row class="loginForm">
      <van-field
        v-model="password"
        type="password"
        required
        clearable
        label="原密码"
        left-icon="lock"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="newpassword"
        type="password"
        label=" 新密码"
        clearable
        placeholder="请输入密码"
        left-icon="lock"
        required
      />
      <van-field
        v-model="repassword"
        type="password"
        label="再次输入密码"
        clearable
        placeholder="请再次输入密码"
        left-icon="lock"
        required
      />
    </van-row>
    <van-row type="flex" justify="center">
      <van-col :span="20">
        <van-button
          :block="true"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="putPass"
        >提交</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      newpassword: '',
      repassword: ''
    }
  },
  methods: {
    async putPass () {
      if (this.newpassword !== this.repassword) {
        return this.$toast.fail('两次密码不一致')
      }
      let { data: res } = await this.$http.post('/users/passwords', {
        old_password: this.username,
        password: this.newpassword
      })
      if (res.ok === 1) {
        this.$router.push('/user')
      } else {
        return this.$toast.fail(res.error)
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
  width: 90px;
}

.register_btn {
  margin-top: 40px;
}
</style>
