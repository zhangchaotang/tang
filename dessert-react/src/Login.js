import React from 'react'

import { Form, Input, Button, Icon, message } from 'antd'

import Axios from 'axios'

function Login(props) {
  const { getFieldDecorator } = props.form;

  // 创建登录方法
  let seveLogin = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        Axios.post('/admin/login', values).then((res) => {
          if (res.data.code === 200) {
            message.success('登录成功！')
            localStorage.setItem('token', res.data.token)
            props.history.push('/')
          } else {
            message.error(res.data.error)
          }
        })
      }
    })
  }
  return (
    <div id='login'>
      < Form >
        <Form.Item hasFeedback >
          {
            getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '必须填写管理员名称！'
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder='请输入管理员名称'
              />
            )
          }
        </Form.Item>
        <Form.Item hasFeedback >
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '必须填写管理员密码！'
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" />}
                placeholder='请输入管理员密码'
              />
            )
          }
        </Form.Item>
        <Form.Item>
          <Button  className='btn' type='primary' onClick={seveLogin}>
            登录
        </Button>
        </Form.Item>
      </Form >
    </div>
  )
}


const login = Form.create()(Login)

export default login