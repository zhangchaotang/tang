<template>
  <div class="user">
    <van-row class="user_head" :gutter="40">
      <van-col :span="8">
        <van-uploader>
          <van-image round :src="face" />
        </van-uploader>
      </van-col>
      <van-col :span="10">
        <div class="username van-ellipsis">
          {{username}}
          <div>
            <van-icon name="gem-o" tag="i" color="#fff" />0
          </div>
        </div>
      </van-col>
      <van-col :span="6">
        <van-button :block="true" size="mini" type="primary" class="putPass" router-link to='/ChangePassword'>修改密码</van-button>
      </van-col>
    </van-row>

    <van-row class="title_list">
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="item in titleList" :key="item.id" :to="/subject/ + item.id">
          {{item.cat_name}}
          <div class="rate">（正确率：{{item.right_rate}}%）</div>
        </van-grid-item>
      </van-grid>
    </van-row>
    <van-row type="flex" justify="center" class="unlogin_btn">
      <van-col :span="14">
        <van-button :block="true" type="warning" @click="unlogin">退出</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '123',
      face: 'https://img.yzcdn.cn/vant/cat.jpeg',
      titleList: []
    }
  },
  methods: {
    async getTitleList () {
      let { data: res } = await this.$http.get('/users/member_cate_question_rate')
      this.titleList = res.data
    },
    unlogin () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  created () {
    this.getTitleList()
    this.username = window.sessionStorage.getItem('username')
    this.face = window.sessionStorage.getItem('face')
  }
}
</script>

<style>
.user_head {
  padding: 25px;
  background-color: #00659f;
}
.van-image {
  width: 5rem;
  height: 5rem;
  border: 2px solid #ffffff;
  box-sizing: border-box;
}

.username {
  margin-top: 10px;
  color: #ffffff;
  font-size: 20px;
}

.username div {
  font-size: 14px;
  color: #ffffff;
}

.putPass {
  margin-top: 10px;
}

.title_list {
  border-top: 15px solid #eee;
  border-bottom: 15px solid #eee;
}

.rate {
  font-size: 12px;
  color: #ff4500;
}

.unlogin_btn {
  margin-top: 30px;
}
</style>
