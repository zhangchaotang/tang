// 首页接口
// 创建路由
const Router = require("koa-router")
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 获取首页轮播图数据

// 获取首页推荐数据
router.get(baseUrl + '/index', async ctx => {
  // 获取到推荐标题

  // try {

  let getTitle = 'SELECT * FROM recommend'
  let titleRow = await db.query(getTitle)
  // 构建一个数组 存储数据
  let data = []
  try {

    //  获取推荐商品消息
    for (let k = 0; k < titleRow.length; k++) {

      let getGoods = `SELECT b.* FROM recommend_goods a
                      LEFT JOIN goods b ON a.g_id = b.id
                      WHERE a.r_id = ?
                      `

      let row = await db.query(getGoods, titleRow[k].id)

      data.push({ title: titleRow[k].r_title, content: row })
      if (k == titleRow.length - 1) {
        ctx.body = {
          code: 200,
          data: data
        }
      }

    }
  } catch (e) {
    ctx.body = {
      code: 400,
      error: e
    }
  }




})

module.exports = router