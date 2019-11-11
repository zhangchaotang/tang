import Mock from 'mockjs'

// #region 用户
// 登录
Mock.mock('http://localhost:9999/api/v1/users/access_token', 'post', {
  'ok': 1,
  'data': {
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzk4OTY4fQ.FBHf76xCkZlQe7iVGOWxcbWW3FsUgrRlBQr2P-ecF7c',
    'face': '@image(100x100)'
  }
})

// 注册
Mock.mock('http://localhost:9999/api/v1/users/register', 'post', {
  'ok': 1
})

// 修改密码
Mock.mock('http://localhost:9999/api/v1/users/passwords', 'post', {
  'ok': 0,
  'error': '原密码不正确'
})

// 设置头像
Mock.mock('http://localhost:9999/api/v1/users/face', 'post', {
  'ok': 1
})

// 查询答题正确率
Mock.mock('http://localhost:9999/api/v1/users/member_cate_question_rate', 'get', {
  'ok': 1,
  'data': [
    {
      'id': 1,
      'cat_name': 'HTML',
      'right_rate': 100
    },
    {
      'id': 2,
      'cat_name': 'CSS',
      'right_rate': null
    },
    {
      'id': 3,
      'cat_name': 'JavaScript',
      'right_rate': null
    },
    {
      'id': 4,
      'cat_name': 'Vue',
      'right_rate': null
    },
    {
      'id': 5,
      'cat_name': 'Node',
      'right_rate': null
    },
    {
      'id': 6,
      'cat_name': 'ES6',
      'right_rate': null
    }
  ]
})

// 上传图片
Mock.mock('http://localhost:9999/api/v1/users/upload', 'post', {
  'ok': 1,
  'data': {
    'path': '@image(100*100)'
  }
})
// #endregion

// #region 分类
// 获取所有分类
Mock.mock('http://localhost:9999/api/v1/categories', 'get', {
  'ok': 1,
  'data': [
    {
      'id': 1,
      'cat_name': 'HTML'
    },
    {
      'id': 2,
      'cat_name': 'CSS'
    },
    {
      'id': 3,
      'cat_name': 'JavaScript'
    },
    {
      'id': 4,
      'cat_name': 'Vue'
    },
    {
      'id': 5,
      'cat_name': 'Node'
    },
    {
      'id': 6,
      'cat_name': 'ES6'
    }
  ]
})

// 根据分类查询题目
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions\?type=(all|right|wrong|undo)/, 'get', {
  'ok': 1,
  'data|5-20': [
    {
      'id|+1': 1,
      'title': '@cword(4,8)',
      'options': '@cword(2,4),@cword(2,4),@cword(2,4),@cword(2,4)',
      'right': '@integer(0,3)',
      'category_id': 1
    }
  ]
})

// 查询学生分类做题消息
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/question_count_info/, 'get', {
  'ok': 1,
  'data': {
    'total': 130,
    'right': 100,
    'wrong': 10,
    'undo': 20
  }
})

// 查询某个分类
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+/, 'get', {
  'ok': 1,
  'data': {
    'id': 1,
    'cat_name': 'HTML'
  }
})

// #endregion

// #region 题目
// 排行榜
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/questions\/topn\?cat_id=\d+/, 'get', {
  'ok': 1,
  'data|20-100': [
    {
      'username': '@ctitle',
      'integral': '@natural(0,999)'
    }
  ]
})
// 提交答案
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/questions\/\d+\/\d+/, 'post', {
  'ok': '@natural(0,1)'
})
// #endregion
