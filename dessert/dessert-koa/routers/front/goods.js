// 关于商品的操作
const router = require('koa-router')()
// 引入mysql
const db = require('../../data/db')
// 引入验证中间件jwt
const jwt = require('../../tools/variftoken')
// 引入跟路径
const { baseUrl } = require('../../config')

//#region 创建路由
//#endregion
// 获取首页商品
// 获取商品详情
// 获取商品评论

// 积分商品
router.get(baseUrl + '/integral_goods', jwt, async ctx => {
  let page = parseInt(ctx.request.query.page) || 1
  let pageSize = parseInt(ctx.request.query.pageSize) || 4
  let index = (page - 1) * pageSize
  let sql = `SELECT a.*,b.g_name,c.ingredient 
              FROM conversion_goods a 
              LEFT JOIN goods b ON a.g_id = b.id  
              LEFT JOIN particulars_img c ON c.g_id = b.id
              LIMIT ?`
  let row = await db.query(sql, [[index, pageSize]])
  let total = await db.query('SELECT COUNT(*) total FROM conversion_goods')
  ctx.body = {
    code: 200,
    data: row,
    total: total[0].total
  }
})
// 获取 充值商品
router.get(baseUrl + '/getPay', async ctx => {
  let sql = `SELECT b.g_name,b.id,c.ingredient url
              FROM goods b 
              LEFT JOIN particulars_img c ON c.g_id = b.id
              WHERE b_id = 1
             `
  let row = await db.query(sql)
  ctx.body = {
    code: 200,
    data: row
  }
})
// 根据分类和品牌检索商品
router.get(baseUrl + '/searchGoods', async ctx => {
  // 获取参数
  let page = parseInt(ctx.request.query.page) || 1
  let pageSize = parseInt(ctx.request.query.pageSize) || 4
  let index = (page - 1) * pageSize
  let cid = ctx.request.query.cid
  let bid = ctx.request.query.bid
  // 定义sql语句
  let sql = ''
  let data = []
  // 判断参数
  if (cid == undefined && bid != undefined) {
    sql = `SELECT a.*,b.ingredient src 
          FROM goods a
          LEFT JOIN particulars_img b ON a.id = b.g_id
          WHERE a.b_id = ?
          LIMIT ?
        `
    data = [bid, [index, pageSize]]
  } else if (cid != undefined && bid == undefined) {
    sql = `SELECT a.*,c.ingredient src
           FROM goods a
           LEFT JOIN goods_classify b ON a.id = b.g_id
           LEFT JOIN particulars_img c ON c.g_id = b.g_id
           WHERE b.c_id = ?
        `
    data = [cid]
  } else {
    sql = `SELECT a.*,d.ingredient src
           FROM goods a
           LEFT JOIN goods_classify b ON a.id = b.g_id
           LEFT JOIN particulars_img c ON c.g_id = b.g_id
           LEFT JOIN particulars_img d ON d.g_id = b.g_id
           WHERE b.c_id = ? AND a.b_id = ?
          `
    data = [cid, bid]
  }
  let row = await db.query(sql, data)
  ctx.body = {
    code: 200,
    data: row
  }

})

//  获取商品规格
router.get(baseUrl + '/spec', async ctx => {
  let g_id = 50
  let sql = 'SELECT * FROM goods_skus WHERE g_id =?'
  let row = await db.query(sql, g_id)


  let specArr1 = row.map((v, k) => {
    v.spec_list = v.spec_list.split('|')
    return v
  })

  specArr1.forEach((e, i) => {
    let arr = []
    e.spec_list.forEach((v, k) => {
      arr.push(v.split('-'))
      e.spec_list = arr
    })
  });

  let specArr2 = JSON.parse(JSON.stringify(specArr1))

  for (let i = 0; i < specArr1.length; i++) {
    for (let j = 0; j < specArr1[i].spec_list.length; j++) {
      let row = await db.query('SELECT name FROM spec WHERE id = ?', specArr1[i].spec_list[j][0])
      specArr2[i].spec_list[j] = row[0].name + ':' + specArr1[i].spec_list[j][1]
      // specArr2[i].spec_list[j][] = 
    }
  }


  ctx.body = {
    code: 200,
    data: specArr2
  }
})
// 导出router
module.exports = router