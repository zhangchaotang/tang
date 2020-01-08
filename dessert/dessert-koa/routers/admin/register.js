// 添加管理员接口
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址 和 密钥
const { baseUrl, adminKey } = require("../../config")
// 引入jwt
const jwt = require('koa-jsonwebtoken')

router.post(baseUrl + '/register', async ctx => {

  let a_name = ctx.request.body.name
  let a_password = ctx.request.body.password

  let data = {
    a_name,
    a_password
  }

  let [row] = await db.query('SELECT * FROM admin WHERE a_name = ?', a_name)

  if (row.length > 0) {

    ctx.body = {
      code: 400,
      error: '用户名已存在！'
    }

  } else {
    let [row] = await db.query('INSERT INTO admin SET ?', data)

    ctx.body = {
      code: 200,
      error: '添加成功！'
    }

  }
})


module.exports = router