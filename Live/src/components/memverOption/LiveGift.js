import React, { useState, useEffect } from 'react'

import { Card, Breadcrumb, Icon, Radio, Table } from 'antd'


import { Link } from 'react-router-dom'
import Axios from 'axios'

export default function LiveGift() {

  const [data, setdate] = useState([])

  const [query, setquery] = useState({
    page: 1,
    page_size: 5,
    pay_status: ''
  })

  const [total, settotal] = useState(0)

  const columns = [
    {
      title: '礼物名称',
      dataIndex: 'gift_name'
    },
    {
      title: '礼物图片',
      dataIndex: 'addtime',
      render: (data) => {
        return <img src={data} alt='' />
      }
    },
    {
      title: '礼物价格',
      dataIndex: 'price',
    },
    {
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

  useEffect(() => {

    if (query.pay_status === 1) {
      Axios.get(`/front/gifts/isend?page=${query.page}&page_size=${query.page_size}`).then((res) => {
        console.log(res)
        if (res.data.ok === 1) {
          setdate(res.data.data)
          settotal(res.data.total)
        }
      })
    } else {
      Axios.get(`/front/gifts/my?page=${query.page}&page_size=${query.page_size}`).then((res) => {
        if (res.data.ok === 1) {
          setdate(res.data.data)
          settotal(res.data.total)
        }
      })
    }

  }, [query])

  let typeChange = (e) => {
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
          我的管理
        </Breadcrumb.Item>
      </Breadcrumb>
    }>

      <Radio.Group defaultValue="0" buttonStyle="solid" onChange={typeChange}>
        <Radio.Button value="1">我送的礼物</Radio.Button>
        <Radio.Button value="0">我收到的礼物 </Radio.Button>
      </Radio.Group>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
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
