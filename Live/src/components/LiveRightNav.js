import React, { Component } from 'react'

import '../scss/liveRightNav.scss'

import { Anchor, Avatar } from 'antd'

const { Link } = Anchor;

export default class LiveRightNav extends Component {
  render() {
    return (
      <div className="liveRightNav">
        <Anchor
          offsetTop={200}
          style={{ backgroundColor: '#eee', borderRadius: '6px' }}
        >
          <Link href="#yxi" title={<span><Avatar src="https://huyaimg.msstatic.com/cdnimage/gametypelogo/game_15735501549253_logo.png" />&nbsp;&nbsp;游戏</span>} />
          <br />
          <Link href="#yl" title={<span><Avatar src="https://huyaimg.msstatic.com/cdnimage/gametypelogo/game_15735502469176_logo.png" />&nbsp;&nbsp;二次元</span>} />
          <br />
          <Link href="#yz" title={<span><Avatar src="https://huyaimg.msstatic.com/cdnimage/gametypelogo/game_15735502396542_logo.png" />&nbsp;&nbsp;大佬</span>} />
        </Anchor>
      </div>
    )
  }
}
