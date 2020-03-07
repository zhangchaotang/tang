// 获取随机图片校验
const Router = require('koa-router')
const router = Router()

// 引入基地址
const { baseUrl } = require('../../config')
// 引入 创建随机字符包
const Captcha = require('svg-captcha')

// 创建随机验证码
router.get(baseUrl + '/security', async ctx => {
  const cap = Captcha.create({
    size: '4', // 验证码长度
    width: 92, // 验证码图片长度
    height: 44, // 宽度
    fontSize: 60,
    ignoreChars: '0oO1ilI', // 验证码 中排除 的字符
    noise: 2, // 干扰线的条数 这里为两条
    color: true, // 验证字符的颜色默认没有，如果设定了背景，则默认有
    background: '#eee' // 验证码图片背景颜色
  })
  let img = cap.data //验证码
  let text = cap.text.toLocaleLowerCase() // 验证码字符，忽略大小写 

  ctx.body = {
    img,
    text
  }
})


module.exports = router