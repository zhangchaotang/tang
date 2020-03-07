import React, { Component } from 'react'

import { Card, Breadcrumb, Icon, Tag, Radio, InputNumber, Button, Modal, Form } from 'antd'

import { Link } from 'react-router-dom'

import zfb from '../../images/zfb.jpg'
import wx from '../../images/wx.png'

import Axios from 'axios'

// 引入redux

import { store } from '../../store'

const zfbPayWay = 1

const wxPayWay = 2


class LivePay extends Component {

  constructor(props) {
    super(props)


    let x = store.getState().userInfo
    this.state = {
      payWay: wxPayWay,
      money: x === null? null:x.money,
      payDialog: false,
      payDialogContent: ''
    }
  }

  componentDidMount = () => {
    store.subscribe(() => {
      this.setState({
        money: store.getState().userInfo.money
      })
    })
  }

  payChange = e => {
    this.setState({
      payWay: e.target.value,
    });
  };


  sevePay = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { data: res } = await Axios.post("/front/users/money", values)
        if (res.ok === 1) {
          console.log(res)
          this.setState({
            payDialog: true,
            payDialogContent: <img src={res.data.qrcode} alt='' />
          })
          this.order_sn = res.data.order_sn
          this.isPay()
        }
      }
    })

  }

  // 创建一个判断这个订单是否付款的方法
  isPay = async () => {
    let { data: res } = await Axios.get('/front/orders/pay_status/' + this.order_sn)
    console.log(res)
    if (res.ok === 1 && res.data.status === 1) {
      this.setState({
        payDialog: false,
        payDialogContent: ''
      })
    } else {
      setTimeout(() => {
        this.isPay()
      }, 3000);
    }
  }


  // 充值产生的订单号
  order_sn = ''


  render() {

    const { getFieldDecorator } = this.props.form

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
            充值
          </Breadcrumb.Item>
        </Breadcrumb>
      }>

        <p> 当前余额： <Tag color='red'>{this.state.money}</Tag> ￥</p>

        <Radio.Group onChange={this.payChange} value={this.state.payWay}>

          <Radio disabled={true} value={zfbPayWay}><img width='60%' src={zfb} alt="支付宝支付" /></Radio>

          <Radio value={wxPayWay}><img width='58%' src={wx} alt="微信支付" /></Radio>

        </Radio.Group>

        <br />
        <br />
        <br />

        <div>
          <Form>
            <Form.Item>
              {getFieldDecorator('money', {
                rules: [{
                  required: true,
                  message: '必须填写金额!'
                }]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              )
              }
            </Form.Item>

            <Form.Item>
              <Button type='primary' onClick={this.sevePay}>确定充值</Button>
            </Form.Item>
          </Form>

        </div>

        <br />
        <br />



        <Modal
          title='二维码充值'
          visible={this.state.payDialog}
          footer={null}
          width='340px'
          style={{ textAlign: 'center' }}
          closable={false}
        >
          {this.state.payDialogContent}
        </Modal>
      </Card>
    )
  }
}

export default Form.create()(LivePay)