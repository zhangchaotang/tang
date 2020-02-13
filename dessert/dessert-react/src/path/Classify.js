import React, { useState, useEffect } from 'react';

import { Tabs, Table, Breadcrumb, Layout } from 'antd';

import Axios from 'axios'

const { TabPane } = Tabs;
const { Content } = Layout;


function Classify(props) {

  const [tabsNav, setTabsNav] = useState(null)

  const [tabsData, setTabsData] = useState(null)


  const [info, setInfo] = useState(0)

  const columns = [
    {
      title: '商品名称',
      dataIndex: 'g_name',
    }, {
      title: '商品价格',
      dataIndex: 'g_price',
    }
  ]

  // 获取表格数据
  useEffect(() => {
    Axios.get('/classify').then((res) => {
      if (res.data.code === 200) {
        setTabsNav(res.data.data)
        if (tabsData === null) {
          setInfo(res.data.data[0].id)
        }
      }
    })
  }, []);

  useEffect(() => {
    Axios.get(`/classify/${info}`).then((res) => {
      if (res.data.code === 200) {
        setTabsData(res.data.data)
      }
    })
  }, [info]);

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
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
        <Tabs defaultActiveKey={info + ''} onChange={(activeKey) => { setInfo(activeKey) }}>
          {tabsNav !== null ? tabsNav.map(v => {
            return <TabPane tab={v.c_name} key={v.id}>
              <Table columns={columns} dataSource={tabsData} rowKey='id' />
            </TabPane>
          }) : ''}
        </Tabs>
      </Content>
    </div>
  )
}

export default Classify;
