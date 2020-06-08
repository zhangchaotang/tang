import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Axios from 'axios'

import 'antd/dist/antd.css';

Axios.defaults.baseURL = 'http://127.0.0.1:9960/api/v1'
// 'http://127.0.0.1:9960/api/v1'
//'http://zhangchaotang.cn:9960/api/v1'


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

