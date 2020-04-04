// 订单管理
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
const jwt = require('../../tools/variftoken')
const { baseUrl } = require('../../config')


// 获取订单
router.get(baseUrl + '/order', jwt, async ctx => {
  // 获取参数
  let id = ctx.user.id
  let page = ctx.request.query.page;
  let pageSize = parseInt(ctx.request.query.pageSize);
  let index = parseInt((page - 1) * pageSize)
  let state = ctx.request.query.state

  let sql = 'SELECT a.*,b.ingredient,c.g_name FROM `order` a LEFT JOIN particulars_img b ON a.g_id = b.g_id LEFT JOIN goods c ON a.g_id = c.id WHERE a.u_id = ? AND state =? limit ?,?'

  let row = await db.query(sql, [id, state, index, pageSize])

  ctx.body = {
    code: 200,
    data: row
  }
})

// 获取全部订单
router.get(baseUrl + '/allOrder', jwt, async ctx => {
  // 获取参数
  let page = ctx.request.query.page;
  let pageSize = parseInt(ctx.request.query.pageSize);
  let index = parseInt((page - 1) * pageSize)
  let id = ctx.user.id
  let sql = 'SELECT a.*,b.ingredient,c.g_name FROM `order` a LEFT JOIN particulars_img b ON a.g_id = b.g_id LEFT JOIN goods c ON a.g_id = c.id WHERE a.u_id = ? limit ?,?'
  let row = await db.query(sql, [id, index, pageSize])
  ctx.body = {
    code: 200,
    data: row
  }
})

// 创建订单
router.post(baseUrl + '/createOrder', jwt, async ctx => {
  // 获取参数
  let id = ctx.user.id
  let g_id = ctx.request.body.g_id
  // 价格
  let goods = await db.query('SELECT g_name,g_price FROM goods WHERE id =?', g_id)
  // 数量
  let num = ctx.request.body.num || 1
  // 获取用户信息
  // let user = await db.query('SELECT * FROM user WHERE id = ?', id)
  // 获取地址
  let sites_id = ctx.request.body.sites_id
  if (sites_id === undefined) {
    var sites = await db.query('SELECT * FROM sites WHERE user_id = ? AND default_sites = 1', id)
  } else {
    var sites = await db.query('SELECT * FROM sites WHERE id = ?', sites_id)
  }

  // 创建订单号
  let str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let code = new Date().getTime()
  for (let i = 0; i < 3; i++) {
    code += str[Math.floor(Math.random() * str.length)]
  }
  let date = Math.floor(new Date().getTime() / 1000)
  let data = {
    g_id,
    g_num: num,
    g_name: goods[0].g_name,
    o_code: code,
    phone: sites[0].phone,
    u_id: id,
    date,
    price: goods[0].g_price,
    province: sites[0].province,
    city: sites[0].city,
    street: sites[0].street
  }
  let sql = 'INSERT INTO `order` SET ?'
  let row = await db.query(sql, data)
  ctx.body = {
    code: 200,
    orderId: row.insertId
  }
})

module.exports = router