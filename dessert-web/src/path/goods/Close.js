import React, { useState, useEffect } from 'react'

import { Button, Icon, Modal, message, Form, Cascader, Input } from 'antd'
import Axios from 'axios'
import city from '../../assets/lib/city'
import '../../css/path/goods/close.css'
const { confirm } = Modal;
const { TextArea } = Input;
// 结算页面
function Close(props) {

  // 创建地址数据
  const [site, setSite] = useState([])
  // 是否点击更多地址
  const [isopen, setIsopen] = useState(false)
  // 选中地址
  const [checked, setChecked] = useState(0)
  // 控制弹框
  const [visible, setVisible] = useState(false)
  // 要修改的id
  const [id, setId] = useState(null)

  // 定义form布局
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  }
  const { getFieldDecorator } = props.form;
  // 获取地址信息
  useEffect(() => {
    getsite()
  }, [])
  // 创建获取地址函数
  const getsite = async () => {
    let { data: res } = await Axios.get('/address')
    if (res.code === 200) {
      setSite(res.data)
    }
  }
  // 创建添加/修改地址方法
  const addAddress = () => {
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (id === null) {
          let res = await Axios.post('/createAddress', values)
          if (res.data.code === 200) {
            message.success('添加地址成功')
            getsite()
            setVisible(false)
          }
        } else {
          values.id = id
          let res = await Axios.put('/setAddress', values)
          if (res.data.code === 200) {
            message.success('修改地址成功')
            getsite()
            setVisible(false)
            setId(null)
          }
        }
      }
    })
  }
  // 删除地址
  const delsite = (id) => {
    confirm({
      title: '您确定要这个删除地址吗？,一旦删除将无法回复！',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        let res = await Axios.delete('/address', { params: { id } })
        if (res.data.code === 200) {
          getsite()
          message.success('删除成功！')
        }
      }
    })
  }
  // 修改默认地址
  const uptsite = (id) => {
    confirm({
      title: '您确定要这个地址为默认地址吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        let res = await Axios.put('/defaultAddress', { id })
        if (res.data.code === 200) {
          getsite()
          message.success('修改成功！')
        }
      }
    })
  }
  // 获取指定id地址
  const getOnesite = async (id) => {
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
  return (
    <div className='Close'>
      <div className="common clearFix">
        {/* 提示信息 */}
        <h4 className='close__title'>
          填写并核对订单信息
        </h4>
        <div className="close__box">
          {/* 显示收货地址 */}
          <div className="close__showsites">
            {/* 标题 */}
            <h4 className='close__biaoti'>收货人信息</h4>
            {/* 显示地址 */}
            <ul className='close__sitesContent' style={{ height: isopen ? 'auto' : '50px' }}>
              {site.length === 0 ? '无地址' : site.map((v, k) => {
                if (v.default_sites === 0) {
                  return <li key={k} className={`close__sitesItem`}>
                    {/* 名字 */}
                    <div onClick={() => { setChecked(v.id) }} className={`close__name ${v.id === checked ? 'close__name--default' : ''}`}>{v.username}</div>
                    {/* 信息 */}
                    <div className="close__xingxi">
                      <div className='close__xingxitetx' onClick={() => { setChecked(v.id) }}>
                        <span className='close__usename'>{v.username}</span>
                        <span className='close__dizxx'>{`${v.province}/${v.city}/${v.county}/${v.street}`}</span>
                        <span className='close__dizxx'>{v.phone}</span>
                      </div>
                      <div className="close__xxBtns">
                        <Button type='link' onClick={() => { getOnesite(v.id) }}>编辑</Button>
                        <Button type='link' onClick={() => { delsite(v.id) }}>删除</Button>
                        <Button type='link' onClick={() => { uptsite(v.id) }}>设置为默认地址</Button>
                      </div>
                    </div>
                  </li>
                } else {
                  return <li key={k} className={`close__sitesItem`}>
                    {/* 名字 */}
                    <div onClick={() => { setChecked(v.id) }} className={`close__name ${checked === 0 ? 'close__name--default' : v.id === checked ? 'close__name--default' : ''}`}>{v.username}</div>
                    {/* 信息 */}
                    <div className="close__xingxi">
                      <div className='close__xingxitetx' onClick={() => { setChecked(v.id) }}>
                        <span className='close__usename'>{v.username}</span>
                        <span className='close__dizxx'>{`${v.province} /${v.city}/${v.county}/${v.street}`}</span>
                        <span className='close__dizxx'>{v.phone}</span>
                      </div>
                      <div className="close__xxBtns">
                        <Button type='link' onClick={() => { getOnesite(v.id) }}>编辑</Button>
                        <Button className='close__mrdz' type='link'>默认地址</Button>
                      </div>
                    </div>
                  </li>
                }
              })}
            </ul>
            {/* 显示全部/收起 */}
            <div className="close__xiansshowqi" onClick={() => { setIsopen(!isopen) }}>
              <span>{isopen ? '收起地址' : '更多地址'}</span>
            </div>
          </div>
          {/* 付款方式 */}
          <div className="close__pay">
            {/* 标题 */}
            <h4 className='close__biaoti'>支付方式</h4>
            <div className="close__payBox">
              {/* 微信支付 */}
              <div className="close__payItem close__pay--checked">
                {/* 图标 */}
                <Icon className='close__payIcon' type='wechat' />
                {/* 名字 */}
                <span>微信支付</span>
              </div>
              {/* 支付宝支付 */}
              <div className="close__payItem close__pay--disabled">
                {/* 图标 */}
                <Icon className='close__payIcon' type='alipay-circle' />
                {/* 名字 */}
                <span>支付宝支付</span>
              </div>
            </div>
          </div>
          {/* 清单 */}
          <div className="close__qingdan">
            <h4 className='close__biaoti'>清单</h4>
            <div className="close__spxingxi">
              {/* 商品图片 */}
              <div className="close__spimg">
                <img src="https://img14.360buyimg.com/N4/jfs/t1/94904/6/16513/151286/5e7987beEdc0b52f8/599cbde43895d1db.jpg" alt="" />
              </div>
              {/* 商品信息 */}
              <div className="close__spContent">
                {/* 商品名称 */}
                <span className='close__spname'> 联想ThinkPad E480 14英寸窄边框商务办公手提笔记本电脑超轻薄本 FHD高清屏银色 【i3啊是多久啊的接口</span>
                {/* 商品规格 */}
                <p className='close__gge'>
                  颜色：【i3高清】8G 2
            </p>
              </div>
              {/* 商品价格 */}
              <div className="close__spprice">
                ￥ 2866.00
          </div>
              {/* 购买数量 */}
              <div className='close__num'>
                x1
          </div>
            </div>
          </div>
        </div >
        {/* 列出清单 */}
        < div className="close__chenlie clearFix" >
          <div>
            <p className='close__zongjia'>
              <span className='close__text'>
                <span className='close__num'>1</span>
          件商品，总商品金额：
          </span>
              <span className='close__allprice'>
                ￥2866.00
          </span>
            </p>
          </div>
        </div >
        {/* 提交按钮 */}
        < div className="close__tijiao" >
          <span>提交订单</span>
        </div >
      </div >
      {/* 添加/x修改弹框 */}
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
    </div >
  )
}

export default Form.create()(Close)