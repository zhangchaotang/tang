import React, { useState, useEffect } from 'react'

import { Layout, Breadcrumb, Button, Table} from 'antd'

import Axios from 'axios'

const { Content } = Layout;

export default function Brand() {

  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'b_name'
    },
    {
      title: '商品图片',
      dataIndex: 'src',
      render: data => {
        return <img src={data} alt='' style={{ height: "65px" }} />
      }
    }, {
      title: '操作',
      render: (data) => {
        return <div>
          <Button type="danger">删除</Button>
          <Button type="ghost">编辑</Button>
        </div>
      }
    }
  ]
  // 品牌列表
  const [brandList, setBrandList] = useState([
    {
      id: '1',
      b_name: 'sha',
      src: '123123'
    }
  ])
    // 发起请求
    useEffect(() => {
      Axios.get('/brand').then((res) => {
        if (res.data.code === 200) {
          setBrandList(res.data.data)
        }
      })
    }, [brandList])

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
        <Breadcrumb.Item>品牌管理</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          height: '100%',
          minHeight: '80vh'
        }}
      >
        <Button type="primary">添加品牌</Button>
        <Table
          dataSource={brandList}
          columns={columns}
          rowKey='id'
          style={{ padding: '20px 0' }}
        >

        </Table>
      </Content>
    </div>
  )
}
