import React, { Component } from 'react'

import { Card, Breadcrumb, Icon, Upload } from 'antd'

import { Link } from 'react-router-dom'

import config from '../../config'

import ImgCrop from 'antd-img-crop'

// 引入redux
import { store } from '../../store'
import Axios from 'axios'

export default class LiveAvatar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      avatarUrl: store.getState().userInfo === null ? null : store.getState().userInfo.avatar
    }
  }

  componentDidMount = () => {
    store.subscribe(() => {
      this.setState({
        avatarUrl: store.getState().userInfo.avatar
      })
    })
  }


  handleChange = async (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.ok === 1) {

        let { data: res } = await Axios.put('/front/users/avatar', {
          avatar: info.file.response.data.url
        })
        if (res.ok === 1) {
          store.dispatch({
            type: 'AVATAR',
            data: info.file.response.data.url
          })
        }
      }
    }
  }

  render() {
    return (
      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="user" />会员中心
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            设置头像
          </Breadcrumb.Item>
        </Breadcrumb>
      }>
        <ImgCrop>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={config.BASE_URL + "/front/upload"}
            onChange={this.handleChange}
            headers={{
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
            }
          >
            {this.state.avatarUrl === null ? '上传' : <img src={this.state.avatarUrl} alt='' />}
          </Upload>
        </ImgCrop>

      </Card>
    )
  }
}
