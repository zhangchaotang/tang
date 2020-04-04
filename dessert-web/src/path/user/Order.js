import React, { useState, useEffect } from 'react'
import '../../css/component/order.css'

import { Table, Tag, Button } from 'antd'

import $ from 'jquery'
import Axios from 'axios'

export default function Order() {

  // tab切换方法
  const tabChange = (e) => {
    let v = $(e.target)
    let vp = v.parent()
    vp.addClass('tabHead-active').siblings().removeClass('tabHead-active')

    // 获取参数（通过参数获取数据）
    let state = v.data('name')
    if (state === undefined) {
      getAllOrder()
    } else {
      getOrder(state)
    }
  }

  // 表格数据
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [loading, setLoading] = useState(false)
  // 获取全部订单数据
  const getAllOrder = () => {
    setDataSource([])
    setLoading(true)
    Axios.get('allOrder', { params: { page, pageSize } }).then((res) => {
      if (res.data.code === 200) {
        setDataSource(res.data.data)
        setLoading(false)
      }
    })
  }
  // 获取各个状态下的订单
  const getOrder = (state) => {
    setDataSource([])
    setLoading(true)
    Axios.get('order/', { params: { page, pageSize, state } }).then((res) => {
      if (res.data.code === 200) {
        setDataSource(res.data.data)
        setLoading(false)
      } else {
        console.log(res.data)
      }
    })
  }
  useEffect(() => {
    getAllOrder()
  }, [setDataSource])
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      render: (data) => {
        return data.toLocaleString()
      }
    },
    {
      title: '名称',
      dataIndex: 'g_name',
    },
    {
      title: '金额',
      dataIndex: 'price'
    },
    {
      title: '地址',
      render: (data) => {
        return <span>{data.province}/{data.city}/{data.street}</span>
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (data) => {
        if (data === 0) {
          return <Tag color="magenta">未付款</Tag>
        } else if (data === 1) {
          return <Tag color="magenta">已付款</Tag>
        } else if (data === 2) {
          return <Tag color="magenta">已发货</Tag>
        }
      }
    },
    {
      title: '操作',
      render: (data) => {
        if (data.state === 0) return <Button>去付款</Button>
        if (data.state === 1) return <Button>查看物流</Button>
        if (data.state === 3 && data.iscomment === 0) return <Button>去评论</Button>
        if (data.state === 3 && data.iscomment === 1) return <Button>查看评论</Button>
      }
    }
  ];



  return (
    <div className='order'>
      {/* tab切换 */}
      {/* 切换头 */}
      <div className="tabHead">
        <div className="tabHead-item tabHead-active">
          <span onClick={(e) => { tabChange(e) }}>全部订单</span>
        </div>
        <div className="tabHead-item">
          <span data-name='0' onClick={(e) => { tabChange(e) }}>未支付</span>
        </div>
        <div className="tabHead-item">
          <span data-name='1' onClick={(e) => { tabChange(e) }}>待收货</span>
        </div>
        <div className="tabHead-item">
          <span data-name='2' onClick={(e) => { tabChange(e) }}>已签收</span>
        </div>
        <div className="tabHead-item">
          <span data-name='3' onClick={(e) => { tabChange(e) }}>评价</span>
        </div>
      </div>
      {/* 内容 */}
      <div className="tabContent">
        <Table dataSource={dataSource} columns={columns} rowKey='id'
          loading={loading}
          pagination={{
            page: page,
            pageSize: pageSize,
            total: 8
          }}
        />
      </div>
    </div>
  )
}
