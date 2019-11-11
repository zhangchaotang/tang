<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">答题</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o" to="/topn">排行榜</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {

  }
}
</script>
<style>
</style>
