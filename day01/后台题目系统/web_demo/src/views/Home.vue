<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-menu
          default-active="/steme"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/steme">答题</el-menu-item>
          <el-menu-item  @click="unlogin">退出登录</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    unlogin () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
