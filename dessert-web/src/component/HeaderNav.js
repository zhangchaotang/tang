import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { store } from '../store'
import { Affix, Menu, Avatar, Icon, Modal } from 'antd'
import '../css/headerNav.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu;
const { confirm } = Modal;
export default function HeaderNav(props) {
  // 定义分类数组
  const [brandList, setBrandList] = useState([])
  // 用户信息
  const [userInfo, setUserInfo] = useState(store.getState().userInfo)

  useEffect(() => {
    getBrand()
    // 获取 localStorage的值
    let user = store.getState().userInfo
    if (user === null) {
      let useData = JSON.parse(localStorage.getItem('userInfo'))
      store.dispatch({
        type: 'NEWUSER',
        data: useData
      })
    }
    setUserInfo(store.getState().userInfo)
  }, [userInfo])
  // 监听store 变化
  store.subscribe(() => {
    setUserInfo(store.getState().userInfo)
  })
  // 获取品牌
  const getBrand = () => {
    Axios.get('/recBrand').then(res => {
      if (res.data.code === 200) {
        setBrandList(res.data.data)
      }
    })
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
        window.location.href = '/login'
      }
    })
  }
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
          {brandList.map(v => {
            return <div key={v.id}><Link to={`/brand/${v.id}`}>{v.b_name}</Link></div>
          })}
        </div>
        <div className="subNav user">
          <div className="dowload-par">
            APP下载
            <div className="download">
              <img src={logo} alt="" />
            </div>
          </div>
          {userInfo === null ? <div>您还没有登录</div> :
            <div>
              <Menu mode="horizontal">
                <SubMenu
                  style={{ color: 'color: #9d8374', border: 'none' }}
                  key="sub1"
                  title={<div><span>欢迎您：{userInfo === null ? '' : userInfo.petName === null ? userInfo.username : userInfo.petName}</span></div>}
                >

                  <Menu.Item key="1" className="headerNav-menyItem">
                    <Link to='/user/account'>
                      {userInfo.userimg === null ? <Avatar size='small' icon="user" /> : <Avatar src={userInfo.userimg} />}
                      <span className='headerNav-text'>个人中心</span>
                    </Link>
                  </Menu.Item>

                  <Menu.Item key="2" className="headerNav-menyItem"><Link to='/user/integral'> <Icon style={{ width: '24px' }} type="gift" /><span className='headerNav-text'>我的积分</span>  </Link></Menu.Item>
                  <Menu.Item key="3" className="headerNav-menyItem"><Link to='/user/order'> <Icon style={{ width: '24px' }} type="profile" /><span className='headerNav-text'>我的订单</span></Link></Menu.Item>
                  <Menu.Item key="4" className="headerNav-menyItem" onClick={quit}> <Icon style={{ width: '24px' }} type="export" /> <span className='headerNav-text'>退出登录</span></Menu.Item>
                </SubMenu>
              </Menu>
            </div>}
          <div> <span><Link to='/login'>登录</Link>/</span> <span><Link to='rejister'>注册</Link></span> </div>
          <div className='myCart'></div>
        </div>
      </div>
    </Affix>

  )
}
