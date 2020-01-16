// 1. 引入koa
const koa = require('koa')
// 2. 创建koa服务
const app = new koa()
// 引入 cors包
const cors = require('koa2-cors')
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
// 后台登录
const adminLogin = require('./routers/admin/login')
app.use(adminLogin.routes())
// 添加管理员
const adminRegister= require('./routers/admin/register')
app.use(adminRegister.routes())
// 商品管理
const adminGoods= require('./routers/admin/goods')
app.use(adminGoods.routes())
// 分类管理
const adminClassify= require('./routers/admin/classify')
app.use(adminClassify.routes())

app.use(async ctx => {
  ctx.body = 'Hello World'
})


// 开启koa服务
app.listen(9960)