const Router = require("koa-router")

const router = new Router();

const db = require("../db")

let defaultURL = '/api/v1'

// 商品app 首页推荐分类
router.get(`${defaultURL}/index_categories`, async (ctx, next) => {
  let sql = 'select id,cat_name from shop_classify where isRecommend = 1'
  let [rows, files] = await db.query(sql)
  ctx.body = {
    ok: 1,
    data: rows
  },
    ctx.header = {
      'Access-Control-Allow-Origin': 'http://localhost:8080/',
      vary: 'Origin'
    }
})
// 商品app 首页推荐轮播图
router.get(`${defaultURL}/main_ad_images`, async (ctx, next) => {
  let sql = 'select image,link from shop_slideshow'
  let [rows, files] = await db.query(sql)
  ctx.body = {
    ok: 1,
    data: rows
  },
    ctx.header = {
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      vary: 'Origin'
    }
})
// 商品app 首页推荐商品列表
router.get(`${defaultURL}/index_goods`, async (ctx, next) => {
  let page = ctx.query.page || 1
  let per_page = ctx.query.per_page || 20
  let info = (page - 1) * per_page
  let sql = `select id,goods_name,price,image from shop_goods where isRecommend = 1 limit ${info},${per_page}`
  let [rows, files] = await db.query(sql)
  ctx.header = {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    vary: 'Origin'
  }
  ctx.body = {
    ok: 1,
    data: rows
  }
})



module.exports = router;