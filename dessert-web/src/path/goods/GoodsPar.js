import React, { useState, useEffect } from 'react'

import $ from 'jquery'
import '../../css/goodsPar.css'
import ImageMagnifier from "../../component/ImageMagnifier";
import leftBtn from '../../images/leftBtn.png'
import rightBtn from '../../images/rightBtn.png'
import { message, InputNumber, Radio, Tabs, List, Avatar, Icon } from 'antd';
import Axios from 'axios';
const { TabPane } = Tabs;


export default function GoodsPar() {
  const [gooimgList, setGooimgList] = useState([
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/23-5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/Snipaste_2019-10-17_08-15-55.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/33-5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/2-1612061T603.png',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/Snipaste_2019-10-17_08-15-55.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg',
  ])
  const [listData, setListData] = useState([
    {
      title: `哈哈`, // 评论人名称
      avatar: 'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/33-5.jpg', // 头像 
      content: '味道很不错',
    },
    {
      title: `哈哈`, // 评论人名称
      avatar: 'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/33-5.jpg', // 头像 
      content: '味道很不错',
    }
  ])

  for (let i = 0; i < 3; i++) {
    listData.push();
  }

  const [moveLeft, setMoveLeft] = useState(0)


  const [minImg, setMinImg] = useState(gooimgList[0])
  const [maxImg, setMaxImg] = useState(gooimgList[0])
  const [loading, setLoading] = useState(false)
  // 定义放评论大图片路径
  const [amplifierUrl, setAmplifierUrl] = useState('')
  // 放大镜图片显示改变方法
  const imgChange = (src) => {
    setMaxImg(src)
    setMinImg(src)
  }
  // 图片列表左移动方法
  const leftmove = () => {
    // 每次偏移距离
    let moveOffset = $('.imgListContent').find('img').innerWidth() + 8
    if (moveLeft < 0) {
      setMoveLeft(moveLeft + moveOffset)
    }
  }
  // 图片列表右移动方法
  const rightmove = () => {
    // 每次偏移距离
    let moveOffset = $('.imgListContent').find('img').innerWidth() + 8
    if (moveLeft > -moveOffset * (gooimgList.length - 5)) {
      setMoveLeft(moveLeft - moveOffset)
    }
  }
  // 创建节流函数
  const throttle = (fn, time = 1000) => {
    let timer = null
    let startTile = new Date()
    return function () {
      const context = this
      let currentTime = new Date()
      clearTimeout(timer)
      if (currentTime - startTile >= time) {
        fn.apply(context, arguments)
        startTile = currentTime
      } else {
        timer = setTimeout(() => {
          fn.apply(context, arguments)
        }, time)
      }
    }
  }
  // 选择属性
  const changeProp = (e, index) => {
    $(e.target).addClass('propItem-checked').siblings().removeClass('propItem-checked')
    setIndex(index)
  }
  // 定义评论放大图片方法
  const setAmplifier = (e, url) => {
    setAmplifierUrl(url)
    $('.amplifier img').css({
      'right': -500,
      'width': 0
    })
    let el = $(e.target).parent().siblings('.amplifier').children()
    el.css({
      'width': 300
    })
    el.animate({
      'right': 620
    }, 300)
  }

  // 商品规格
  const [spec, setSpec] = useState([])
  // 规格位置
  const [index, setIndex] = useState(0)
  const [goodsNum, setGoodsNum] = useState(1)

  useEffect(() => {
    getspec()
  }, [])

  // 获取规格
  const getspec = () => {
    Axios.get('/spec').then(res => {
      if (res.data.code === 200) {
        setSpec(res.data.data)
      }
    })
  }

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );


  return (
    <div className="goodsPar">
      {/* 商品图片和属性 */}
      <div className="common goodsParCnt">
        <div className="details">
          {/* 放大镜 */}
          <ImageMagnifier minImg={minImg} maxImg={maxImg} />
          {/* 轮播切换图片 */}
          <div className="imgList">
            {/* 左按钮 */}
            <div className="leftBtn" onClick={throttle(leftmove)}>
              <img src={leftBtn} alt="" />
            </div>
            {/* 图片列表 */}
            <div className="imgListContent">
              <div style={{ width: gooimgList.length * 64 + 'px', left: moveLeft + 'px' }}>
                {
                  gooimgList.map((item, index) => {
                    return <img key={index} src={item} onClick={() => { imgChange(item) }} alt='' />
                  })
                }
              </div>
            </div>
            {/* 右按钮 */}
            <div className="rightBtn" onClick={throttle(rightmove)}>
              <img src={rightBtn} alt="" />
            </div>

          </div>
        </div>
        {/* 商品属性 */}
        <div className="goodsAttr">
          {/* 商品名称 */}
          <h4 className="name">芒果白雪糯米</h4>
          {/* 商品价格 */}
          {spec.length === 0 ? '' : <div className="price">
            <p>价格：<span className="original">￥{spec[index].price}</span></p>
            <p>促销价：<span className="promotion">￥{spec[index].price}</span></p>
            <p>店铺打折：<span className="discount">满200八五折</span></p>
          </div>}
          {/* 款式 */}
          <div className="prop">
            <span>款式：</span>
            {spec.length === 0 ? '' : <div>
              {spec.map((v, k) => {
                if (k === 0) {
                  return <div key={k} onClick={(e) => { changeProp(e, k) }} className="propItem propItem-checked">
                    {v.spec_list.join('，')}
                  </div>
                } else {
                  return <div key={k} onClick={(e) => { changeProp(e, k) }} className="propItem">
                    {v.spec_list.join('，')}
                  </div>
                }
              })}
            </div>}
          </div>
          {/* 数量 */}
          <div className="num">
            <span>数量:</span>
            <div>
              <InputNumber min={1} max={10} onChange={(value) => { setGoodsNum(value) }} defaultValue={goodsNum} />
            </div>
          </div>
          {/* 甜度选择 */}
          <div className="sweet">
            <span>甜度:</span>
            <div>
              <Radio.Group defaultValue={1}>
                <Radio value={0}>无糖</Radio>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>加甜</Radio>
                <Radio value={3}>特甜</Radio>
              </Radio.Group>
            </div>
          </div>
          {/* 购买/加入购物车 */}
          <div className="pay">
            <div className="buy"><span>立即购买</span></div>
            <div className="addCart"><span>加入购物车</span></div>
          </div>
          {/* 服务承诺 */}
          {/* 支付方式 */}
        </div>
        {/* 推荐商品 */}
        <div className="recommend">

        </div>
      </div>
      {/* 商品详情 */}
      <div className="common goodsContent">
        {/*  商品排行榜 */}
        <div className="topn">

        </div>
        {/* 页头tab切换 */}
        <div className=" tabHead">
          <Tabs type="card">
            <TabPane tab="宝贝详情" key="1">
              <p className='xk'>商品具有 <a href="#">生产许可证编号</a> ，符合食品质量安全准入标准。</p>
              {/* 商品信息 */}
              <div className="info">
                <ul>
                  <li>品牌: other/其他other/其他other/其他other/其他other/其他other/其他other/其他other/其他other/其他other/其他</li>
                  <li>名称: other/其他</li>
                  <li>尺寸: other/其他</li>
                  <li>储存条件: other/其他</li>
                  <li>保质期: other/其他</li>
                  <li>配料: other/其他</li>
                  <li>品牌: other/其他</li>
                  <li>品牌: other/其他</li>
                </ul>
                <div className="imgs">
                  {gooimgList.map((v, k) => {
                    return <img src={v} alt='' key={k} />
                  })}
                </div>
              </div>
              {/* 图片 */}
            </TabPane>
            <TabPane tab="累计评论" key="2">
              <div className="pl">
                <div className="plhead">
                  <Radio.Group defaultValue={0}>
                    <Radio value={0}>全部</Radio>
                    <Radio value={1}>图片</Radio>
                    <Radio value={2}>好评</Radio>
                    <Radio value={3}>中评</Radio>
                    <Radio value={4}>差评</Radio>
                  </Radio.Group>
                </div>
                <div className="plContent">
                  <List
                    split={true}
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        // 三个图标
                        actions={
                          [
                            <IconText type="star-o" text="156" key="skeleton-star-o" />,
                            <IconText type="like-o" text="156" key="skeleton-like-o" />,
                            <IconText type="message" text="2" key="skeleton-message" />,
                          ]
                        }
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.content}
                        />
                        <div className="plimgs">
                          {
                            gooimgList.map((v, k) => {
                              return <img onClick={(e) => { setAmplifier(e, v) }} className='plimg' src={v} alt='' key={k} />
                            })
                          }
                        </div>
                        <div className="amplifier">
                          <img src={amplifierUrl} alt="" />
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="专享服务" key="3">
              <div className="zxfw">
                <h4>价格说明</h4>
                <div className="zxfwContent">
                  <p className='zxfwTitle'>划线价格</p>
                  <p className='zxfwText'>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，<span>并非原价</span> ，仅供参考。</p>
                  <p className='zxfwTitle'>未划线价格</p>
                  <p className='zxfwText'>指商品的 <span>实时标价</span>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。 </p>
                  <p className="zxfwText">商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</p>
                  <p className="zxfwText">此说明仅当出现价格比较时有效，具体请参见《本网站价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</p>
                  <div className="aqts">
                    <div className='aqtsRow'>
                      <span>安全提示：</span> <p>交易中请不要接收可疑文件和不要点击不明来源的链接，支付前核实好域名和支付详情。 本网站不会以订单有问题，让您提供任何银行卡、密码、手机验证码！遇到可疑情况可在钱盾“诈骗举报”中进行举报, 安全推荐</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div >

  )
}
