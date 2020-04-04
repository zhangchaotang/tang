import React, { useState, useEffect } from 'react'
// 引入antd
import Axios from 'axios'
// 引入antd
import { Table, Button, Modal, Radio, message } from 'antd'
// 引入样式
import '../../css/component/balance.css'


// 表格列
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    render: (data) => {
      return data
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
    title: '操作',
    render: (data) => {
      return <Button>查看详情</Button>
    }
  }
];

export default function Balance() {



  // 表格数据
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [payList, setPayList] = useState([])
  const [payId, setPayId] = useState(1)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    getLog()
    getPay()
    getUser()
  }, [page])

  // 获取全部订单数据
  const getLog = () => {
    setDataSource([])
    setLoading(true)
    Axios.get('/log', { params: { page, pageSize } }).then((res) => {
      if (res.data.code === 200) {
        setDataSource(res.data.data)
        setLoading(false)
      }
    })
  }

  // 获取充值数据
  const getPay = () => {
    Axios.get('/getPay').then(res => {
      if (res.data.code === 200) {
        setPayList(res.data.data)
      }
    })
  }

  const fn = () => {
    if (userData.userbalance.length === 1) {
      return <div>
        <span className='big'>{userData.userbalance[0]}</span>
        <span className='tiny'>.00元</span>
      </div>
    } else {
      return <div>
        <span className='big'>{useState.userbalance[0]}</span>
        <span className='tiny'>.{useState.userbalance[1]}元</span>
      </div>
    }
  }

  // 获取用户数据
  const getUser = () => {
    Axios.get('/user').then(res => {
      if (res.data.code === 200) {
        res.data.data.userbalance = JSON.stringify(res.data.data.userbalance).split('.')
        setUserData(res.data.data)
      }
    })
  }

  // 充值方法
  const handleOk = async () => {
    let res = await Axios.post('/createOrder', { g_id: payId, num: 1 })
    if (res.data.code === 200) {
      let res2 = await Axios.post('/pay', { orderId: res.data.orderId })
      if(res2.data.code === 200) {
        getUser()
        message.success('充值成功！')
        setVisible(false)
      }
    }
  }

  return (
    <div className='balance'>
      <div className="userHead">
        账户余额
      </div>
      <div className="opeBalance">
        {/* 用户名称 */}
        <div className="userName">
          <p>账户名:</p>
          <span>{userData === null ? '' : userData.petName === null ? userData.username : userData.petName}</span>
        </div>
        {/* 用户余额 */}
        <div className="balanceNum">
          <p>账户余额</p>
          {userData === null ? '' : fn()}
        </div>
        {/* 按钮组 */}
        <div className="balanceBtns">
          <button onClick={() => { setVisible(true) }}>充值</button>
          <button>提现</button>
        </div>

      </div>
      <div className="userHead">
        资产动态
      </div>
      <div className="tabContent">
        <Table dataSource={dataSource} columns={columns} loading={true}
          onChange={(page) => { setPage(page) }}
          rowKey='id'
          loading={loading}
          pagination={{
            page: page,
            pageSize: pageSize,
            total: 8
          }}
        />
      </div>

      {/* 充值弹框 */}
      <Modal
        title="充值"
        visible={visible}
        okText='确定'
        cancelText='取消'
        onOk={handleOk}
        onCancel={() => { setVisible(false) }}
      >
        <div className='pay'>
          <Radio.Group onChange={(e) => { setPayId(e.target.value) }} value={payId}>
            {
              payList === null ? '' : payList.map((v, k) => {
                return <Radio key={k} value={v.id} >
                  <div className='payItem'>
                    <img src={v.url} alt="" />
                    <p>{v.g_name}</p>
                  </div>
                </Radio>
              })
            }
          </Radio.Group>
        </div>
      </Modal>
    </div>
  )
}
