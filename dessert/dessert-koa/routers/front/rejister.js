// 用户注册
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入redis
const redis = require('../../data/redis')
const Store = redis.client
const { baseUrl } = require('../../config')

router.post(baseUrl + '/rejister', async ctx => {
  let phone = ctx.request.body.phone
  let code = ctx.request.body.code
  let password = ctx.request.body.password
  let redisContent = await Store.get('code')
  console.log(redisContent)
  console.log(code)
  if (code !== redisContent) return ctx.body = {
      code: 400,
      error: '短信验证码错误！'
    }


  let data = {
    username: phone,
    password
  }

  let row = await db.query('INSERT INTO user SET ?', data)
  
  ctx.body = {
    code:200
  }

})

module.exports = router