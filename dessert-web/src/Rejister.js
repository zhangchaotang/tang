import React, { useEffect, useState } from 'react'

import Axios from 'axios'
import $ from 'jquery'

// 导航条
import HeaderNav from './component/HeaderNav'
import Base from './component/Base'

// 引入antd
import { Form, Button, Input, Icon, Checkbox, message } from 'antd'
// 引入路由
import { Link } from 'react-router-dom'

import './css/login.css'
import { render } from 'react-dom'

function Rejister(props) {

  const [countDown, setCountDown] = useState(0)
  const [svgText, setSvgText] = useState('')
  const { getFieldDecorator } = props.form;

  useEffect(() => {
    cap()
  }, [])

  const cap = () => {
    Axios.get('/security').then((res) => {
      $('.svgBox').html($(res.data.img))
      setSvgText(res.data.text)
    })
  }
  // 发送手机校验码
  const phoneVerify = () => {
    let phone = props.form.getFieldValue('phone')
    Axios.post('/note', { phone }).then((res) => {
      if (res.data.code === 200) {
        let num = 60;
        let timeId = setInterval(() => {
          num--;
          setCountDown(num)
          if (num === 0) clearInterval(timeId)
        }, 1000);
      } else {
        message.error(res.data.error)
      }
    })
  }

  // 注册
  const rejister = () => {
    let security = props.form.getFieldValue('security')
    if (security !== svgText) return message.error('图形验证错误！')
    props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post('/rejister', values).then((res) => {
          if (res.data.code === 200) {
            message.success('注册成功！ 即将跳转登录页面')
            setTimeout(() => {
              props.history.push('/login')
            }, 1500);
          } else {
            message.error(res.data.error)
          }
        })
      }
    })
  }
  return (
    <div>
      <HeaderNav />
      <div className="login-box">
        <div className="login-content common">
          <div className="login">
            <h3 className="title">
              注册
            </h3>
            <Form>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号码' }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请输入手机号码'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入8~20个字符，需同时包含英文和数字' }]
                })(
                  <Input.Password
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='密码:请输入8~20个字符，需同时包含英文和数字'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('security')(
                  <div className="security">
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入图片字符'
                    />
                    <div className="svgBox" onClick={cap}></div>
                  </div>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('code')(
                  <div className="code security">
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入短信验证码'
                    />
                    <Button style={{
                      height: '44px',
                      fontSize: '12px',
                      code: '#442818',
                      backgroundColor: '#fafafa',
                      marginLeft: '6px'
                    }}
                      disabled={countDown === 0 ? false : true}
                      onClick={phoneVerify}
                    >{countDown === 0 ? '获取校验码' : countDown}</Button>
                  </div>
                )}
              </Form.Item>

              <Button type="primary" onClick={rejister} className="login-btn">
                注册
              </Button>
            </Form>
            {/* 操作按钮 */}
            <div className="login-btns">
              <span> </span>
              <div>
                <span><Link to='/login'>去登录</Link></span>
                <span><Link>忘记密码</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Base style={{ marginTop: '0' }} />
    </div >
  )
}

export default Form.create()(Rejister)