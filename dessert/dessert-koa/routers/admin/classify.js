// 商品分类
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl, adminKey } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 获取所有分类
router.get(baseUrl + '/classift', async ctx => {
  let row = await db.query('SELECT * FROM classify')
  ctx.body = {
    code: 200,
    data: row
  }
})

// 点击分类获取下商品
router.get(baseUrl + '/classift/:id', async ctx => {
  let id = ctx.params.id // 获取分类id
  // 开始查询
  let row = await db.query(`SELECT * FROM  classify a 
                            LEFT JOIN goods_classify b 
                            ON a.id = b.c_id 
                            LEFT JOIN goods c ON b.g_id = c.id  
                            WHERE a.id = ?;
                            `, id)

  //返回数据 
  ctx.body = {
    code: 200,
    data: row
  }
})

// 给分类添加商品（批量）
router.post(baseUrl + '/classift/goods', async ctx => {
  let goods_list = ctx.request.body.goods_list.split(',') // 获取商品id
  let classify_id = ctx.request.body.classify_id
  //   // 开始插入数据
  goods_list.forEach(async v => {
    let data = {
      g_id: parseInt(v),
      c_id: parseInt(classify_id)
    }
    await db.query('INSERT INTO goods_classify SET ?', data)
  });

  //返回数据 
  ctx.body = {
    code: 200,
    data: '添加成功!'
  }
})


// 给分类删除商品（批量）
router.delete(baseUrl + '/classift/goods', async ctx => {
  let goods_list = ctx.request.body.goods_list.split(',') // 获取商品id
  let classify_id = ctx.request.body.classify_id
  //   // 开始插入数据

  let row = await db.query('DELETE FROM goods_classify WHERE g_id IN (?) AND c_id = ?', [goods_list, classify_id])

  console.log(row)

  //返回数据 
  ctx.body = {
    code: 200,
    data: '删除成功!'
  }
})


module.exports = router