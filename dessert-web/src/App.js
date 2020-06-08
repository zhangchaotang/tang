import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import Base from './component/Base'

const HeaderNav = React.lazy(() => import('./component/HeaderNav'))
// const Test1 = React.lazy(() => import('./component/Shos'))
const Home = React.lazy(() => import('./path/Home'))
const Classify = React.lazy(() => import('./path/Classify'))
const Login = React.lazy(() => import('./path/Login'))
const Rejister = React.lazy(() => import('./path/Rejister'))
const User = React.lazy(() => import('./path/User'))
const GoodsPar = React.lazy(() => import('./path/goods/GoodsPar'))
const Close = React.lazy(() => import('./path/goods/Close'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback='加载中...'>\
      {/* 顶部导航模块 */}
        <HeaderNav />
        {/* 网站主要内容区域 */}
        {/* 首页 */}
        <Route exact path="/" component={Home}></Route>
        {/* 分类 */}
        <Route path="/classify/:id" component={Classify}></Route>
        {/* 品牌 */}
        <Route path="/brand/:id" component={Classify}></Route>
        {/* 登录 */}
        <Route path="/login" component={Login}></Route>
        {/* 注册 */}
        <Route path="/rejister" component={Rejister}></Route>
        {/* 商品详情 */}
        <Route path="/goodsPar/:id" component={GoodsPar}></Route>
        {/* 结算 */}
        <Route path="/Close" component={Close}></Route>
        {/* 用户中心 */}
        <Route path="/user" component={User}></Route>
        {/* 测试 */}
        {/* <Route path="/test" component={Test1}></Route> */}
      </Suspense>
      {/* 底部网站消息模块 */}
      <Base />
    </BrowserRouter>
  )
}

