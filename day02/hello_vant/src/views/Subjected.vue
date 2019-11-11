<template>
  <div class="home">
    <van-row>
      <van-nav-bar left-text="返回" @click-left="$router.go(-1)" :title="title1.cat_name" />
    </van-row>
    <van-row>
      <van-tabs v-model="type" @change="tabchange">
        <van-tab :title="'全部'+'('+questionsNum.total+')'" name="all"></van-tab>
        <van-tab :title="'答错的'+'('+questionsNum.right+')'" name="wrong"></van-tab>
        <van-tab :title=" '答对的'+'('+questionsNum.wrong+')'" name="right"></van-tab>
        <van-tab :title=" '没做过'+'('+questionsNum.undo+')'" name="undo"></van-tab>
      </van-tabs>
    </van-row>
    <van-row>
      <van-button type="primary" v-if="questionsList.length === 0" @click="getSubjectedById">开始答题</van-button>
      <div v-else class="dati">
        <h2>{{questionsList[num].title}}</h2>
        <van-radio-group v-model.trim="radio">
          <van-radio
            v-for="(item,index) in questionsList[num].options"
            :key="index"
            :name="index"
          >{{item}}</van-radio>
        </van-radio-group>
        <div class="btns">
          <van-row :gutter="20">
            <van-col :span="11">
              <van-button type="primary" @click="tijiao">提交,进入下一题</van-button>
            </van-col>
            <van-col :span="8">
              <van-button type="info" @click="flag = !flag">查看答案</van-button>
            </van-col>
          </van-row>
        </div>
        <span class="daan" v-if="flag">
        {{questionsList[num].options[questionsList[num].right]}}
        </span>
      </div>
    </van-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title1: {},
      questionsList: [],
      questionsNum: {},
      type: 'all',
      radio: '',
      num: 0,
      flag: false,
      answer: [],
      catId: ''
    }
  },
  computed: {
    ...mapState(['cat_id'])
  },
  methods: {

    async getTitle () {
      let { data: res } = await this.$http.get('/categories/' + this.catId)
      let { data: res2 } = await this.$http.get(
        `/categories/${this.catId}/question_count_info`
      )
      this.questionsNum = res2.data
      this.title1 = res.data
    },
    async getSubjectedById () {
      let { data: res } = await this.$http.get(
        `/categories/${this.catId}/questions?type=${this.type}`
      )
      res.data.forEach((item, index) => {
        item.options = item.options.split(',')
      })
      this.questionsList = res.data
      console.log(res)
    },
    // 提交
    tijiao () {
      if (this.radio === '') return this.$toast('请选择答案')

      this.$http
        .post(`/questions/${this.questionsList[this.num].id}/${this.radio}`)
        .then(res => {
          if (res.data.ok === 1) {
            this.$toast('恭喜! 答案正确')
          } else {
            this.$toast('抱歉! 答案错误')
          }
          this.radio = ''
          if (this.num === this.questionsListquestionsList.length - 1) return this.$toast('已经到最后一题了')
          this.num++
        })
    },
    // tab发生改变时
    tabchange (name) {
      this.type = name
      this.questionsList = []
      this.num = 0
      this.radio = ''
    }
  },
  created () {
    this.catId = this.$router.history.current.params.id
    this.getTitle()
  }
}
</script>

<style>
.dati {
  padding: 0 5%;
  width: 90%;
}
.btns {
  margin: 20px 0;
}

.daan {
  border-radius: 4px;
  background: #1989fa;
}
</style>
