<template>
  <div class="shoppingCart">
    <!-- 页头 -->
    <van-row>
      <van-nav-bar title="购物车" />
    </van-row>
    <!-- 清单列 -->
    <van-row>
      <van-row class="cart_item" v-for="(item) in goodsList" :key="item.id">
        <van-swipe-cell :on-close="onClose" :name="item.id" class="van-clearfix">
          <van-col :span="2" class="checkbox">
          <van-checkbox v-model="cartList.info[item.id].ischecked" />
        </van-col>
        <van-col :span="22">
          <van-card :price="item.price" :title="item.goods_name" :thumb="item.image">
            <div slot="num">
              <van-stepper v-model="cartList.info[item.id].count" />
            </div>
            <div slot="bottom" class="xiaoji">
              <span class="xiaoji2">小计:</span>
              &yen;{{item.price * cartList.info[item.id].count}}元
            </div>
          </van-card>
        </van-col>

          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>

      </van-row>
    </van-row>
    <!--合计  -->
    <van-row class="heji">
      <van-submit-bar :price="totalPrice" button-text="提交订单">
        <van-checkbox v-model="checkAll">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送,
          <span>修改地址</span>
        </span>
      </van-submit-bar>
    </van-row>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
      cartList: JSON.parse(window.localStorage.getItem('cartList')),
      goodsList: [],
      checked: false
    }
  },
  methods: {
    getCart () {
      this.$http
        .get('/goods', {
          params: {
            goodsList: this.cartList.ids.join()
          }
        })
        .then(res => {
          this.goodsList = res.data.data
          console.log(this.goodsList)
        })
    },
    // 删除购物车
    onClose (clickPosition, instance, detail) {
      if (clickPosition !== 'right') {
        // 点击其他位置向右展开删除按钮隐藏
        return instance.close()
      }
      Dialog.confirm({
        closeOnClickOverlay: true,
        message: '确定删除吗？'
      }).then(() => {
        let i = this.cartList.ids.findIndex(item => {
          return item === detail.name
        })

        this.cartList.ids.splice(i, 1)
        delete this.cartList.info[detail.name]
        this.getCart()
        instance.close()
      }).catch(() => { // 点击取消按钮 向右展开删除按钮隐藏
        instance.close()
      })
    }
  },
  watch: {
    cartList: {
      deep: true,
      handler: function () {
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
    }
  },
  computed: {
    totalPrice: function () {
      let sum = 0
      this.goodsList.forEach((item, index) => {
        if (this.cartList.info[item.id].ischecked) {
          sum += item.price * this.cartList.info[item.id].count * 100
        }
      })
      return sum
    },
    checkAll: {
      get: function () {
        for (let i in this.cartList.info) {
          if (!this.cartList.info[i].ischecked) {
            return false
          }
        }
        return true
      },
      set: function (newValue) {
        for (let i in this.cartList.info) {
          this.cartList.info[i].ischecked = newValue
        }
      }
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

.cart_item .van-button {
  height: 106px;
}
</style>
