import React from 'react';

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Login from './Login'

function App(props) {

  let chkLogin = (props) => {
    let token = localStorage.getItem('token')
    if (token === null) {
      return <Redirect to='/login' />
    } else {
      return <Home {...props} />
    }
  }
  
  return (
    <BrowserRouter>
      <Route path='/' component={props => chkLogin(props)} />
      <Route path='/login' component={Login} />
    </BrowserRouter>
  )
}

export default App;
