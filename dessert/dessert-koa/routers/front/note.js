const Router = require('koa-router')
const router = Router()
const { baseUrl } = require("../../config")
// 引入redis
const Redis = require('../../data/redis')
// 实例化Redis
const Store = Redis.client

router.post(baseUrl + '/note', async ctx => {

  let phone = ctx.request.body.phone
  let str = ''
  for (let i = 0; i < 4; i++) {
    str += Math.floor(Math.random() * 10)
  }

  // 引入短信校验包
  const Core = require('@alicloud/pop-core');
  // 创建实例
  let client = new Core({
    accessKeyId: 'LTAIWRgyQSSukvgN', // 主账号AccessKey的ID，即Key
    accessKeySecret: 'WCVHiGBQsKmoiIl8Y9DK0NZccT1Gdz',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  });


  let params = {
    "RegionId": "cn-hangzhou",// CND 地址默认cn-hangzhou
    "PhoneNumbers": `${phone}`, // 要发送的电话号码
    "SignName": "绿色校园", // 签名名称
    "TemplateCode": "SMS_180055709", // 模板id
    "TemplateParam": `{"code":${str}}` // 参数
  }

  let requestOption = {
    method: 'POST'
  };


  const res = await client.request('SendSms', params, requestOption)

  await Store.set('code', str)
  let st = await Store.expire('code', (60 * 5))

  if (res.Code == 'OK' && st == 1) {
    ctx.body = {
      code: 200
    }
  } else {
    if (res.Code != 'OK') {
      ctx.body = {
        code: 400,
        error: res
      }
    } else {
      ctx.body = {
        code: 400,
        error: st
      }
    }
  }

})

module.exports = router