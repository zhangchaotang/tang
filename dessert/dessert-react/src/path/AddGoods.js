import React, { useState, useEffect } from 'react'

import { Layout, Breadcrumb, Button, Table, Modal, Form, Input, Icon, Select, Upload, message } from 'antd'

// import { Link, Route } from 'react-router-dom'

import Axios from 'axios'

const { Content } = Layout;

const { Option } = Select;

const { confirm } = Modal;

function AddGoods(props) {


  const [tableData, setTableData] = useState([
    {
      id: '1',
      goods_name: 'sha',
      g_img: '123123',
      goods_price: '100'
    }
  ])

  // 添加弹框控制变量
  const [addGoodsVisible, setAddGoodsVisible] = useState(false)

  // 表格头
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'g_name'
    },
    {
      title: '商品图片',
      dataIndex: 'showimg1',
      render: data => {
        return <img src={data} alt='' style={{ height: "65px" }} />
      }
    }, {
      title: '商品价格',
      dataIndex: 'g_price'
    }, {
      title: '操作',
      render: (data) => {
        return <div>
          <Button onClick={() => { removeGoods(data.id) }}>删除</Button>
          <Button>编辑</Button>
        </div>
      }
    }
  ]

  // 分类列表
  const [classifyList, setClassifyList] = useState([])
  // 品牌列表
  const [brandList, setBrandList] = useState([])
  const [total, setTotal] = useState(0)

  // 创建上传数据
  const [upImage, setUpImage] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // 发起请求
  useEffect(() => {
    Axios.get('/classify').then((res) => {
      if (res.data.code === 200) {
        setClassifyList(res.data.data)
      }
    })

    Axios.get('/brand').then((res) => {
      if (res.data.code === 200) {
        setBrandList(res.data.data)
      }
    })

    getData(page, pageSize)
  }, [page])

  const getData = (page, pageSize) => {
    Axios.get(`/goods?page=${page}&page_size=${pageSize}`).then((res) => {
      if (res.data.code === 200) {
        setTotal(res.data.total)
        setTableData(res.data.data)
      }
    })
  }

  const { getFieldDecorator } = props.form;

  // 添加商品方法
  const addGoodsFn = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        if (upImage === '') return message.error('请选择商品封面')
        values.url = upImage
        Axios.post('/add/goods', values).then((res) => {

          console.log(res.data)
          if (res.data.code === 200) {
            getData(page, pageSize)
            message.success('添加商品成功！')
            setAddGoodsVisible(false)
          }
        })
      }
    })
  }

  // 删除商品方法
  const removeGoods = (id) => {
    confirm({
      title: '删除商品',
      content: '您确定要删除这个商品吗？ 一旦删除将无法恢复！',
      okText: '确定删除',
      cancelText: '取消',
      onOk: () => {
        Axios.delete('/goods/' + id).then((res) => {
          if (res.data.code === 200) {
            if (classifyList.length > 1) {
              getData(page, pageSize)
            } else {
              getData(page - 1, pageSize)
            }
            message.success('删除商品成功！')
          } else {
            message.error(res.data.error)
          }
        })
      }
    })
  }

  // 上传图片校验
  const beforeUpload = (file) => {
    // 判断文件类型
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('您上传的文件类型不是 JPG/PNG file类型!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大小超过2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const upload = info => {
    if (info.file.status === 'done') {
      setUpImage(info.file.response.url)
    }
  }


  return (
    <div>
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>添加商品</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            height: '100%',
            minHeight: '80vh'
          }}
        >

          <Button type='' onClick={() => { setAddGoodsVisible(true) }}>
            添加商品
          </Button>

          <Table
            dataSource={tableData}
            columns={columns}
            rowKey='id'
            style={{ padding: '20px 0' }}
            pagination={{
              current: page,
              pageSize: pageSize,
              hideOnSinglePage: true,
              total: total,
              onChange: (page) => {
                setPage(page)
              }
            }}
          />
        </Content>
      </div>

      {/* 添加弹框 */}
      <Modal
        title='添加商品'
        visible={addGoodsVisible}
        okText='确定'
        cancelText='取消'
        onOk={addGoodsFn}
        onCancel={() => { setAddGoodsVisible(false) }}
      >
        <Form layout='horizontal'>

          <Form.Item
            label='商品名称:'
          >
            {getFieldDecorator('goods_name', {
              rules: [{ required: true, message: '请输入商品名称！' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入商品名称"
              />
            )
            }
          </Form.Item>
        </Form>
        <Form.Item
          label='商品价格:'
        >
          {getFieldDecorator('goods_price', {
            rules: [{ required: true, message: '请输入商品价格！' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入商品价格"
            />
          )
          }
        </Form.Item>
        <Form.Item
          label='品牌:'
        >
          {getFieldDecorator('brand_id', {
            rules: [{ required: true, message: '请选择商品品牌' }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择商品品牌"
            >
              {
                brandList.map((v, k) => {
                  return <Option value={v.id} key={k}>{v.b_name}</Option>
                })
              }
            </Select>
          )
          }
        </Form.Item>
        <Form.Item
          label='分类:'
        >
          {getFieldDecorator('c_id', {
            rules: [{ required: true, message: '请选择商品分类' }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择商品分类"
            >
              {
                classifyList.map((v, k) => {
                  return <Option value={v.id} key={k}>{v.c_name}</Option>
                })
              }
            </Select>
          )
          }
        </Form.Item>

        <Upload
          name='file'
          listType="picture-card"
          showUploadList={false}
          action='http://127.0.0.1:9960/api/v1/upload'
          beforeUpload={beforeUpload}
          onChange={upload}
        >
          {upImage === '' ? '上传商品封面' : <img style={{ width: '100%' }} src={upImage} alt='' />}
        </Upload>

      </Modal>
    </div>
  )
}

export default Form.create()(AddGoods);