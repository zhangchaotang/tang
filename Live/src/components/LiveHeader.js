import React, { Component, Fragment } from 'react'

import { Row, Col, Button, Modal, Form, Input, Icon, message, Menu, Avatar, Select, notification } from 'antd'

import { Link } from 'react-router-dom'

import axios from 'axios'

import logo from '../images/logo192.png'


// 引入redux
import { store } from '../store'

// 校验时长
let MaxSearchTime = 60


let timeID = null

const { SubMenu } = Menu;

const { Option } = Select;


class LiveHeader extends Component {


  constructor(props) {
    super(props)

    this.state = {
      // 0为全部关闭 1为开启登录弹框 2为开启注册弹框 3 为打开注册房间弹框
      DialogType: 0,
      // 发送验证码 文字
      sms_btn_txt: '发送验证码',
      // 校验时长
      sms_btn_code: MaxSearchTime,
      // 存储用户信息 存储在redux中
      userInfo: store.getState().userInfo,
      catlist: []
    }
  }


  componentDidMount() {
    // 监听 redux 中的数据是否发生变化 如果发生变化则在页面获取redux最新数据
    store.subscribe(() => {
      this.setState({
        userInfo: store.getState().userInfo
      })
    })
    // 获取用户数据
    this.getUserInfo()
    this.getCatOption()
  }

  // 关闭弹框的方法
  checkDialog = (DialogType) => {
    this.setState({
      DialogType
    })

    if (timeID !== null) {
      this.resetTime()
    }
  }

