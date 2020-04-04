const jwt = require('koa-jsonwebtoken')
const { webKey } = require('../config')
const md5 = require('../tools/koa-md5')

async function variftoken(ctx, next) {
  const token = ctx.headers.authorization;
  const secret = await md5.MD5(webKey)
  try {
    const playload = await jwt.verify(token, secret)
    ctx.status = 200 //这里非常重要，只有设置了status，koa-router才识别请求正确继续进入路由
    ctx.user = playload
    await next()
  } catch (error) {
    console.log(error)
    ctx.body = {
      code:301,
      error:'解析token发生'+error.message+'错误'
    }
  }
}


module.exports = variftoken