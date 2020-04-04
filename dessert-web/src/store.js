//  引入 redux 
import { createStore } from 'redux'

// 定义数据
const state = {
  userInfo: null
}

/**
 * @prevState : redux 定义初始数据
 * @action :调用redux 传递的参数
 */

function reducer(prevState = state, action) {
  // 1. 对初始数据经行克隆 以免污染初始数据
  let tmp = JSON.parse(JSON.stringify(prevState))
  // 2.根据 条件 对数据经行各种修改
  // 2.1创建用户登录数据
  if (action.type === 'NEWUSER') {
    tmp.userInfo = action.data
  }
  // 2.2 用户中心 状态栏改变
  if (action.type === 'SETINDEX') {
    tmp.index = action.data
  }

  // 3. 返回修改之后的数据
  return tmp
}

// 暴露 redx
export const store = createStore(
  reducer,
  // 用于经行调试的代码
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)