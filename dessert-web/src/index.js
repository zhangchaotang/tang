import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Axios from 'axios'

import 'antd/dist/antd.css';

Axios.defaults.baseURL = 'http://127.0.0.7:9960/api/v1'

ReactDOM.render(<App />, document.getElementById('root'));

