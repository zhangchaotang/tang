// 引入发起请求包
const request = require('request')

const md5 = require('md5')

const xmlreader = require("xmlreader")

const qrcode = require('qrcode')

let api = 'https://api.mch.weixin.qq.com/pay/unifiedorder'

// 花钱申请到的账号（这里直接使用测试账号（SDK包中拿到的））
let appid = 'wx426b3015555a46be'
let mch_id = '1900009851'
let key = '8934e7d15453e97507ef794cf7b0519d'

// 拼出所有必须数据
let data = {
  appid,
  mch_id,
  nonce_str: md5(Math.random()),
  body: '腾讯充值中心-QQ会员充值',
  out_trade_no: parseInt(Math.random() *100000),
  total_fee: 1,
  spbill_create_ip: '123.12.12.123',
  notify_url: 'http.192.168.43.6/wxpay',
  trade_type: 'NATIVE'
}

// 把数据转换为xml数据
let xmlData = '<xml>'

let arr = []
for (let i in data) {
  xmlData += `<${i}>${data[i]}</${i}>`
  arr.push(i + '=' + data[i])
}

// 生成签名
let sign = md5(arr.sort().join('&') + '&key=' + key).toUpperCase()

xmlData += `<sign>${sign}</sign>`

xmlData += '</xml>'

// console.log(xmlData)

// 调用接口

request.post(api, { body: xmlData }, (err, res, body) => {
  // 解析返回的xml数据
  xmlreader.read(body, (error, res) => {
    // console.log(res)

    let qrcodeText = res.xml.code_url.at(0).text()

    // // 生成二维码
    qrcode.toDataURL(qrcodeText, (err2, url) => {
      console.log(url)
    })
  })
})