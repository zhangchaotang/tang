const app = require("express")()

const bodyParser = require("body-parser")

// 向body-parser 注入读取xml的包
require('body-parser-xml')(bodyParser)

// 解析微信 传入的xml数据
app.use(bodyParser.xml())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 创建接口 接收微信传入的数据
app.post("/wxpay", (req, res) => {
  console.log(req.body)

  res.end(`<xml>
          <return_code>SUCCESS</return_code>
          <return_msg>OK</return_msg>
        </xml>`)
})

app.use(require('./news'))

app.listen(7878, () => {
  console.log('http://127.0.0.1:7878')
})