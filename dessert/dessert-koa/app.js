// 1. 引入koa
const koa = require('koa')
// 2. 创建koa服务
const app = new koa()
// 引入 cors包
const cors = require('koa-bodyparser')
// 引入bodyParser
const bodyparser = require("koa-bodyparser")

app.on('error', async (err, ctx) => {
  console.error('server error', err);
});

// 注册 cors 
app.use(cors())

// 注册bodyparser
app.use(bodyparser())

//  导入路由

const adminLogin = require('./routers/admin/login')

app.use(adminLogin.routes())


app.use(async ctx => {
  ctx.body = 'Hello World'
})


// 开启koa服务
app.listen(3000)