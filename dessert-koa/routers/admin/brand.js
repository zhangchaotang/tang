// 品牌管理
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl, adminkey } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 获取品牌列表
router.get(baseUrl + '/brand', async ctx => {
  let row = await db.query('SELECT * FROM brand WHERE id != 1')
  ctx.body = {
    code: 200,
    data: row
  }
})

// 获取推荐品牌列表
router.get(baseUrl + '/recBrand', async ctx => {
  let row = await db.query('SELECT * FROM brand WHERE id != 1 ORDER BY recommend ASC  LIMIT 4 ')
  ctx.body = {
    code: 200,
    data: row
  }
})

// 添加品牌
router.post(baseUrl + '/brand', async ctx => {
  let brand_name = ctx.request.body.brand_name
  let data = { b_name: brand_name }
  let row = await db.query('INSERT INTO brand SET ?', data)
  ctx.body = {
    code: 200,
    message: '添加成功！'
  }
})
// 删除品牌
router.delete(baseUrl + '/brand/:id', async ctx => {
  let id = ctx.params.id
  let row = await db.query('DELETE FROM brand WHERE id = ?', id)
  ctx.body = {
    code: 200,
    message: '删除成功！'
  }
})

module.exports = router