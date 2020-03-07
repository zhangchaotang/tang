import React from 'react'

import HeaderNav from './component/HeaderNav'
import GoodsBox from './component/GoodsBox'
import Slideshow from './component/Slideshow'
import Base from './component/Base'


import img from './images/xinpin-cake-1.png'
import menu1 from './images/menu-1.jpg'
import menu2 from './images/menu-2.jpg'
import menu3 from './images/menu-3.jpg'
import menu4 from './images/menu-4.jpg'
import menu5 from './images/menu-5.png'
import menuTop from './images/menu-top-1.jpg'
export default function Home() {
  return (
    <div>
      {/* 头部导航 */}
      <HeaderNav />
      <Slideshow />
      <div className="common">
        {/*推荐商品分类  */}
        <div className="recClassify">
          <div className='classify-item'>
            <img src={menu1} alt="" />
          </div>
          <div className='classify-item'>
            <img src={menu2} alt="" />
          </div>
          <div className='classify-item'>
            <img src={menu3} alt="" />
          </div>
          <div className='classify-item'>
            <img src={menu4} alt="" />
          </div>
          <div className='classify-item'>
            <img src={menu5} alt="" />
          </div>
        </div>

        {/* 楼层模块 */}
        <div className="floor">
          {/* 楼层标题 */}
          <h4 className="floor-title">
            新品
          <span>/</span>
            <span>专区</span>
          </h4>
          {/* 楼层图片 */}
          <div className="floor-img">
            <img src={menuTop} alt="" />
          </div>
          {/* 楼层商品 */}
          <div className="floor-goods">
            <div className="floor-goods-item">
              {/* 商品模块 */}
              <GoodsBox src={img} />
            </div>
            <div className="floor-goods-item">
              {/* 商品模块 */}
              <GoodsBox src={img} />
            </div>
            <div className="floor-goods-item">
              {/* 商品模块 */}
              <GoodsBox src={img} />
            </div>
            <div className="floor-goods-item">
              {/* 商品模块 */}
              <GoodsBox src={img} />
            </div>
            <div className="floor-goods-item">
              {/* 商品模块 */}
              <GoodsBox src={img} />
            </div>
          </div>
        </div>
      </div>
      {/* 底部 */}
      <Base />
    </div>
  )
}
