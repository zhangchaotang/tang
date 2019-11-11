<template>
  <div class="topn">
    <van-tabs @change="tabChange">
      <van-tab v-for="item in titleList" :key="item.id" :title="item.cat_name" :name="item.id"></van-tab>
    </van-tabs>
    <van-row>
      <table class="table">
        <tr class="head">
          <th>排名</th>
          <th>姓名</th>
          <th>积分</th>
        </tr>
        <tr v-for="(item,index) in ton" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.username}}</td>
          <td>{{item.integral}}</td>
        </tr>
      </table>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleList: [],
      cat_id: '0',
      ton: []
    }
  },
  methods: {
    async getTitleList () {
      let { data: res } = await this.$http.get('/categories')
      this.titleList = res.data
    },
    async getTopn () {
      let { data: res } = await this.$http.get(
        `/questions/topn?cat_id=${this.cat_id}`
      )
      this.ton = res.data
    },
    tabChange (name) {
      this.cat_id = name
      this.getTopn()
    }
  },
  created () {
    this.getTitleList()
    this.getTopn()
  }
}
</script>

<style>
.topn .table {
  width: 100%;
  margin-top: 30px;
  text-align: center;
  border-collapse: collapse;
}
.topn .head  {
  background: #eeeeee;
}

.topn td {
  padding: 4px;
}
</style>
