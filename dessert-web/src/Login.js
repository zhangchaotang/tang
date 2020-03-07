import React from 'react'

// 导航条
import HeaderNav from './component/HeaderNav'
import Base from './component/Base'

// 引入antd
import { Form, Button, Input, Icon, Checkbox, message } from 'antd'
// 引入路由
import { Link } from 'react-router-dom'

import './css/login.css'
import Axios from 'axios'

function Login(props) {
  const { getFieldDecorator } = props.form;

  // 登录
  const login = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post('/login', values).then((res) => {
          if (res.data.code === 200) {
            message.success('登录成功！')
            localStorage.setItem('token',res.data.token)
            props.history.push('/')
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
              登录
            </h3>
            <Form>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '必须填写用户手机号码' }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请填写用户手机号码'
                  />
                )}
              </Form.Item> <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '必须填写用户密码' }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请填写用户密码'
                  />
                )}
              </Form.Item>
              <Button type="primary" onClick={login} className="login-btn">
                登录
              </Button>
            </Form>
            {/* 操作按钮 */}
            <div className="login-btns">
              <span> <Checkbox>记住密码</Checkbox> </span>
              <div>
                <span><Link to='/rejister'>去注册</Link></span>
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

export default Form.create()(Login)