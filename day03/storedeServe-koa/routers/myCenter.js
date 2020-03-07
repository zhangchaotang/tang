const Router = require("koa-router")

const router = new Router();

const db = require("../db")

let defaultURL = '/api/v1'

// 根据购物车id 显示 商品详情
router.get(`${defaultURL}/goods`, async (ctx, next) => {
  let ids = ctx.query.goodsList.split(',')
  // console.log(ids)
  // let sql = 'select * from shop_goods '
  // let [rows,files] = db.query(sql)
  let sql = 'select * from shop_goods where id in (?)'
  let [rows, files] = await db.query(sql, [ids])
  ctx.body = {
    ok: 1,
    data: rows
  },
    ctx.header = {
      'Access-Control-Allow-Origin': 'http://localhost:8080/',
      vary: 'Origin'
    }
})


module.exports = router