import Mock from 'mockjs'

// 首页轮播图片
Mock.mock('http://127.0.0.1:6666/api/v1/main_ad_images', 'get', {
  'ok': 1,
  'data|4': [
    {
      'image': '@image(375x164, @color)',
      'link': '@url'
    }
  ]
})
// 首页推荐分类
Mock.mock('http://127.0.0.1:6666/api/v1/index_categories', 'get', {
  'ok': 1,
  'data|12': [
    {
      'id|+1': 1,
      'cat_name': '@cword(2,6)'
    }
  ]
})

// 首页商品列表
Mock.mock(/http:\/\/127.0.0.1:6666\/api\/v1\/index_goods\?page=\d+&per_page=\d+/, 'get', {
  'ok': 1,
  'data|20': [
    {
      'id|+1': 1,
      'goods_name': '@cword(3,8)',
      'price': '@natural(10,9999)',
      'image': '@image( 100x100, @color )'
    }
  ]
})