  // 创建登录弹框
  loginDialog = () => {
    const { getFieldDecorator } = this.props.form

    return <Modal
      width="350px"
      title="登录"
      visible={true}
      okText="确定"
      cancelText="取消"
      onOk={this.login}
      onCancel={() => { this.checkDialog(0) }}
    >

      <Form>
        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '必须要输入一个手机号'
              },
              {
                pattren: /^1[356789]\d{9}$/,
                message: '请输入11位的手机号!'
              }
            ]
          })(
            <Input
              placeholder="请输入手机号码"
              prefix={<Icon type="mobile" />}
            />
          )
          }
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: '必须填入密码!'
              }, {
                pattern: /^\w{6,18}$/,
                message: '请输入一个由数字、字母、下划线组成的6到18位的密码'
              }
            ]
          })(
            <Input.Password
              placeholder="请输入一个6~18位的密码"
              prefix={<Icon type="lock" />}
            />
          )
          }
        </Form.Item>
        没有账号?<Button type="link" onClick={() => { this.checkDialog(2) }}>点击注册</Button>

      </Form>

    </Modal>
  }

  // 创建注册弹框
  regnDialog = () => {
    const { getFieldDecorator } = this.props.form

    return <Modal
      width="350px"
      title="注册"
      visible={true}
      okText="确定"
      cancelText="取消"
      onOk={this.register}
      onCancel={() => { this.checkDialog(0) }}
    >

      <Form>
        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '必须要输入一个手机号'
              },
              {
                pattren: /^1[356789]\d{9}$/,
                message: '请输入11位的手机号!'
              }
            ]
          })(
            <Input
              placeholder="请输入手机号码"
              prefix={<Icon type="mobile" />}
            />
          )
          }
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: '必须填入密码!'
              }, {
                pattern: /^\w{6,18}$/,
                message: '请输入一个由数字、字母、下划线组成的6到18位的密码'
              }
            ]
          })(
            <Input.Password
              placeholder="请输入一个6~18位的密码"
              prefix={<Icon type="lock" />}
            />
          )
          }
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '必须填入一个昵称!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="请输入昵称"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('sms_code', {
            rules: [
              {
                required: true,
                message: '必须填入一个验证码!'
              }
            ]
          })(
            <Input.Search
              prefix={<Icon type="bulb" />}
              enterButton={this.state.sms_btn_txt}
              onSearch={this.search}
              placeholder="请输入验证码"
            />
          )}
        </Form.Item>
        已经有账号?<Button type="link" onClick={() => { this.checkDialog(1) }}>点击登录</Button>

      </Form>
    </Modal>
  }

  // 申请房间弹框
  roomDialog = () => {
    const { getFieldDecorator } = this.props.form
    this.getCatOption()
    return <Modal
      width="350px"
      title="注册房间"
      visible={true}
      okText="确定"
      cancelText="取消"
      onOk={this.applyRoom}
      onCancel={() => { this.checkDialog(0) }}
    >

      <Form>
        <Form.Item>
          {getFieldDecorator('room_name', {
            rules: [
              {
                required: true,
                message: '必须输入一个房间名称'
              }
            ]
          })(
            <Input
              placeholder="请输入房间名称"
              prefix={<Icon type="mobile" />}
            />
          )
          }
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("room_introduce", {
            rules: [
              {
                required: true,
                message: '必须填入房间简介!'
              }
            ]
          })(
            <Input
              placeholder="请输入房间介绍"
              prefix={<Icon type="lock" />}
            />
          )
          }
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('category_id', {
            rules: [
              {
                required: true,
                message: '请选择一个分类!'
              }
            ]
          })(
            <Select placeholder="请选择一个分类">
              {this.catList()}
            </Select>
          )}
        </Form.Item>

      </Form>
    </Modal>
  }

  isShow = () => {
    if (this.state.DialogType === 0) {
      return

    } else if (this.state.DialogType === 1) {
      return this.loginDialog()

    } else if (this.state.DialogType === 2) {
      return this.regnDialog()
    } else if (this.state.DialogType === 3) {
      return this.roomDialog()
    }
  }

  search = () => {
    if (timeID === null) {

      timeID = setInterval(() => {
        if (this.state.sms_btn_code <= 0) {
          this.resetTime()

        } else {
          this.setState({
            sms_btn_txt: `剩余  ${this.state.sms_btn_code}  s`,
            sms_btn_code: this.state.sms_btn_code - 1
          })

        }
      }, 1000);

    }
  }

  // 重置定时器方法
  resetTime = () => {
    clearInterval(timeID)

    this.setState({
      sms_btn_txt: '发送验证码'
    })

    this.setState({
      sms_btn_code: MaxSearchTime
    })

    timeID = null
  }


  //  发起登录请求
  login = () => {
    this.props.form.validateFields(async (err, values) => {

      if (!err) {
        let { data: res } = await axios.post('/front/login', values)

        if (res.ok !== 1) return message.error(res.error)

        message.success('登录成功!')

        sessionStorage.setItem("token", res.data.token)

        this.checkDialog(0)

        this.getUserInfo()
      }
    });
  }

  // 发起注册请求
  register = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { data: res } = await axios.post('/front/users', values)
        if (res.ok !== 1) return message.error(res.error)
        message.success('注册成功!')
        this.checkDialog(1)
      }
    });
  }

  // 获取用户消息
  getUserInfo = async () => {
    if (sessionStorage.getItem('token') === null) return

    let { data: res } = await axios.get("/front/users")

    if (res.ok === 1) {

      // 修改redux 中用户数据
      store.dispatch({
        type: 'putUserInfo',
        data: res.data
      })

    } else {
      message.error(res.error)
    }

  }


  // 退出登录
  unLogin = () => {
    sessionStorage.removeItem("token")
    store.dispatch({
      type: 'LOGOUT'
    })
  }

  // 申请房间
  applyRoom = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { data: res } = await axios.post('/front/rooms', values)
        if (res.ok === 1) {
          message.success('申请成功!')
          this.getUserInfo()
        } else {
          message.error(res.error)
        }
      }
    })
  }

  // 申请直播

  applyLive = async () => {
    let { data: res } = await axios.post('/front/rooms/live')
    if (res.ok === 1) {
      notification.open({
        message: `推流地址:`,
        description: res.data.push_url,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        duration: 0
      });

      notification.open({
        message: `拉流地址:`,
        description: res.data.pull_url,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        duration: 0
      });
    } else {
      message.error(res.error)
    }
  }

  // 获取分类选项
  getCatOption = async () => {
    let { data: res } = await axios.get('/front/categories')
    if (res.ok === 1) {
      this.state.catlist = res.data
    }
  }

  catList = () => {
    this.getCatOption()
    let arr = [...this.state.catlist]
    return arr.map(v => {
      return <Option key={v.id} value={v.id}>{v.cat_name}</Option>
    })
  }

  // 顶部导航 右边按钮
  leftBtnShow = () => {
    if (this.state.userInfo === null) return

    if (this.state.userInfo !== null && this.state.userInfo.room_id === null) return <Button type="danger" onClick={() => { this.checkDialog(3) }}>创建房间</Button>

    if (this.state.userInfo !== null && this.state.userInfo.room_id !== null) return <Fragment>
      &nbsp;<Button type="danger"><Link to={'/room/' + this.state.userInfo.room_id}>我的房间</Link></Button>
      &nbsp;<Button type="danger" onClick={this.applyLive}>申请直播</Button>
    </Fragment>

  }

  // 顶部导航 左边按钮
  rightBtnShow = () => {
    if (this.state.userInfo === null) {
      return (
        <Fragment>
          <Button type="link" onClick={() => { this.checkDialog(1) }}>登录</Button>
          &nbsp;
          &nbsp;
            <Button type="link" onClick={() => { this.checkDialog(2) }}>注册</Button>
        </Fragment>
      )

    } else {
      return (
        <Menu mode="horizontal" theme='dark'>
          <SubMenu
            title={
              <Fragment>
                {this.state.userInfo.avatar ? <Avatar src={this.state.userInfo.avatar} />
                  : <Avatar className="userIcon" style={{ backgroundColor: '#87d068' }} icon="user" />}
                &nbsp; &nbsp;
                  {this.state.userInfo.name}
              </Fragment>
            }
          >
            <Menu.Item><Link to="/member/avatar">设置头像</Link></Menu.Item>
            <Menu.Item><Link to="/member/pay">充值(￥{this.state.userInfo.money}元)</Link></Menu.Item>
            <Menu.Item><Link to="/member/gift">我的礼物</Link></Menu.Item>
            <Menu.Item><Link to="/member/order">我的订单</Link></Menu.Item>
            <Menu.Item onClick={this.unLogin}>退出</Menu.Item>
          </SubMenu>
        </Menu>
      )

    }

  }





  render() {
    return (
      <Row style={{ height: '100%' }}>
        <Col span={3} style={{ height: '100%' }}>
          <Link to='/'><img src={logo} style={{ height: '100%' }} alt="" /></Link>
        </Col>
        <Col span={18}>
          {this.leftBtnShow()}
        </Col >
        <Col span={3}>
          {this.rightBtnShow()}
          {this.isShow()}
        </Col>
      </Row>
    )
  }
}



export default Form.create()(LiveHeader)