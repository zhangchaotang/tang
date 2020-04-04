// 引入roter
const roter = require('koa-router')()
// mysql
const db = require('../../data/db')
// 引入验证jwt 中间件
const jwt = require('../../tools/variftoken')
// 引入根路径
const { baseUrl } = require('../../config')
//#region 创建路由
// 1. 获取用户信息
roter.get(baseUrl + '/user', jwt, async ctx => {
  // 获取用户id
  let id = ctx.user.id
  let row = await db.query('SELECT * FROM user WHERE id = ? ', id)
  ctx.body = {
    code: 200,
    data: row[0]
  }
})
// 2. 获取消费记录
roter.get(baseUrl + '/log', jwt, async ctx => {
  // 获取参数
  let id = ctx.user.id
  let page = ctx.request.query.page;
  let pageSize = parseInt(ctx.request.query.pageSize);
  let index = parseInt((page - 1) * pageSize)
  let sql = 'SELECT * FROM log WHERE u_id = ? LIMIT ?'
  let row = await db.query(sql, [id, [index, pageSize]])
  ctx.body = {
    code: 200,
    data: row
  }
})
// 3. 充值
roter.post(baseUrl + '/pay', jwt, async ctx => {
  // 获取参数
  let id = ctx.user.id
  let orderId = ctx.request.body.orderId
  let payNum = await db.query('SELECT price FROM `order` WHERE id = ?', orderId)
  // 给用户添加余额
  let addpay = await db.query('UPDATE user SET userbalance=userbalance+? WHERE id = ?', [payNum[0].price, id])
  if (addpay.affectedRows === 1) ctx.body = { code: 200 }
  if (addpay.affectedRows === 0) ctx.body = { code: 200 }
})

// 4. 获取地址
roter.get(baseUrl + '/address', jwt, async ctx => {
  // 获取参数
  let id = ctx.user.id
  let page = ctx.request.query.page;
  let pageSize = parseInt(ctx.request.query.pageSize);
  let index = parseInt((page - 1) * pageSize)
  let row = []
  if (page === undefined || pageSize === undefined) {
    row = await db.query('SELECT * FROM sites WHERE user_id = ?', id)
  } else {
    row = await db.query('SELECT * FROM sites WHERE user_id = ? LIMIT ?', [id, [index, pageSize]])
  }

  ctx.body = {
    code: 200,
    data: row
  }
})
// 5. 添加地址
roter.post(baseUrl + '/createAddress', jwt, async ctx => {
  let id = ctx.user.id
  let phone = ctx.request.body.phone
  let username = ctx.request.body.username
  let street = ctx.request.body.street
  let email = ctx.request.body.email || '000000'
  let sites = ctx.request.body.sites
  let data = {
    user_id: id,
    phone,
    username,
    street,
    email,
    province: sites[0],
    city: sites[1],
    county: sites[2]
  }
  let row = await db.query('INSERT INTO sites SET ?', data)
  if (row.affectedRows === 1) ctx.body = { code: 200 }
})
// 6. 删除地址
roter.delete(baseUrl + '/address', jwt, async ctx => {
  let s_id = ctx.request.query.id
  console.log(ctx.request.query.id)
  let row = await db.query('DELETE FROM sites WHERE id = ?', s_id)
  if (row.affectedRows === 1) ctx.body = { code: 200 }
})
// 6. 获取指定id地址
roter.get(baseUrl + '/getOneAddress', jwt, async ctx => {
  let id = ctx.request.query.id
  let row = await db.query('SELECT * FROM sites WHERE id = ?', id)

  ctx.body = {
    code: 200,
    data: row[0]
  }
})
// 修改地址
roter.put(baseUrl + '/setAddress', jwt, async ctx => {
  let id = ctx.request.body.id
  let phone = ctx.request.body.phone
  let username = ctx.request.body.username
  let street = ctx.request.body.street
  let email = ctx.request.body.email || '000000'
  let sites = ctx.request.body.sites
  let data = {
    phone,
    username,
    street,
    email,
    province: sites[0],
    city: sites[1],
    county: sites[2]
  }
  let row = await db.query('UPDATE sites SET ? WHERE id = ?', [data, id])
  if (row.affectedRows === 1) ctx.body = { code: 200 }
})
// 修改默认地址
roter.put(baseUrl + '/defaultAddress', jwt, async ctx => {
  let u_id = ctx.user.id
  let id = ctx.request.body.id
  let row = await db.query('UPDATE sites SET default_sites = 0  WHERE user_id = ?', u_id)
  let row2 = await db.query('UPDATE sites SET default_sites = 1  WHERE id = ?', id)
  if (row2.affectedRows === 1) ctx.body = { code: 200 }
})

//#endregion

// 导出router
module.exports = roter