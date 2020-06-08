import React, { useState } from 'react'

import { Layout, Menu } from 'antd'

import { Link, Route } from 'react-router-dom'

// 引入子组件
import Classify from './path/Classify'
import AddGoods from './path/AddGoods'
import GoodsList from './path/GoodsList'
import Brand from './path/Brand'
import SetClassify from './path/SetClassify'

const { Header, Content, Sider } = Layout;


export default function Home() {

  // 定义导航数据

  const [navContent, setNavContent] = useState([
    {
      title: '首页',
      childer: [
        {
          title: '账户设置',
          path: '/setUser'
        }
      ]
    },
    {
      title: '商品',
      childer: [
        {
          title: '商品列表',
          path: '/goodsList'
        },
        {
          title: '添加商品',
          path: '/addGoods'
        },
        {
          title: '分类列表',
          path: '/classifyList'
        },
        {
          title: '品牌管理',
          path: '/brand'
        },{
          title:'分类管理',
          path:'setClassify'
        }
      ]
    },
    {
      title: '订单',
      childer: [
        {
          title: '订单列表',
          path: '/orderList'
        }
      ]
    }
  ])

  const [checkTopNav, setCheckTopNav] = useState(0)


  return (
    <div id="home">

      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[checkTopNav + '']}  // 默认选择项
            style={{ lineHeight: '64px' }} // 顶部导航行高
          >
            {navContent.map((v, k) => {
              return <Menu.Item key={k} onClick={() => { setCheckTopNav(k) }}>{v.title}</Menu.Item>
            })}
          </Menu>
        </Header>
        <Layout>
          {/* 左边导航 */}
          <Sider width={240} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['0']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {navContent[checkTopNav].childer.map((v, k) => {
                return <Menu.Item key={k}> <Link to={v.path}>{v.title}</Link> </Menu.Item>
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            {/* 面包屑 */}
            
            <Route path='/classifyList' component={ Classify } />
            <Route path='/addgoods' component={ AddGoods } />
            <Route path='/goodsList' component={ GoodsList } />
            <Route path='/brand' component={ Brand } />
            <Route path='/setClassify' component={ SetClassify } />

          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
