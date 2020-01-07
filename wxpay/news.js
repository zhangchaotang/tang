const express = require('express')

const router = express.Router()

// const Core = require('@alicloud/pop-core');

router.post('/news', (req, res) => {

  let Phone = req.body.Phone

  let code = Math.floor(Math.random().toString().substr(2,6))

  const SMSClient = require('@alicloud/sms-sdk')

  const accessKeyId = 'LTAIWRgyQSSukvgN'
  const secretAccessKey = 'WCVHiGBQsKmoiIl8Y9DK0NZccT1Gdz'

  let smsClient = new SMSClient({ accessKeyId, secretAccessKey })

  //发送短信
  smsClient.sendSMS({
    PhoneNumbers: Phone, //必填: 待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码, 批量调用相对于单条调用及时性稍有延迟, 验证码类型的短信推荐使用单条调用的方式；发送国际/ 港澳台消息时，接收号码格式为：国际区号 + 号码，如“85200000000”
    SignName: '绿色校园', //必填: 短信签名 - 可在短信控制台中找到
    TemplateCode: 'SMS_180055709', //必填: 短信模板 - 可在短信控制台中找到，发送国际 / 港澳台消息时，请使用国际 / 港澳台短信模版
    TemplateParam: `{"code":${code}}`//可选: 模板中的变量替换JSON串, 如模板内容为"亲爱的${name},您的验证码为${code}"时。
  }).then((ret) => {
    let { Code } = ret
    if (Code === 'OK') {
      //处理返回参数
      // console.log(ret)
      res.json({
        ok: 1,
        data: ret
      })
    }
  }, (err) => {
    // console.log(err)
    res.json({
      ok: 0,
      data: err
    })
  })
})


module.exports = router