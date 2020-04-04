import React, { useState, useEffect, Suspense } from 'react'
// 引入router
import { Route, Link } from 'react-router-dom'
// 引入 axios
import Axios from 'axios'
// 引入 redux
import { store } from '../store'
// 引入样式
import '../css/user.css'
// 引入 antd
import { message, Modal } from 'antd'
// 引入子组件
const TransactionAdm = React.lazy(() => import('./user/TransactionAdm'))
const Order = React.lazy(() => import('./user/Order'))
const Account = React.lazy(() => import('./user/Account'))
const Integral = React.lazy(() => import('./user/Integral'))
const Balance = React.lazy(() => import('./user/Balance'))
const Address = React.lazy(() => import('./user/Address'))


const { confirm } = Modal

export default function User(props) {
  // 定义用户数据
  const [userData, setUserData] = useState([])
  const [userNav, setUserNav] = useState([
    {
      name: '我的账户',
      path: '/user/account'
    }, {
      name: '积分对换',
      path: '/user/integral'
    }, {
      name: '我的订单',
      path: '/user/order'
    },
    {
      name: '账户余额',
      path: '/user/balance'
    },
    {
      name: '商品评论',
      path: '/user/comment'
    },
    {
      name: '修改资料',
      path: '/user/amend'
    },
    {
      name: '收货地址',
      path: '/user/address'
    }
  ])
  const [index, setIndex] = useState(null)
  // 获取用户信息
  useEffect(() => {
    Axios.get('/user').then(res => {
      if (res.data.code === 200) {
        setUserData(res.data.data)
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
      } else if (res.data.code === 301) {
        message.warning(`登录信息失效！2秒后跳转到登录页面`)
        setTimeout(() => {
          props.history.push('/login')
        }, 2000);
      }
    })
    setUserPath()
  }, [])

  const setUserPath = () => {
    let path = props.location.pathname
    let i = userNav.findIndex(item => item.path === path)
    setIndex(i)
  }

  // 退出登录
  const quit = () => {
    confirm({
      title: '您确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        store.dispatch({
          type: 'NEWUSER',
          data: null
        })
        props.history.push('/login')
      }
    })
  }

  return (
    <div className='user'>
      {/* 显示个人信息区域 */}
      <div className='showPersonal'>
        {/* 用户头像 */}
        <div className="userIcon" title='点击更换头像'>
          <img src={userData.userimg} alt="" />
        </div>
      </div>
      <div className="common userBox">
        {/* 分为左右两块 */}
        {/* 选项区 */}
        <div className='useOption'>
          <ul className='useCnt'>
            {
              index === null ? '' : userNav.map((v, k) => {
                return <Link to={v.path} key={k}>
                  {index === k ?
                    <li className='userItem userActive' onClick={() => { setIndex(k) }}>
                      {v.name}
                    </li>
                    :
                    <li className='userItem' onClick={() => { setIndex(k) }}>
                      {v.name}
                    </li>}
                </Link>
              })
            }


            <li onClick={quit} className='userItem'>
              退出登录
          </li>
          </ul>
        </div>
        {/* 显示区 */}
        <div className='useShow'>
          <Suspense fallback='加载中...'>
            <Route path='/user/transactionAdm' component={TransactionAdm} />
            <Route path='/user/order' component={Order} />
            <Route path='/user/account' component={Account} />
            <Route path='/user/integral' component={Integral} />
            <Route path='/user/balance' component={Balance} />
            <Route path='/user/address' component={Address} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
