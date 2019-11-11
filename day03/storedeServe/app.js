const express = require('express')
// 引入配置文件
const config = require("./config")
const bodyPaser = require("body-parser")
// 创建服务
const app = express()
const cors = require('cors')
// 配置跨域资源共享
app.use(cors())

// 创建静态资源
app.use(express.static('public'))

// 配置 bodyPaser
app.use(bodyPaser.urlencoded({extended:true}))

//引入首页路由
app.use(require('./routers/home'))
app.use(require('./routers/myCenter'))
// 开启服务
app.listen(
  config.serve.port,
  config.serve.ip,
  () => {
    console.log(`正在监听${config.serve.ip}:${config.serve.port}`)
  }
)