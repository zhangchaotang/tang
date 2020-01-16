import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


// 引入 axios
import Axios from 'axios'
// 引入antd
import 'antd/dist/antd.css'

import './index.scss'

// 设置基地址
Axios.defaults.baseURL = 'http://127.0.0.7:9960/api/v1'
// 配置拦截器
Axios.interceptors.request.use(
  confirm => {
    let token = localStorage.getItem('token')
    if (token !== null) {
      confirm.headers.Authorization = token
    }
    return confirm
  }
)



ReactDOM.render(<App />, document.getElementById('root'));


