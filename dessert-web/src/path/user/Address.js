import React, { useState, useEffect } from 'react'
// 引入axios
import Axios from 'axios'
// 获取省市县数据
import city from '../../assets/lib/city'
// 引入antd
import { Table, Tag, Button, Modal, Cascader, Form, Input, Icon, message } from 'antd'
// 引入样式
import '../../css/component/address.css'

const { TextArea } = Input;
const { confirm } = Modal;
function Address(props) {
  // 定义分页参数
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  // 定义行数据
  const [dataSource, setDataSource] = useState([])
  // 创建列标题
  const columns = [
    {
      title: '收货人',
      dataIndex: 'username'
    }, {
      title: '所在地区',
      render: data => {
        return <span>{data.province}/{data.city}/{data.county}</span>
      }
    }, {
      title: '详细地址',
      dataIndex: 'street'
    }, {
      title: '邮编',
      dataIndex: 'email'
    }, {
      title: '手机/电话',
      dataIndex: 'phone'
    }, {
      title: '操作',
      render: (data) => {
        return <div>
          <Button type='danger' onClick={() => { delAddress(data.id) }}>删除</Button>
          <Button type='primary' onClick={() => { getOneAddress(data.id) }}>修改</Button>
        </div>
      }
    }, {
      title: '设置默认',
      render: (data) => {
        if (data.default_sites === 1) return <Tag color='red'>默认地址</Tag>
        if (data.default_sites === 0) return <Tag color='#108ee9' onClick={() => { uptAddress(data.id) }}>设置默认</Tag>
      }
    },

  ]

  // 运行生命周期函数
  useEffect(() => {
    getaddress()
  }, [page])
  // 创建获取数据方法‘
  const getaddress = () => {
    setLoading(true)
    Axios.get('/address', { params: { page, pageSize } }).then(res => {
      if (res.data.code === 200) {
        setDataSource(res.data.data)
        setLoading(false)
      }
    })
  }
  // 创建添加/修改地址方法
  const addAddress = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (id === null) {
          let res = await Axios.post('/createAddress', values)
          if (res.data.code === 200) {
            message.success('添加地址成功')
            getaddress()
            setVisible(false)
          }
        } else {
          values.id = id
          let res = await Axios.put('/setAddress', values)
          if (res.data.code === 200) {
            message.success('修改地址成功')
            getaddress()
            setVisible(false)
            setId(null)
          }
        }
      }
    })
  }
  // 删除地址
  const delAddress = (id) => {
    confirm({
      title: '您确定要这个删除地址吗？,一旦删除将无法回复！',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        let res = await Axios.delete('/address', { params: { id } })
        if (res.data.code === 200) {
          getaddress()
          message.success('删除成功！')
        }
      }
    })
  }
  // 修改默认地址
  const uptAddress = (id) => {
    console.log(id)
    confirm({
      title: '您确定要这个地址为默认地址吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        let res = await Axios.put('/defaultAddress', {id})
        if (res.data.code === 200) {
          getaddress()
          message.success('修改成功！')
        }
      }
    })
  }
  // 获取指定id地址
  const getOneAddress = async (id) => {
    let res = await Axios.get('/getOneAddress', { params: { id } })
    if (res.data.code === 200) {
      props.form.setFieldsValue({
        phone: res.data.data.phone,
        username: res.data.data.username,
        email: res.data.data.email,
        sites: [res.data.data.province, res.data.data.city, res.data.data.county],
        street: res.data.data.street
      })
      setVisible(true)
      setId(id)
      document.querySelector('.ant-cascader-picker-label').innerHTML = [res.data.data.province, res.data.data.city, res.data.data.county]
    }
  }


  // 定义form布局
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  }

  const { getFieldDecorator } = props.form;

  return (
    <div className="address">
      <div className="userHead">
        收货地址
      </div>
      <div className="tabContent">
        <Button type='primary' className='addSites' onClick={() => { setVisible(true) }}>添加地址</Button>
        <Table dataSource={dataSource} columns={columns} loading={loading}
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
      {/* 添加弹框 */}
      <Modal
        title={id === null ? '添加地址' : '修改地址'}
        visible={visible}
        okText='确定'
        cancelText='取消'
        onOk={addAddress}
        onCancel={() => { setVisible(false) }}
      >
        <Form layout='horizontal'>
          <Form.Item label='手机号码' {...formItemLayout} colon hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: '必须添加手机号码' },
                { pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '手机格式不正确！' }
              ]
            })(
              <Input
                placeholder='请填写手机号码'
                prefix={<Icon type='phone' />}
              />
            )
            }
          </Form.Item>
          <Form.Item label='收货人姓名' {...formItemLayout} colon hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '必须添加收货人姓名' }
              ]
            })(
              <Input
                placeholder='请填写收货人姓名'
                prefix={<Icon type='user' />}
              />
            )
            }
          </Form.Item>
          <Form.Item label='邮政编码' {...formItemLayout} colon hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                { pattern: /^[0-9]\\d{5}$/, message: '邮政编码错误!' }
              ]
            })(
              <Input
                placeholder='请填写邮政编码'
                prefix={<Icon type='mail' />}
              />
            )
            }
          </Form.Item>
          <Form.Item label='地址信息' {...formItemLayout} colon hasFeedback>
            {getFieldDecorator('sites')(
              <Cascader
                options={city}
                placeholder="请选择地址"
                fieldNames={{ label: 'name', value: 'name', children: 'children' }}
              />
            )
            }
          </Form.Item>
          <Form.Item label='详细地址' {...formItemLayout} colon hasFeedback>
            {getFieldDecorator('street')(
              <TextArea placeholder='请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息' rows={4} />
            )
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}


export default Form.create()(Address)