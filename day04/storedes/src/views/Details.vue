<template>
  <div class="details">
    <!-- 商品详情页 -->
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 商品 图片轮播图 -->
    <van-swipe :autoplay="1500" style="height: 300px;" indicator-color="white">
      <van-swipe-item>
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
    </van-swipe>

    <!--  -->
    <van-cell-group>
      <van-cell>
        <div class="goods-title">加肥猫 (100/个)</div>
        <div class="price">100</div>
      </van-cell>
      <van-cell class="express">
        <van-col class="express" span="10">运费：30</van-col>
        <van-col class="express" span="14">剩余：11</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link>
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link />
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell title="查看商品详情" is-link />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" info="12" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.details .price {
  color: #f44;
}

.details .express {
  color: #999;
  font-size: 12px;
}

.details .cell-group {
  border-top: 6px solid #efefef;
}

.details .van-goods-action {
  z-index: 3;
}
</style>
