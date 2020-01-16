import React, { useState } from 'react'

import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { SubMenu } = Menu;
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
                return <Menu.Item key={k}>{v.title}</Menu.Item>
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            {/* 面包屑 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
                height: '100vh'
              }}
            >
              {
                checkTopNav
              }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
