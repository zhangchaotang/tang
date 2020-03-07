<template>
  <div class="shoppingCart">
    <!-- 页头 -->
    <van-row>
      <van-nav-bar title="购物车" />
    </van-row>
    <!-- 清单列 -->
    <van-row>
      <van-row class="cart_item" v-for="(item,index) in goodsList" :key="item.id">
        <van-col :span="2" class="checkbox">
          <van-checkbox @change="ischecked" v-model="cartList[index].ischecked" />
        </van-col>
        <van-col :span="22">
          <van-card
            :num="cartList[index].num"
            :price="item.price"
            :desc="item.goods_name"
            :title="item.goods_name"
            :thumb="item.image"
          >
            <div slot="num">
              <van-stepper @change="ischecked" v-model="cartList[index].num" />
            </div>
            <div slot="bottom" class="xiaoji">
              <span class="xiaoji2">小计:</span>
              &yen;{{item.price * cartList[index].num}}元
            </div>
          </van-card>
        </van-col>
      </van-row>
    </van-row>
    <!--合计  -->
    <van-row class="heji">
      <van-submit-bar :price="checkedPrice" button-text="提交订单">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>
      </van-submit-bar>
    </van-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartList: [],
      goodsList: [],
      checked: false,
      checkedPrice: 0
    }
  },
  methods: {
    getCart () {
      this.cartList = JSON.parse(window.localStorage.getItem('cartList'))
      let cartIds = []
      this.cartList.forEach(item => {
        cartIds.push(item.id)
      })
      console.log(cartIds)
      this.$http
        .get('/goods', {
          params: {
            goodsList: cartIds
          }
        })
        .then(res => {
          this.goodsList = res.data.data
          console.log(this.goodsList)
          this.ischecked()
        })
    },
    ischecked () {
      let allCheckprice = 0
      this.cartList.forEach((item, index) => {
        if (item.ischecked) {
          allCheckprice += this.goodsList[index].price * item.num * 100
        }
      })
      window.localStorage.setItem('cartList', JSON.stringify(this.cartList))
      this.checkedPrice = allCheckprice
    },
    checkAll () {
      this.cartList.forEach(item => {
        item.ischecked = !this.checked
      })
      window.localStorage.setItem('cartList', JSON.stringify(this.cartList))
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style>
/* 小计 */
.xiaoji {
  display: block;
  text-align: right;
  margin-top: 20px;
}
.xiaoji2 {
  padding-right: 10px;
}

.checkbox {
  position: relative;
    left: 6px;
    top: 44px;
}

.van-submit-bar {
  margin-bottom: 50px;
}

.heji {
  height: 84px;
  margin-bottom: 50px;
}
.cart_item {
  padding: 10px 0;
}
</style>
