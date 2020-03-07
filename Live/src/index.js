import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.scss'

import 'antd/dist/antd.css';


import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8765'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) { //判断token是否存在
      config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');  //将token设置成请求头
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


ReactDOM.render(<App />, document.getElementById('root'));
