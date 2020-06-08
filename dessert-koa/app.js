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


app.use(require('koa-static')(__dirname + '/public'))

//  导入路由
// 后台登录
const adminLogin = require('./routers/admin/login')
app.use(adminLogin.routes())
// 添加管理员
const adminRegister = require('./routers/admin/register')
app.use(adminRegister.routes())
// 商品管理
const adminGoods = require('./routers/admin/goods')
app.use(adminGoods.routes())
// 分类管理
const adminClassify = require('./routers/admin/classify')
app.use(adminClassify.routes())

// 品牌管理
const adminBrand = require('./routers/admin/brand')
app.use(adminBrand.routes())

// 图片上传
const upload = require('./routers/admin/upload')
app.use(upload.routes())

// 获取图片验证码
const cap = require('./routers/front/getCaptcha')
app.use(cap.routes())
// 短信校验
const note = require('./routers/front/note')
app.use(note.routes())

// 用户注册
const rejister = require('./routers/front/rejister')
app.use(rejister.routes())
// 用户登录
const login = require('./routers/front/login')
app.use(login.routes())
// 用户订单
const order = require('./routers/front/order')
app.use(order.routes())
// 用户中心
const user = require('./routers/front/user')
app.use(user.routes())
// 商品
const goods = require('./routers/front/goods')
app.use(goods.routes())
// 前端首页
const frontIndex = require('./routers/front/index')
app.use(frontIndex.routes())
app.use(async ctx => {
  ctx.body = 'Hello World'
})




// 开启koa服务
app.listen(9960)