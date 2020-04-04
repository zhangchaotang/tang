import React, { useState, useEffect, Suspense } from 'react'
// 包
import Axios from 'axios'
import { Link } from 'react-router-dom'

// 引入组件
const GoodsBox = React.lazy(() => import('../component/GoodsBox'))
const Slideshow = React.lazy(() => import('../component/Slideshow'))

export default function Home(props) {
  // 获取推荐分类
  const [classifyList, setClassifyList] = useState([])
  const [recGoodsList, setRecGoodsList] = useState([])
  useEffect(() => {
    getClassify()
    getRecGoods()
  }, [])

  // 获取推荐分类函数
  const getClassify = async () => {
    let { data: res } = await Axios.get('/recClassify')
    if (res.code === 200) {
      // console.log(res.data)
      setClassifyList(res.data)
    }
  }

  // 获取推荐分类商品函数
  const getRecGoods = async () => {
    let { data: res } = await Axios.get('/index')
    if (res.code === 200) {
      setRecGoodsList(res.data)
    }
  }

  return (
    <div>

      {/* 头部导航 */}
      <Suspense fallback='加载中...'>
        <Slideshow />
      </Suspense>
      <div className="common">
        {/*推荐商品分类  */}
        <div className="recClassify">
          {classifyList.map((v, k) => {
            return <div className='classify-item' key={v.id}>
              <Link to={'/classify/' + v.id}> <img src={v.icon} alt="" /></Link>
            </div>
          })}
        </div>

        {/* 楼层模块 */}
        <div className="floor">
          {recGoodsList.map((v, k) => {
            return <div key={k}>
              {/* 楼层标题 */}
              <h4 className="floor-title">
                {v.title}
                <span>/</span>
                <span>专区</span>
              </h4>
              {/* 楼层图片 */}
              <div className="floor-img">
                <img src={v.icon} alt="" />
              </div>
              {/* 楼层商品 */}
              <div className="floor-goods">
                {/* 商品模块 */}
                {v.content.map((v2, k2) => {
                  return <div className="floor-goods-item" key={k2}><Suspense fallback='加载中...'><GoodsBox data={v2} /></Suspense></div>
                })}
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}
