import React, { useState, useEffect } from 'react'
// 显示搜索商品组件
export default function test2(props) {
 
  return (
    <div>
      <div className="item">
        {/* 分类名称 */}
        <h4 className="title">
          {data.category}
        </h4>
        <div className="goods">
          {/* 商品名称  商品价格 */}
          <div className="goods-title" style={{display:'flex', justifyContent:'left'}}>
            <div className="goods-name">名称</div>
            <div className="goods-price">价格</div>
          </div>
        </div>
      </div>
    </div>
  )
}
