// 引入express 框架
const express = require("express")
// 引入cores 跨域包
const cous = require("cors")
// 引入bodyParser
const bodyParser = require("body-parser")
// 引入配置文件
const config = require("./config")
// 创建app服务
const app = express();
// 注册cors
app.use(cous())
// 注册bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 引入登录路由
const loginRouter = require("./routers/login")
app.use(loginRouter)
// 引入题目路由
const stemesRouter = require("./routers/stemes")
app.use(stemesRouter)
// 启动服务
app.listen(
  config.server.port,
  config.server.ip,
  () => {
    console.log(`正在监听：${config.server.ip}:${config.server.port}`)
  })