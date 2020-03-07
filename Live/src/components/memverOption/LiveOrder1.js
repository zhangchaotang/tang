import React, { Component } from 'react'

import { Card, Breadcrumb, Icon, Radio, Table, Tag, Button } from 'antd'

import { Link } from 'react-router-dom'

import moment from 'moment'
import Axios from 'axios'

export default class LiveOrder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      query: {
        page: 1,
        page_size: 5,
        pay_status: '',
      },
      total: ''
    }
  }

  columns = [
    {
      title: '订单号',
      dataIndex: 'order_sn'
    },
    {
      title: '下单时间',
      dataIndex: 'addtime',
      render: (data) => {
        return moment(data * 1000).format('YYYY-HH-DD hh:mm')
      }
    }, {
      title: '订单状态',
      dataIndex: 'pay_status',
      render: (data) => {
        return data === 1 ? <Tag color="blue">已支付</Tag> : <Tag color="red">未支付</Tag>
      }
    }, {
      title: '操作',
      // dataIndex: 'pay_status',
      // render: (data) => {
      //   return <div>
      //     {data === 0 ? <Button type='primary'>去支付</Button> : ''}
      //     &nbsp;
      //     &nbsp;
      //     &nbsp;
      //     <Button type='danger'>删除订单</Button></div>
      // }
    },
  ]

  componentDidMount = () => {
    this.getData()
  }


  getData = async () => {
    let { data: res } = await Axios.get(`/front/orders?page=${this.state.query.page}&page_size=${this.state.query.page_size}&pay_status=${this.state.query.pay_status}`)
    if (res.ok === 1) {
      // console.log(res)
      this.setState({
        data: res.data,
        total: res.total
      })
    }
  }

  typeChange = (e) => {
    // e.target.value
    let info = { ...this.state.query }
    info.pay_status = e.target.value
    this.setState({
      query: info
    }, () => {
      this.getData()
    }
    )
  }

  pageChange = (page) => {
    let info = { ...this.state.query }
    info.page = page
    this.setState({
      query: info
    }, () => {
      this.getData()
    }
    )
  }

  render() {
    return (
      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="user" />会员中心
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            我的订单
          </Breadcrumb.Item>
        </Breadcrumb>
      }>
        <Radio.Group defaultValue="" buttonStyle="solid" onChange={this.typeChange}>
          <Radio.Button value="">全部订单</Radio.Button>
          <Radio.Button value="1">已支付订单</Radio.Button>
          <Radio.Button value="0">未支付订单</Radio.Button>
        </Radio.Group>

        <Table
          columns={this.columns}
          dataSource={this.state.data}
          rowKey='order_sn'
          pagination={{
            current: this.state.query.page,
            total: this.state.total,
            pageSize: this.state.query.page_size,
            onChange: this.pageChange
          }}
        >

        </Table>
      </Card>
    )
  }
}
