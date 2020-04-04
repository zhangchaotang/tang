import React, { useState, useEffect } from 'react'
// 引入axios
import Axios from 'axios'
// 引入样式
import '../../css/component/integral.css'
// 引入antd
import { Pagination, Spin } from 'antd'

export default function Integral(props) {
  // 创建商品数据
  const [goodsList, setGoodsList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(8)
  const [total, setTotal] = useState(8)

  // 获取商品数据
  useEffect(() => {
    getGoods()
  }, [page])
  const getGoods = () => {
    setGoodsList([])
    Axios.get('/integral_goods', { params: { page, pageSize } }).then(res => {
      if (res.data.code === 200) {
        setGoodsList(res.data.data)
        setTotal(res.data.total)
      } 
    })
  }
  return (
    <div className='integral'>
      {/* 标题 */}
      <div className="userHead">
        积分兑换
      </div>
      {/* 显示积分 */}
      <div className="showIntegral">
        {/* 积分显示 */}
        <div className="integralNum">
          <span>可用积分</span>
          <div className='integral-num'>
            50
          </div>
        </div>
        {/* 马上兑换 */}
        <div className="integralGo">
          <button>马上兑换美味</button>
        </div>
      </div>
      <div className="userHead integralTile">
        兑换美味
      </div>
      {/* 商品列表 */}
      <div className="goodsList" >
        {goodsList.length === 0 ? <Spin className='loading' size="large" /> : goodsList.map(item => {
          return <div className="goodsItem" key={item.id}>
            <img src={item.ingredient} alt="" />
            <div>
              <div className="left">
                <p title={item.g_name}>{item.g_name}</p>
                <span>￥{item.integral}积分</span>
              </div>
              <div className="right">
                <button>立即兑换</button>
              </div>
            </div>
          </div>
        })}
      </div>
      {/* 分页器 */}
      <div className='pagination clearFix'>
        <Pagination current={page} defaultPageSize={pageSize} total={total} onChange={(page) => { setPage(page) }} />
      </div>
    </div>
  )
}
