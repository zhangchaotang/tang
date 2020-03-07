import React from 'react'
import { Route, Link } from 'react-router-dom'
import './css/user.css'

import HeaderNav from './component/HeaderNav'
import Base from './component/Base'
import TransactionAdm from './path/TransactionAdm'
import Order from './path/Order'

export default function User() {
  return (
    <div className='user'>
      <HeaderNav />
      {/* 显示个人信息区域 */}
      <div className='showPersonal'>
      </div>
      <div className="common userBox">
        {/* 分为左右两块 */}
        {/* 选项区 */}
        <div className='useOption'>
          <ul className='useCnt'>
            <li className='userItem userActive'>
              <Link to='/user/order'>我的订单</Link>
            </li>
            <li className='userItem'>
              积分对换
          </li>
            <li className='userItem'>
              我的账户
          </li>
            <li className='userItem'>
              账户余额
          </li>
            <li className='userItem'>
              商品评论
          </li>
            <li className='userItem'>
              修改资料
          </li>
            <li className='userItem'>
              收货地址
          </li>
            <li className='userItem'>
              退出登录
          </li>
          </ul>
        </div>
        {/* 显示区 */}
        <div className='useShow'>
          <Route path='/user/transactionAdm' component={TransactionAdm} />
          <Route path='/user/order' component={Order} />
        </div>
      </div>
      <Base />
    </div>
  )
}
