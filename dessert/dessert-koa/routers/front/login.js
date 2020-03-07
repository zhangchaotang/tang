// 用户注册
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入redis
const redis = require('../../data/redis')
const Store = redis.client
const { baseUrl, webKey } = require('../../config')
// 引入 jwt
const jwt = require('koa-jsonwebtoken')
// 引入md5
const md5 = require('../../tools/koa-md5')

router.post(baseUrl + '/login', async ctx => {
  let phone = ctx.request.body.phone
  let password = ctx.request.body.password

  let row = await db.query('SELECT * FROM user WHERE username = ?', phone)
  if (row.length == 0) return ctx.body = { code: 400, error: '用户不存在！' }
  if (row[0].password != password) return ctx.body = { code: 400, error: '密码错误！' }
  // 生成token 
  const secret = await md5.MD5(webKey)
  const token = jwt.sign(row[0], secret, { expiresIn: 1 * 24 * 7 + 'h' });
  ctx.body = {
    code: 200,
    message: '登录成功！',
    token
  }

})

module.exports = router