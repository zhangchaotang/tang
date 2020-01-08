// 登录接口
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl, adminKey } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

router.post(baseUrl + '/login', async ctx => {

  let a_name = ctx.request.body.name
  let a_password = ctx.request.body.password

  let row = await db.query(`SELECT * FROM admin WHERE a_name = ?`, a_name)
    if (row.length !== 0) {
      if (row[0].a_password == a_password) {
        // 生成token
        const token = jwt.sign({ id: row[0].id }, adminKey, { expiresIn: 24 * 30 * 6 + 'h' }) // 第一个参数储存到token的数据 这个里储存了用户id 第二个参数为密钥 第三个参数为过期时间
        // 返回数据
        ctx.body = {
          code: 200,
          token
        }

      } else {
        // 密码错误！ 返回数据
        ctx.body = {
          code: 400,
          error: '密码错误！'
        }
      }

    } else {
      // 用户名不存在！ 返回数据
      ctx.body = {
        code: 400,
        error: '用户名不存在！'
      }
    }
  })


module.exports = router