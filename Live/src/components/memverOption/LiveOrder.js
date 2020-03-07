import React, { useState, useEffect } from 'react'

import { Card, Breadcrumb, Icon, Radio, Table, Tag } from 'antd'

import { Link } from 'react-router-dom'

import moment from 'moment'

import Axios from 'axios'

export default function LiveOrder(props) {

  // 声明state
  // 声明表格初始数据
  const [data, setdata] = useState([])

  // 声明total
  const [total, settotal] = useState(0)

  // 声明分页初始数据
  const [query, setquery] = useState({
    page: 1,
    page_size: 5,
    pay_status: ''
  })

  const columns = [
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
    }
  ]


  useEffect(() => {
    Axios.get(`/front/orders?page=${query.page}&page_size=${query.page_size}&pay_status=${query.pay_status}`).then((res) => {
      if (res.data.ok === 1) {
        setdata(res.data.data)
        settotal(res.data.total)
      }
    })

  }, [query])


  let typeChange = (e) => {
    // e.target.value
    let info = { ...query }
    info.pay_status = e.target.value
    setquery(info)
  }

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
      <Radio.Group defaultValue="" buttonStyle="solid" onChange={typeChange}>
        <Radio.Button value="">全部订单</Radio.Button>
        <Radio.Button value="1">已支付订单</Radio.Button>
        <Radio.Button value="0">未支付订单</Radio.Button>
      </Radio.Group>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='order_sn'
        pagination={{
          current: query.page,
          total: total,
          pageSize: query.page_size,
          onChange: (page) => { let info = { ...query }; info.page = page; setquery(info) }
        }}
      >

      </Table>
    </Card>
  )
}
