<template>
  <div class="register">
    <van-row>
      <van-nav-bar title="注册" left-text="返回" @click-left="$router.go(-1)" left-arrow />
    </van-row>

    <van-row class="registerForm">
      <van-field
        v-model="phone"
        required
        clearable
        label="手机"
        left-icon="manager"
        placeholder="请输入手机号码"
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
        <van-button :block="true" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="register">注  册</van-button>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" class="register_btn">
      <van-col :span="20">
        <van-button :block="true" type="warning" to="/login">已经注册了? 点击登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async register () {
      let { data: res } = await this.$http.post('/register', {
        phone: this.phone,
        password: this.password
      })
      if (res.ok === 1) {
        this.$toast('恭喜! 注册成功!')
        this.$router.push('/login')
      } else {
        this.$toast(res.data.error)
      }
    }
  }
}
</script>

<style>
.registerForm {
  padding: 0 20px;
  margin: 100px 0 40px 0;
  box-sizing: border-box;
}

.register_Btn {
  width: 100%;
}

.van-field__label {
  width: 60px;
}

.register_btn {
  margin-top: 40px;
}
</style>
