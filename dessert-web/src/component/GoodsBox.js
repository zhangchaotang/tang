import React from 'react'
import '../css/goodsBox.css'

import $ from 'jquery'
import { Link } from 'react-router-dom'

export default function GoodsBox(props) {

  const keystr = 'aaksdm'

  let fly = (e) => {
    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'l', 'j', 'k', 'i', 'o', 'p', 'q', 'r', 'w', 't', 'z', 'n', 'm']
    let str = ''
    let num = Math.floor(Math.random() * 10) + 1
    for (let i = 0; i < num; i++) {
      let numtou = Math.floor(Math.random() * arr.length)
      let num2 = Math.floor(Math.random() * num)
      if (i === num2) str += keystr
      str += arr[numtou]
    }

    $(`<div class=${str}>
    <img src=${props.data ? props.data.src : ''} alt="" />
    </div>`).appendTo('#root')

    $(`.${str}`).css({
      'display': 'none',
      'position': 'absolute',
      'width': $(e.target).parent().siblings('.imgBox').width() + 'px',
      'height': $(e.target).parent().siblings('.imgBox').height() + 'px',
      'top': $(e.target).parent().siblings('.imgBox').offset().top,
      'left': $(e.target).parent().siblings('.imgBox').offset().left,
      'z-index': '100'
    })

    $(`.${str}`).children('img').css({
      'width': '100%',
      'background': ' #fafafa center no-repeat',
      'background-size': 'auto 100%',
      'margin': 'auto',
      'border-radius': ' 8px'
    })


    $(`.${str}`).show()
    $(`.${str}`).stop().animate({
      'top': $('.myCart').offset().top + 'px',
      'left': $('.myCart').offset().left + 'px',
      'width': '20px',
      'height': '20px'
    }, 1500, function () {
      $(`.${str}`).remove()
    })
  }

  return (
    <div className="goodsBoxPar" style={props.style}>
      <div className="goodsBox">
        {/* 商品图片 */}
        <div className="imgBox">
          <Link to={'/goodsPar/' + props.data.id}> <img src={props.data ? props.data.src : ''} alt="" /></Link>
        </div>
        {/* 商品名称 */}
        <h6><Link to={'/goodsPar/' + props.data.id}>{props.data.g_name}</Link></h6>
        {/* 商品简介 */}
        <p>
          天真、天然，是这款蛋糕唯一的出发点
      </p>
        {/* 商品标签 */}
        <div className="tags">
          <i className="tag">新品</i>
          <i className="tag">大家不对劲啊的</i>
          <i className="tag">大家不对劲啊的</i>
        </div>
        <div className="price-conn">
          {/* 商品价格 */}
          <span>¥{props.data ? props.data.g_price : ''}</span>
          {/* 操作按钮 */}
          <button onClick={(e) => { fly(e) }}>加入购物车</button>
        </div>
      </div>
    </div>
  )
}
