import React, { Component } from 'react'

import Player from '../components/Player'

import LiveFloor from '../components/LiveFloor'

import { BackTop } from 'antd'


import LiveRightNav from '../components/LiveRightNav'

export default class Index extends Component {
  render() {
    return (
      <div style={{ position: 'revert' }}>
        {/* 阿里播放器 */}
        <Player source='//player.alicdn.com/video/aliyunmedia.mp4' height='500px' />

        <LiveRightNav />
        {/* 分类楼层 */}
        <div style={{ backgroundColor: '#f4f5f8' }}>
          <LiveFloor {...this.props} path="yxi" />
          <LiveFloor path="yl" />
          <LiveFloor path="yz" />
          <LiveFloor />
          <LiveFloor />
          <LiveFloor />
          <LiveFloor />
          <LiveFloor />
          <LiveFloor />
        </div>
        <BackTop />
      </div>
    )
  }
}
