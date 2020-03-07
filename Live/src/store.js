import { createStore } from 'redux'

const state = {
  userInfo: null
}

function reducer(prevState = state, action) {
  // 1. 先克隆数据
  let tmp = JSON.parse(JSON.stringify(prevState))

  // 2. 修改 tmp
  // 修改登录用户数据
  if (action.type === 'putUserInfo') {
    tmp.userInfo = action.data
  }
  // 退出登录
  if (action.type === 'LOGOUT') {
    tmp.userInfo = null
  }
  // 修改头像
  if (action.type === 'AVATAR') {
    tmp.userInfo.avatar = action.data
  }

  // 充值 和 送礼
  if (action.type === 'MONEY') {
    tmp.userInfo.money += (action.data - 0)
  }

  // 3. 返回修改之后的数据
  return tmp
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)