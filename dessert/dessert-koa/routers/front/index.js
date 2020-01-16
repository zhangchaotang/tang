// 首页接口
// 创建路由
const Router = require("koa-router")
const router = Router()
// 引入mysql
const db = require('../../data/db')
// 引入基地址
const { baseUrl } = require('../../config')
// 引入jwt
const jwt = require('koa-jsonwebtoken')

// 获取首页轮播图数据

// 获取首页推荐数据
router.get( baseUrl + '/index', async ctx =>{
    let sql = `SELECT a.title title, c.* FROM recommend a
                LEFT JOIN recommend_goods b ON a.id = b.r_id
                LEFT JOIN goods c ON b.g_id = c.id
              `
    let row = await db.query(sql)

    console.log(row)
})