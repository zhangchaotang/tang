import React, { Component } from 'react'

import { Layout, Menu } from 'antd'

import { Route, Link } from 'react-router-dom'

import LiveAvatar from '../components/memverOption/LiveAvatar'
import LiveGift from '../components/memverOption/LiveGift'
import LivePay from '../components/memverOption/LivePay'
import LiveOrder from '../components/memverOption/LiveOrder'

const { Sider, Content } = Layout;

export default class Member extends Component {
  render() {
    return (
      <Layout id="member">
        <Sider>
          <Menu defaultSelectedKeys={this.props.location.pathname}>

            <Menu.Item key='/member/avatar'>
              <Link to="/member/avatar">设置头像</Link>
            </Menu.Item>

            <Menu.Item key='/member/pay'>
              <Link to="/member/pay">充值</Link>
            </Menu.Item>

            <Menu.Item key='/member/gift'>
              <Link to="/member/gift">我的礼物</Link>
            </Menu.Item>

            <Menu.Item key='/member/order'>
              <Link to="/member/order">我的订单</Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Content>
          <Route path='/member/avatar' component={LiveAvatar} />

          <Route path='/member/pay' component={LivePay} />

          <Route path='/member/gift' component={LiveGift} />

          <Route path='/member/order' component={LiveOrder} />
        </Content>
      </Layout>
    )
  }
}
