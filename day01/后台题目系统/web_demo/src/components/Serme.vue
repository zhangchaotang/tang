<template>
  <div class="serme">
    <el-row>
      <el-card>
        <el-select v-model="checkedstem" placeholder="请选择题目类型" @change="stemeChange">
          <el-option v-for="item in stemList" :key="item.id" :label="item.s_name" :value="item.id"></el-option>
        </el-select>

        <el-row class="row stem">
          <el-col :span="11" class="stem_col">
            <el-row v-for="(item,index) in subjectList" :key="index">
              <el-row class="row">
                <el-col :span="8">
                  <h1>{{subjectList[0].su_name}}</h1>
                </el-col>
                <el-col :span="4">
                  <span class="pageNum">{{pageNum}}</span>
                  <span class="total">/ {{total}}</span>
                </el-col>
              </el-row>
              <el-row>
              <el-radio v-model.trim="subjectValue" :label="item.option1" border>A:{{item.option1}}</el-radio>
              <el-radio v-model.trim="subjectValue" :label="item.option2" border>B:{{item.option2}}</el-radio>
              <el-radio v-model.trim="subjectValue" :label="item.option3" border>C:{{item.option3}}</el-radio>
              <el-radio v-model.trim="subjectValue" :label="item.option4" border>D:{{item.option4}}</el-radio>
              </el-row>
              <el-row class="row">
                <el-col :span="1" :offset="12">
                  <el-button type="primary" @click="prevSubject">上一道题</el-button>
                </el-col>
                <el-col :span="1" :offset="2">
                  <el-button type="primary" @click="nextSubject">下一道题</el-button>
                </el-col>
                <el-col :span="1" :offset="2">
                  <el-button type="success" plain @click="submitSubject">提交</el-button>
                </el-col>
                <el-col :span="3" :offset="2">
                  <el-button type="success" plain>选择题目</el-button>
                  <ul class="SubjectAll">
                    <li class="SubjectItem" v-for="(item,i) in subjectListAll" :key="item.id">
                      <span v-if="item.isright == undefined" class="disabled">{{i + 1}}</span>
                      <span
                        v-if="item.isright == 1"
                        class="accomp"
                        @click="changeSubject(i + 1)"
                      >{{i + 1}}</span>
                      <span
                        v-if="item.isright == 0"
                        class="mistak"
                        @click="changeSubject(i + 1)"
                      >{{i + 1}}</span>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="4" :offset="9">
            <el-table :data="intefralTop" style="width: 99%">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="username" label="姓名"></el-table-column>
              <el-table-column prop="intefral" label="积分"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import querystring from 'querystring'
export default {
  data () {
    return {
      stemList: [],
      checkedstem: '',
      subjectList: [],
      subjectListAll: [],
      subjectValue: '',
      pageNum: 1,
      total: 0,
      intefralTop: [],
      mistakes: [],
      accomplish: []
    }
  },
  methods: {
    // 获取题干
    async getstem () {
      let { data: res } = await this.$axios.get('/steme')
      if (res.code !== 200) {
        return this.$message.error(res.error)
      }
      this.stemList = res.data
    },
    // 选择题干
    async stemeChange () {
      this.pageNum = 1
      this.getSubjct()
    },
    async getSubjct () {
      let { data: res } = await this.$axios.get(
        `/subject/${this.checkedstem}`,
        { params: { pageNum: this.pageNum } }
      )
      if (res.code !== 200) {
        this.subjectList = []
        return this.$message.error(res.msg)
      }
      this.subjectList = res.data
      if (res.conment) {
        this.subjectValue = res.conment.conment
      } else {
        this.subjectValue = ''
      }
      this.pageNum = res.pageNum
      this.total = res.total
      this.getAcco_mista()
    },
    // 上一道题
    prevSubject () {
      if (this.pageNum > 1) {
        this.pageNum = this.pageNum - 1
        this.getSubjct()
      } else {
        this.$message.error('已经到达最后一题了')
      }
    },
    // 下一道题
    nextSubject () {
      if (this.pageNum < this.total) {
        this.pageNum = this.pageNum + 1
        this.getSubjct()
      } else {
        this.$message.error('已经到达最后一题了')
      }
    },
    // 提交
    async submitSubject () {
      if (this.accomplish.indexOf(this.pageNum - 1) === -1 && this.mistakes.indexOf(this.pageNum - 1) === -1) {
        let { data: res } = await this.$axios.post(
          `/subject/${this.subjectList[0].id}`,
          querystring.stringify({ answer: this.subjectValue })
        )
        if (res.code !== 200) {
          this.getAcco_mista()
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)
        this.getAcco_mista()
        this.getIntefralTop()
        if (this.pageNum < this.total) {
          this.nextSubject()
        }
      } else {
        let { data: res } = await this.$axios.post(
          `/subject/${this.subjectList[0].id}`,
          querystring.stringify({ answer: this.subjectValue, isright: 1 })
        )
        if (res.code !== 200) {
          this.getAcco_mista()
          return this.$message.error(res.msg)
        }
        this.$message.success(res.msg)
        this.getAcco_mista()
        if (this.pageNum < this.total) {
          this.nextSubject()
        }
      }
    },
    // 获取积分榜
    async getIntefralTop () {
      let { data: res } = await this.$axios.get('/intefralTop')
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.intefralTop = res.data
    },
    // 获取答对和答错题目
    async getAcco_mista () {
      let { data: res } = await this.$axios.get('/acco_mista/' + this.checkedstem)
      this.accomplish = this.getArrEqual(res.data[2], res.data[0])
      this.mistakes = this.getArrEqual(res.data[2], res.data[1])
      this.subjectListAll = res.data[2]
      this.accomplish.forEach(item => {
        this.subjectListAll[item].isright = 1
      })
      this.mistakes.forEach(item => {
        this.subjectListAll[item].isright = 0
      })
    },
    // 创建获取两个数组重复部分
    getArrEqual (arr1, arr2) {
      let newArr = []
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if (arr1[j].id === arr2[i].su_id) {
            newArr.push(j)
          }
        }
      }
      return newArr
    },
    changeSubject (num) {
      this.pageNum = num
      this.getSubjct()
    }
  },
  created () {
    this.getstem()
    this.getIntefralTop()
  }
}
</script>

<style>
.pageNum {
  display: inline-block;
  height: 71px;
  line-height: 71px;
  font-size: 22px;
  color: crimson;
}
.total {
  display: inline-block;
  height: 71px;
  line-height: 71px;
  font-size: 22px;
}

.stem {
  margin-bottom: 60px;
}

.stem_col {
  min-height: 1px;
}

.row {
  margin-top: 50px;
}

.SubjectAll {
  list-style: none;
  margin: 0px;
  padding: 0px;
  height: 100px;
  width: 108px;
  border: 1px solid #eeeeee;
  overflow: auto;
}
.SubjectItem {
  margin: 2px;
  padding: 0px;
  float: left;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  cursor: pointer;
}

.SubjectItem span {
  display: block;
  width: 100%;
  height: 100%;
}

.SubjectItem span:hover {
  background: #eeeeee;
}

.mistak {
  background: red;
}

.accomp {
  background: #409eff;
}
</style>
