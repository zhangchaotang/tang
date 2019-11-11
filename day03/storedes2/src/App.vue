<template>
  <div id="app">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot>分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :info="cartNum" to="/shoppingCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['cartNumChange'])
  },
  computed: {
    ...mapState(['cartNum'])
  },
  created () {
    this.cartNumChange(JSON.parse(window.localStorage.getItem('cartList')).length)
  }
}
</script>

<style>
</style>
