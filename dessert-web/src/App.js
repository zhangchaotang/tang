import React, { Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import Base from './component/Base'

const HeaderNav = React.lazy(() => import('./component/HeaderNav'))
const Home = React.lazy(() => import('./path/Home'))
const Classify = React.lazy(() => import('./path/Classify'))
const Login = React.lazy(() => import('./path/Login'))
const Rejister = React.lazy(() => import('./path/Rejister'))
const User = React.lazy(() => import('./path/User'))
const GoodsPar = React.lazy(() => import('./path/goods/GoodsPar'))
const Close = React.lazy(() => import('./path/goods/Close'))

export default function App(props) {
  return (
    <BrowserRouter>
      <Suspense fallback='加载中...'>
        <HeaderNav />
        <Route exact path="/" component={Home}></Route>
        <Route path="/classify/:id" component={Classify}></Route>
        <Route path="/brand/:id" component={Classify}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/rejister" component={Rejister}></Route>
        <Route path="/goodsPar/:id" component={GoodsPar}></Route>
        <Route path="/Close" component={Close}></Route>
        <Route path="/user" component={User}></Route>
      </Suspense>
      <Base />
    </BrowserRouter>
  )
}

