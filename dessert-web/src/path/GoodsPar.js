import React, { useState } from 'react'

import HeaderNav from '../component/HeaderNav'
import $ from 'jquery'

import '../css/goodsPar.css'

import ImageMagnifier from "../component/ImageMagnifier";
import leftBtn from '../images/leftBtn.png'
import rightBtn from '../images/rightBtn.png'
import { message } from 'antd';
export default function GoodsPar() {

  const [minImg, setMinImg] = useState('')
  const [maxImg, setMaxImg] = useState('')
  const [gooimgList, setGooimgList] = useState([
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/23-5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/Snipaste_2019-10-17_08-15-55.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/33-5.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/2-1612061T603.png',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/Snipaste_2019-10-17_08-15-55.jpg',
    'https://zhangchaotang.oss-cn-beijing.aliyuncs.com/dessert/y5.jpg'
  ])

  //  图片显示改变方法
  const imgChange = (src) => {
    setMaxImg(src)
    setMinImg(src)
  }
  // 图片列表移动方法
  const move = (direction) => {
    //原点
    let ordgin = $('.imgListContent').children('div').position().left
    // 每次偏移距离
    let moveOffset = Math.floor($('.imgListContent').find('img').width())
    if (direction == 'left') {
      if (ordgin >= 0) return message.warn('到头了')
      $('.imgListContent').children('div').stop().animate({ 'left': ordgin + moveOffset }, 1000)
    } else {
      if (Math.ceil(Math.abs($('.imgListContent').children('div').position().left)) >= (gooimgList.length - 5) * moveOffset) return message.warn('到头了')
      $('.imgListContent').children('div').stop().animate({ 'left': ordgin - moveOffset }, 1000)
    }
  }

  return (
    <div className="goodsPar">
      <HeaderNav />
      <div className="common goodsParCnt">
        <div className="details">
          {/* 放大镜 */}
          <ImageMagnifier minImg={minImg} maxImg={maxImg} />
          {/* 轮播切换图片 */}
          <div className="imgList">
            {/* 左按钮 */}
            <div className="leftBtn" onClick={() => { move('left') }}>
              <img src={leftBtn} alt="" />
            </div>
            {/* 图片列表 */}
            <div className="imgListContent">
              <div style={{ width: gooimgList.length * 64 + 'px' }}>
                {
                  gooimgList.map((item) => {
                    return <img src={item} onClick={() => { imgChange(item) }} alt='' />
                  })
                }
              </div>
            </div>
            {/* 右按钮 */}
            <div className="rightBtn" onClick={() => { move('right') }}>
              <img src={rightBtn} alt="" />
            </div>

          </div>

        </div>
        {/* 商品属性 */}
        <div className="goodsAttr">
          {/* 商品名称 */}
          <h4 className="name">芒果白雪糯米</h4>
          {/* 商品价格 */}
          <div className="price">
            <p>价格：<span className="original">￥35</span></p>
            <p>促销价：<span className="promotion">￥20</span></p>
            <p>店铺打折：<span className="discount">满200八五折</span></p>
          </div>
          {/* 款式 */}
          <div className="prop">
            <span>尺寸：</span>
            <div>
                <div className="propItem">111</div>
                <div className="propItem">222</div>
            </div>
          </div>
          {/* 数量 */}
          <div className="num">
            <span>数量:</span>
            <div>
                
            </div>
          </div>
          {/* 购买/加入购物车 */}
          {/* 服务承诺 */}
          {/* 支付方式 */}
        </div>
        {/* 推荐商品 */}
        <div className="recommend">

        </div>
      </div>


    </div >

  )
}
