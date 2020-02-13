// 商品接口
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl, adminKey } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 获取商品
router.get(baseUrl + '/goods', async ctx => {
  let page = ctx.request.query.page || 1
  let page_size = ctx.request.query.page_size || 5
  let index = (parseInt(page) - 1) * page_size

  let row = await db.query(`SELECT a.*,b.showimg1 
                            FROM goods a LEFT JOIN particulars_img b
                            ON a.id = b.g_id ORDER BY a.id DESC
                            LIMIT ${index},${page_size}`)

  let total = await db.query('SELECT COUNT(*) total FROM goods')

  ctx.body = {
    code: 200,
    data: row,
    total: total[0].total
  }
})

// 添加商品
router.post(baseUrl + '/add/goods', async ctx => {
  // 商品名字
  let g_name = ctx.request.body.goods_name
  // 商品价格
  let g_price = ctx.request.body.goods_price
  // 商品品牌
  let b_id = ctx.request.body.brand_id
  // 分类id
  let c_id = ctx.request.body.c_id
  // 商品封面
  let img = ctx.request.body.url

  let data = {
    g_name,
    g_price,
    b_id
  }

  try {
    await db.startTransaction();//开启事务
    // 添加商品
    let row = await db.executeTransaction('INSERT INTO goods SET ?', data)
    // 把这个商品添加到对应分类下
    let classData = {
      g_id: row.insertId,
      c_id
    }
    let row1 = await db.executeTransaction('INSERT INTO goods_classify SET ?', classData)

    // 给商品添加封面
    let imgData = {
      g_id: row.insertId,
      showimg1: img
    }
    let row2 = await db.executeTransaction('INSERT INTO particulars_img SET ?', imgData)

    await db.stopTransaction();//关闭事务,此处应该是提交事务
    ctx.body = {
      code: 200,
      message: '添加商品成功'
    }

  } catch (e) {
    console.log(e)
    ctx.body = {
      code: 400,
      error: e
    }
  }

})

// 设置商品属性

// 查看商品属性


// 删除商品
router.delete(baseUrl + '/goods/:id', async ctx => {
  let id = ctx.params.id // 获取商品id
  // 1. 先开启一个事务
  // 开启事务
  try {
    await db.startTransaction();//开启事务
    // 删除商品
    let row = await db.executeTransaction('DELETE FROM goods WHERE id = ?', id)
    // 删除了一个商品那么它关联的分类条目也要删除 如果删除失败则回滚
    let row1 = await db.executeTransaction('DELETE FROM goods_classify WHERE g_id = ?', id)
    //删除了一个商品那么它关联的推荐条目也要删除 如果删除失败则回滚
    let row2 = await db.executeTransaction('DELETE FROM recommend_goods WHERE g_id = ?', id)

    await db.stopTransaction();//关闭事务,此处应该是提交事务

    // 全部成功 则返回数据
    ctx.body = {
      code: 200
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      code: 400,
      error: '删除失败！'
    }
  }
})


module.exports = router