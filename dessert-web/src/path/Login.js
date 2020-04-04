import React from 'react'
// 引入axios
import Axios from 'axios'
// 引入 reduxu
import { store } from '../store'
// 引入antd
import { Form, Button, Input, Icon, Checkbox, message } from 'antd'
// 引入路由
import { Link } from 'react-router-dom'
// 引入样式
import '../css/login.css'


function Login(props) {
  const { getFieldDecorator } = props.form;
  // 登录
  const login = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post('/login', values).then((res) => {
          if (res.data.code === 200) {
            // 提示用户登录成功
            message.success('登录成功！')
            // 存储token
            localStorage.setItem('token', res.data.token)
            // 存储用户信息到redux
            localStorage.setItem('userInfo',JSON.stringify(res.data.data))
            store.dispatch({
              type: 'NEWUSER',
              data: res.data.data
            })
            props.history.push('/')
          } else {
            message.error(res.data.error)
          }
        })
      }
    })
  }
  return (
    <div>
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
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请填写用户手机号码'
                  />
                )}
              </Form.Item> <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '必须填写用户密码' }]
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                <span><Link to='/'>忘记密码</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Form.create()(Login)