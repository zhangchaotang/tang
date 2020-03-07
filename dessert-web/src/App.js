import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'

import Home from './Home'
import Classify from './Classify'
import Login from './Login'
// import Classify from './Classify'
import Rejister from './Rejister'
import User from './User'
import GoodsPar from './path/GoodsPar'

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
      <Route path="/classify" component={Classify}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/rejister" component={Rejister}></Route>
      <Route path="/goodsPar" component={GoodsPar}></Route>
      <Route path="/user" component={User}></Route>
    </BrowserRouter>
  )
}
