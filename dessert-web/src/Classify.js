import React from 'react'

// 加载样式
import './css/classify.css'
// 引入 jquery
import $ from 'jquery'

// 获取顶部导航
import HeaderNav from './component/HeaderNav'
// 获取商品模块
import GoodsBox from './component/GoodsBox'
// 获取底部模块
import Base from './component/Base'

import img from './images/xinpin-cake-1.png'

export default function Classify() {

  const catChange = (e) => {
    $(e.target).addClass('cat-active').siblings().removeClass('cat-active')
  }

  return (
    <div>
      {/* 顶部导航 */}
      <HeaderNav />
      <div className="common">
        {/* 分类搜索 */}
        <div className="cat-box">
          <div className="cat-list">
            <div className="cta-title">
              分类:
          </div>
            <div className="cta-content">
              <span className='cat-active'>全部分类</span>
              <span>蛋糕</span>
              <span>冰淇淋</span>
              <span>下午茶</span>
              <span>布丁</span>
              <span>面包</span>
            </div>
          </div>
          <div className="cat-taset">
            <div className="cta-title">
              口味:
          </div>
            <div className="cta-content">
              <span className="cat-active" onClick={(e) => { catChange(e) }}>全部分类</span>
              <span onClick={(e) => { catChange(e) }}>乳脂奶油</span>
              <span>慕斯</span>
              <span>慕斯奶酪</span>
              <span>巧克力</span>
              <span>坚果</span>
              <span>水果</span>
              <span>含酒</span>
              <span>咖啡</span>
              <span>冰淇淋</span>
            </div>
          </div>
        </div>
        {/* 显示分类下商品 */}
        <div className="content">
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
          <GoodsBox src={img} style={{ margin: '10px 14px' }} />
        </div>
      </div>
      {/* 底部 */}
      <Base />
    </div>
  )
}
