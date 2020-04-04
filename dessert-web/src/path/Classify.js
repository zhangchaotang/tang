import React, { useState, useEffect } from 'react'
// 加载样式
import '../css/classify.css'
// 引入 jquery
import $ from 'jquery'
// 获取底部模块
import Axios from 'axios'

// 获取顶部导航
// 获取商品模块
const GoodsBox = React.lazy(() => import('../component/GoodsBox'))

export default function Classify(props) {

  // 创建分类列表数据
  const [catList, setCatList] = useState([])
  // 创建品牌列表数据
  const [brandList, setBrandList] = useState([])
  const [goodsList, setGoodsList] = useState([])
  // 获取参数
  const [cid, setCid] = useState(null)
  const [bid, setBid] = useState(null)

  useEffect(() => {
    getBrand()
    getCat()
    getId()
  }, [])

  useEffect(() => {
    if (cid !== null || bid !== null) {
      getGoods()
    }
  }, [cid, bid])

  // 创建获取分类列表方法
  const getCat = async () => {
    let { data: res } = await Axios.get('/classify')
    if (res.code === 200) {
      setCatList(res.data)
    }
  }
  // 创建获取品牌列表方法
  const getBrand = async () => {
    let { data: res } = await Axios.get('/brand')
    if (res.code === 200) {
      setBrandList(res.data)
    }
  }

  const getId = () => {
    if (props.match.path === '/brand/:id') {
      setBid(parseInt(props.match.params.id))
    } else {
      setCid(parseInt(props.match.params.id))
    }
  }

  // 创建根据分类id和品牌id获取商品的方法
  const getGoods = async () => {
    let { data: res } = await Axios.get('/searchGoods', { params: { cid, bid } })
    if (res.code === 200) {
      setGoodsList(res.data)
    }
  }

  // tab切换方法
  const catChange = (e, id) => {
    $(e.target).addClass('cat-active').siblings().removeClass('cat-active')
    setCid(id)
  }

  const brandChange = (e, id) => {
    $(e.target).addClass('cat-active').siblings().removeClass('cat-active')
    setBid(id)
  }

  return (
    <div>
      {/* 顶部导航 */}
      <div className="common">
        {/* 分类搜索 */}
        <div className="cat-box">
          <div className="cat-list">
            <div className="cta-title">
              分类:
          </div>
            <div className="cta-content">
              <span className={cid === null ? 'cat-active' : ''} onClick={(e) => { catChange(e, null) }}>全部分类</span>
              {catList.map(v => {
                if (v.id === cid) {
                  return <span className='cat-active' key={v.id} onClick={(e) => { catChange(e, v.id) }} >{v.c_name}</span>
                } else {
                  return <span key={v.id} onClick={(e) => { catChange(e, v.id) }} >{v.c_name}</span>
                }
              })}
            </div>
          </div>
          <div className="cat-taset">
            <div className="cta-title">
              品牌:
          </div>
            <div className="cta-content">
              <span className={bid === null ? 'cat-active' : ''} onClick={(e) => { brandChange(e, null) }}>全部分类</span>
              {brandList.map(v => {
                if (bid === v.id) {
                  return <span className="cat-active" key={v.id} onClick={(e) => { brandChange(e, v.id) }} >{v.b_name}</span>
                } else {
                  return <span key={v.id} onClick={(e) => { brandChange(e, v.id) }} >{v.b_name}</span>
                }
              })}
            </div>
          </div>
        </div>
        {/* 显示分类下商品 */}
        <div className="content">
          {goodsList.map(v => {
            return <GoodsBox data={v} style={{ margin: '10px 10px' }} key={v.id} />
          })}
        </div>
      </div>
    </div>
  )
}
