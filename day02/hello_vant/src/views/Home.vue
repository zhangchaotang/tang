<template>
  <div class="home">
    <van-row>
      <van-nav-bar title="选择题目分类" />
    </van-row>
    <van-divider />
    <van-row>
      <van-grid>
        <van-grid-item
          v-for="item in titleList"
          :key="item.id"
          :text="item.cat_name"
          :to="'/subject/'+item.id"
        />
      </van-grid>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleList: []
    }
  },
  methods: {
    async getTitleList () {
      let { data: res } = await this.$http.get(
        '/categories'
      )
      this.titleList = res.data
    }
  },

  created () {
    this.getTitleList()
  }
}
</script>
