<template>
  <div class="home">
    <!-- 图片轮播图 -->
    <van-row>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in slideshowList" :key="item.id">
          <van-image height="10rem" fit="contain" :src="item.image" :to="item.link" />
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <!-- 推荐分类 -->
    <van-row>
      <van-grid :column-num="4">
        <van-grid-item v-for="item in goodsClasses" :key="item.id" :text="item.cat_name" />
      </van-grid>
    </van-row>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 商品列表 -->
      <van-row class="goodsList" gutter="20">
        <van-col v-for="item in goodsLists" :key="item.id" :span="10" class="goods_item">
          <van-image width="100" height="100" :src="item.image" />
          <div class="van-ellipsis goods_text">{{item.goods_name}}</div>
          <van-button type="warning" size="small" @click="addCart(item.id)">加入购物车</van-button>
          <p class="goods_price">&yen;{{item.price}}</p>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      slideshowList: [],
      goodsClasses: [],
      goodsLists: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    ...mapMutations(['cartNumChange']),
    onLoad () {
      // 调用接口获取首页商品列表
      this.$http
        .get(`/index_goods?page=${this.page}&per_page=${this.per_page}`)
        .then(res => {
          this.goodsLists = this.goodsLists.concat(res.data.data)
          // 加载状态结束
          this.loading = false
          this.page++
          // 数据全部加载完成
          if (res.data.data.length === 0) {
            this.finished = true
          }
        })
    },
    addCart (id) {
      let addCartList = {
        ids: [id],
        info: {
          [id]: {
            count: 1,
            ischecked: false
          }
        }
      }
      let cartList = window.localStorage.getItem('cartList')
      if (cartList === null) {
        window.localStorage.setItem('cartList', JSON.stringify(addCartList))
      } else {
        cartList = JSON.parse(cartList)
        if (cartList.ids.indexOf(id) !== -1) {
          cartList.info[id].count++
        } else {
          cartList.ids.push(id)
          cartList.info[id] = {
            count: 1,
            ischecked: false
          }
        }
        window.localStorage.setItem('cartList', JSON.stringify(cartList))
      }
      this.cartNumChange(
        JSON.parse(window.localStorage.getItem('cartList')).ids.length
      )
    }
  },
  created () {
    // 调用接口获取轮播图数据
    this.$http.get('/main_ad_images').then(res => {
      this.slideshowList = res.data.data
    })
    // 调用接口获取首页商品推荐分类
    this.$http.get('/index_categories').then(res => {
      this.goodsClasses = res.data.data
    })
  }
}
</script>

<style>
.home {
  padding-bottom: 80px;
}
.goodsList {
  padding: 20px 60px;
}
.goods_item {
  text-align: center;
  margin-bottom: 20px;
}

.goods_item:nth-child(even) {
  margin-left: 30px;
}
.goods_text {
  margin: 10px 0;
}
.goods_price {
  margin: 0;
  padding: 5px 0;
  color: red;
}
</style>
