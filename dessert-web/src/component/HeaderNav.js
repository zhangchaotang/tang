import React from 'react'

import { Affix } from 'antd'

import '../css/headerNav.css'

import logo from '../images/logo.png'

// import App from '../App'
// import Classify from '../Classify'

import { Link } from 'react-router-dom'

export default function HeaderNav() {
  return (
    // 头部导航页面
    <Affix offsetTop='0'>
      <div className="headerNav">
        {/* 分为左中右 左为商城logo 中为商品导航  右为用户服务 */}
        <div className="subNav logo">
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="subNav classify">
          <div><Link to='/'>首页</Link></div>
          <div><Link to='/classify'>蛋糕</Link></div>
          <div>面包</div>
          <div>冰淇淋</div>
          <div>下午茶</div>
        </div>
        <div className="subNav user">
          <div className="dowload-par">APP下载
          <div className="download">
              <img src={logo} alt="" />
            </div>
          </div>
          <div>个人中心</div>
          <div><Link to='/login'>登录</Link> / <Link to='rejister'>注册</Link></div>
          <div className='myCart'></div>
        </div>
      </div>
    </Affix>

  )
}
