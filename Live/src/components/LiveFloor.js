import React, { Component } from 'react'

import { PageHeader, Tag, Row, Col, Card, Icon } from 'antd'

import '../scss/liveFloor.scss'

export default class LiveFloor extends Component {

  render() {
    return (
      <div id="liveFloor">
        <div id={this.props.path}></div>
        <PageHeader
          title="游戏"
          subTitle="英雄联盟"
          tags={<Tag color="blue">男刀</Tag>}
          avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
          style={{ padding: '20px 200px' }}
        >
          <div>
            <Row gutter={20} style={{ marginBottom: '10px' }}>
              <Col span={4}>
                <Card
                  className='floor-item'
                  hoverable
                  cover={<img style={{ height: '154px' }} alt="example" src="//live-cover.msstatic.com/huyalive/45640548-45640548-196024661031518208-201169606-10057-A-0-1/20191220085924.jpg?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90" />}
                >

                  <div className="room-title">
                    <p>6游侠 艾希凯瑞 5.0攻速 唯快不破</p>
                  </div>

                  <div className="room-content">

                    <div className="icon">
                      <img src="https://huyaimg.msstatic.com/avatar/1090/6c/f73ca70c74aa52d8d3739879627e46_180_135.jpg" alt="" />
                      <span>懒洋洋1</span>
                    </div>

                    <div className="audience">
                      <Icon type="usergroup-delete" />
                      <span>2222</span>
                    </div>

                  </div>

                  {/* 遮罩 */}
                  <div className="room-shade"> </div>
                  {/* 播放按钮 */}
                  <i className="play" onClick={() => { this.props.history.push('/room/1') }}></i>

                </Card>
              </Col>

              <Col span={4}>
                <Card
                  className='floor-item'
                  hoverable
                  cover={<img style={{ height: '154px' }} alt="example" src="//live-cover.msstatic.com/huyalive/45640548-45640548-196024661031518208-201169606-10057-A-0-1/20191220085924.jpg?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90" />}
                >

                  <div className="room-title">
                    <p>6游侠 艾希凯瑞 5.0攻速 唯快不破</p>
                  </div>

                  <div className="room-content">

                    <div className="icon">
                      <img src="https://huyaimg.msstatic.com/avatar/1090/6c/f73ca70c74aa52d8d3739879627e46_180_135.jpg" alt="" />
                      <span>懒洋洋</span>
                    </div>

                    <div className="audience">
                      <Icon type="usergroup-delete" />
                      <span>2222</span>
                    </div>

                  </div>

                  {/* 遮罩 */}
                  <div className="room-shade"> </div>
                  {/* 播放按钮 */}
                  <i className="play"></i>

                </Card>
              </Col>

              <Col span={4}>
                <Card
                  className='floor-item'
                  hoverable
                  cover={<img style={{ height: '154px' }} alt="example" src="//live-cover.msstatic.com/huyalive/45640548-45640548-196024661031518208-201169606-10057-A-0-1/20191220085924.jpg?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90" />}
                >

                  <div className="room-title">
                    <p>6游侠 艾希凯瑞 5.0攻速 唯快不破</p>
                  </div>

                  <div className="room-content">

                    <div className="icon">
                      <img src="https://huyaimg.msstatic.com/avatar/1090/6c/f73ca70c74aa52d8d3739879627e46_180_135.jpg" alt="" />
                      <span>懒洋洋</span>
                    </div>

                    <div className="audience">
                      <Icon type="usergroup-delete" />
                      <span>2222</span>
                    </div>

                  </div>

                  {/* 遮罩 */}
                  <div className="room-shade"> </div>
                  {/* 播放按钮 */}
                  <i className="play"></i>

                </Card>
              </Col>
            </Row>
          </div>
        </PageHeader>
      </div>
    )
  }
}
