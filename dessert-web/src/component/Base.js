import React from 'react'

import '../css/base.css'
import footerLogo from '../images/footer-logo.png'
import footerIocn from '../images/footericon-02.png'

export default function Base(props) {
  return (
    <div className="base" style={props.style}>
      {/* 图标 */}
      <div className="base-icon">
        <img src={footerLogo} alt="" />
      </div>
      {/* 链接 */}
      <div className="base-link">
        <span>联系我们</span>
        <span>/</span>
        <span>订购帮助</span>
        <span>/</span>
        <span>企业合作</span>
        <span>/</span>
        <span>生产经营资质</span>
        <span>/</span>
        <span>公告专区</span>
      </div>
      {/* 微信 */}
      <div className="base-wx">
        <img src={footerIocn} alt="" />
      </div>
      {/* 订购提醒 */}
      <div className="base-rem">
        <p>订购专线: xxxx-xxxxxxx (服务时间 08:00-22:00)，团购热线: xxx xxxx xxxx</p>
        <p>客服电话:xxxx-xxxxxxx</p>
        <p>请提前3小时预定，当日 20点 以后的订单，于次日 8点 后开始审核</p>
        <p>当日蛋糕配送截至下单时间 20:00</p>
        <p>店铺地址:xxxxxxxxxxxxxxxxxx</p>
      </div>
      {/* 网站许可证 */}
      <div className="base-root">
        <p>Copyright© 信德利蛋糕官网商城 2007-2018, 版权所有 京ICP备14006254号-1</p>
      </div>
    </div>
  )
}
