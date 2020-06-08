// 图片上传
const Router = require('koa-router')
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl, adminKey, accessKeyId, accessKeySecret } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 引入 fs path 模块
const fs = require('fs')
const path = require('path')
// 引入 阿里oss模块
const OSS = require('ali-oss')
// 配置 oss上传仓库
const client = new OSS({
  region: 'oss-cn-beijing',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  // oss 中 密钥id
  accessKeyId,
  // oss 访问权限代码
  accessKeySecret,
  //  存储仓库名字
  bucket: 'zhangchaotang',
})

// 引入 接收图片模块
const multer = require('koa-multer')
//文件上传
//配置
const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
const upload = multer({ storage: storage });



// 接收上传图片

router.post(baseUrl + '/upload', upload.single('file'), async (ctx) => {
  // console.log(ctx.req.file)
  // 上传 文件 指令
  // const result = await client.put('/dessert/' + ctx.req.file.filename, ctx.req.file.path);
  // fs.unlinkSync(ctx.req.file.path)
  // ctx.body = {
  //   code: 200,
  //   url: result.url
  // }

  ctx.body = {
    code: 200,
    url: 'http://127.0.0.1:9960/upload/' + ctx.req.file.filename
  }
})


module.exports = router
