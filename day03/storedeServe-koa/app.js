const koa = require('koa')
const config = require("./config")
//用来处理post请求的json数据,注:在router被注册到app之前执行
const bodyParser = require('koa-bodyparser')

const cors = require('@koa/cors')
// 插件koa 服务
const app = new koa()
//注册bodyParser用来处理json解析
app.use(bodyParser())

app.use(cors())

// 注册首页路由
let indexs = require("./routers/index");
app.use(indexs.routes()).use(indexs.allowedMethods())


// 注册购物车路由
let myCart = require("./routers/myCenter")
app.use(myCart.routes()).use(myCart.allowedMethods())


// 开启服务
app.listen(
  9999,
  () => {
    console.log(`正在监听${config.serve.ip}:${config.serve.port}`)
  }
)