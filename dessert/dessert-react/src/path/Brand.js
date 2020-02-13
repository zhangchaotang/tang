import React from 'react'

import { Layout, Breadcrumb, Button, Table, Modal, Form, Input, Icon, Select, Upload, message } from 'antd'
const { Content } = Layout;

export default function Brand() {
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
      </Content>
    </div>
  )
}
