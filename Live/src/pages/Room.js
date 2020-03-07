import React, { Component } from 'react'

import { PageHeader, Layout, Alert, List, Input, Avatar, Row, Col, Carousel, Icon, Popover, Modal, message } from 'antd';


import '../scss/operationCol.scss'

import Player from '../components/Player'

import '../scss/room.scss'

import io from 'socket.io-client'

import config from '../config'

import Axios from 'axios';

import { store } from '../store'

const { Header, Sider, Content } = Layout;

const { confirm } = Modal;

const { Search } = Input;

export default class Room extends Component {

  newIo = null

  messageListDom = null

  constructor(props) {
    super(props)

    this.state = {
      message: [],
      data: [],
      value: '',
      roomInfo: null,
    }
  }

  componentDidMount = () => {
    this.newIo = io(config.io_host, {
      query: {
        room: this.props.match.params.id,
        token: sessionStorage.getItem("token")
      }
    })

    this.newIo.on('m', this.chatMessage) // 普通消息
    this.newIo.on('g', this.chatGift) // 礼物
    this.newIo.on('n', this.chatNotify) // 系统通知

    // 获取房间信息
    Axios.get(`/front/rooms/${this.props.match.params.id}`).then((res) => {
      console.log(res)
      if (res.data.ok === 1) {
        this.setState({
          roomInfo: res.data.data
        })
      }
    })

    // 获取礼物列表
    Axios.get('/front/gifts').then((res) => {
      if (res.data.ok === 1) {
        this.setState({
          data: res.data.data
        })
      }
    })




    this.messageListDom = document.getElementById('socketDom')
  }

  // 更新 消息方法
  updateMessageList = (content) => {
    this.setState({
      message: [...this.state.message, content]
    })
  }

  chatMessage = (data) => {
    console.log(data)
    this.updateMessageList({
      type: 'm',
      ...data
    })
  }

  chatGift = (data) => {
    console.log(data)
    this.updateMessageList({
      type: 'g',
      ...data
    })
  }

  chatNotify = (data) => {
    console.log(data)
    this.updateMessageList({
      type: 'n',
      m: data
    })
  }


  //  发送消息方法
  sendmessage = (value) => {
    this.newIo.emit('m', {
      query: {
        room: this.props.match.params.id,
        token: sessionStorage.getItem("token")
      },
      data: value
    })
    this.setState({
      value: ''
    })
  }

  valueChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  // 送礼物方法
  sendGift = (gift_id, price) => {
    confirm({
      title: '给主播送礼物',
      content: '请理智消费!!!!!',
      okText: '确定送礼',
      cancelText: '取消',
      icon: <Icon type="exclamation-circle" />,
      onOk: async () => {
        let { data: res } = await Axios.post('/front/gifts/give', { user_id: this.state.roomInfo.user_id, gift_id: gift_id })
        if (res.ok === 1) {
          this.newIo.emit('g', {
            query: {
              room: this.props.match.params.id,
              token: sessionStorage.getItem("token")
            },
            gift_id
          })

          // 修改redux 数据
          store.dispatch({
            type: 'MONEY',
            data: -price
          })
        } else {
          message.error(res.error)
        }

      }
    })


  }


  // 显示消息方法 
  showMessage = () => {
    return this.state.message.map((v, k) => {
      if (v.type === 'n') {
        return <List.Item key={k}> <Alert style={{ width: '100%' }} message={v.m} /></List.Item>
      } else if (v.type === 'g') {

        let data = this.state.data.filter(i => i.id === v.g)[0]
        return <List.Item key={k}>
          <List.Item.Meta
            avatar={
              <Avatar src={v.a} />
            }
            title={<div><a href="javascrpit:;">{v.u}</a><span className='gifttext'>{'送: '}</span><img className='giftimg' src={data.gift_icon} alt="" /></div>}
          />

        </List.Item>
      } else {
        return <List.Item key={k}>
          <List.Item.Meta
            avatar={
              <Avatar src={v.a} />
            }
            title={v.u + ': ' + v.m}
          />
        </List.Item>
      }
    })
  }
  // 
  render() {
    return (
      <Layout id="room">
        <Sider
          width="230"
          style={{
            backgroundColor: '#2f3035',
            height: '100vh',
            color: '#fff'
          }}>左侧导航</Sider>
        <Layout className="content">
          <Layout>
            <Header>
              <PageHeader
                style={{
                  border: '1px solid rgb(235, 237, 240)',
                }}
                title={this.state.roomInfo === null ? '' : this.state.roomInfo.room_name}
                subTitle={this.state.roomInfo === null ? '' : this.state.roomInfo.room_introduce}
              />
            </Header>
            <Content>
              <Layout>
                <Content className='video' style={{ height: '100%' }}>
                  <Player source='blob:https://www.huya.com/ffb5b118-7b1d-4275-8118-216f4a0d9f06' height='700px' />
                  {/* 操作栏 */}
                  <div>
                    <Row className="operationCol">
                      <Col span={8}>
                        <Row>
                          <Col span={4}>
                            开宝箱
                          </Col>
                          <Col span={4}>
                            拆快递
                          </Col>
                          <Col span={4}>
                            圣诞好礼
                          </Col>
                          <Col span={4} offset={4}>
                            排行榜
                          </Col>
                        </Row>
                      </Col>
                      <Col span={13}>
                        <Row>
                          <Col span={1} className='left-icon'>
                            <Icon type='left' />
                          </Col>
                          <Col span={22} style={{ position: 'relative' }}>
                            <Carousel dots={false}>
                              <div>
                                <List
                                  grid={{ column: 10 }}
                                  dataSource={this.state.data}
                                  renderItem={item => (
                                    <Popover content={'价格:' + item.price} title={item.gift_name} trigger="hover">
                                      <List.Item onClick={() => { this.sendGift(item.id, item.price) }}>
                                        <img style={{ width: '100%' }} src={item.gift_icon} alt="1" />
                                      </List.Item>
                                    </Popover>
                                  )}
                                />
                              </div>
                            </Carousel>
                          </Col>
                          <Col span={1} className="right-icon">
                            <Icon type='right' />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={3}></Col>
                    </Row>
                  </div>
                </Content>
              </Layout>
            </Content>
          </Layout>
          <Sider
            width='340'
            style={{
              height: '834px',
              backgroundColor: '#fff',
              color: '#eee',
              marginLeft: '10px',
              border: '1px solid #ccc',
            }}>
            <List size="small" id='socketDom'>
              {this.showMessage()}
            </List>
            <Search
              placeholder="在这里发送你要发出的消息"
              enterButton="发送消息"
              value={this.state.value}
              onChange={this.valueChange}
              style={{
                height: '5%'
              }}
              size='large'
              onSearch={(value) => { this.sendmessage(value) }}
            />
          </Sider>
        </Layout>
      </Layout >
    )
  }
}
