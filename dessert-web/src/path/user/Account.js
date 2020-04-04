import React, { useState, useEffect } from 'react'
// 引入moment
import moment from 'moment';
// 引入jquery
// 引入antd
import { Form, Input, Icon, DatePicker, message } from 'antd'
// 引入样式
import '../../css/component/account.css'
// 创建实例
function Account(props) {
  const { getFieldDecorator } = props.form
  // 定义layot布局
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }
  // 定义日期格式
  const dateFormat = 'YYYY/MM/DD';

  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  return (
    <div className="account">
      <div className="userHead">
        我的账户
      </div>
      <div className="accoutMain">
        <Form layout='horizontal'>
          <div className="accotMain-left">
            <Form.Item label='用户昵称' {...formItemLayout}>
              {getFieldDecorator('petName', {
                initialValue: userInfo === null ? '' : userInfo.petName
              })(
                <div>
                  <Input
                    defaultValue={userInfo === null ? '' : userInfo.petName}
                    disabled={true}
                    prefix={<Icon type="heart" style={{ color: '#ff54a3' }} />}
                    placeholder='用户昵称'
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item label='绑定号码' {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: userInfo === null ? '' : userInfo.username
              })(
                <div>
                  <Input
                    defaultValue={userInfo === null ? '' : userInfo.username}
                    disabled={true}
                    prefix={<Icon type="phone" style={{ color: '#ff54a3' }} />}
                    placeholder='绑定号码'
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item label='生日' {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: userInfo === null ? '' : userInfo.birthday
              })(
                <div>
                  <DatePicker disabled placeholder='生日' defaultValue={moment(userInfo === null ? '' : userInfo.birthday, dateFormat)} format={dateFormat} />
                </div>
              )}
            </Form.Item>

          </div>
          <div className="accotMain-right">
            <Form.Item label='积分' {...formItemLayout}>
              {getFieldDecorator('integral', {
                initialValue: userInfo === null ? '' : userInfo.integral
              })(
                <div>
                  <Input
                    defaultValue={userInfo === null ? '' : userInfo.integral}
                    disabled={true}
                    prefix={<Icon type="calculator" style={{ color: '#ff54a3' }} />}
                    placeholder='积分'
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item label='余额' {...formItemLayout}>
              {getFieldDecorator('userbalance', {
                initialValue: userInfo === null ? '' : userInfo.userbalance
              })(
                <div>
                  <Input
                    defaultValue={userInfo === null ? '' : userInfo.userbalance}
                    disabled={true}
                    prefix={<Icon type="transaction" style={{ color: '#ff54a3' }} />}
                    placeholder='余额 '
                  />
                </div>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default Form.create()(Account)