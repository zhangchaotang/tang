import React, { Component } from 'react'

import { Layout } from 'antd'

import { BrowserRouter, Route } from 'react-router-dom'

import Index from './pages/Index'
import Member from './pages/Member'
import Room from './pages/Room'

import LiveHeader from './components/LiveHeader'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout.Header>
          <LiveHeader />
        </Layout.Header>

        < Layout.Content>
          <Route exact path="/" component={Index} />
          <Route path="/member" component={Member} />
          <Route path="/room/:id" component={Room} />
        </ Layout.Content>

        < Layout.Footer>
          11
        </Layout.Footer>

      </BrowserRouter>
    )
  }
}
