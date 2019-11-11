const express = require('express')
const router = express.Router()
const db = require('../db')
const config = require("../config")

// 返回首页轮播图
router.get("/api/v1/main_ad_images",(req,res)=>{
  let sql = 'select image,link from shop_slideshow'
  db.query(sql,(error,data)=>{
    if(error) {
      res.json({
        ok:0,
        error:error
      })
    } else {
      res.json({
        ok:1,
        data:data
      })
    }
  })
})

// 返回首页推荐商品分类
router.get("/api/v1/index_categories",(req,res)=>{
  let sql = 'select id,cat_name from shop_classify where isRecommend = 1'
  db.query(sql,(error,data)=>{
    if(error) {
      res.json({
        ok:0,
        error:error
      })
    } else {
      res.json({
        ok:1,
        data:data
      })
    }
  })
})

// 返回首页推荐商品
router.get("/api/v1/index_goods",(req,res)=>{
  let page = req.query.page;
  let per_page = req.query.per_page;
  let index = (page-1) * per_page
  let sql = `select id,goods_name,price,image from shop_goods where isRecommend = 1 limit ${index},${per_page}`
  db.query(sql,(error,data)=>{
    if(error) {
      res.json({
        ok:0,
        error:error
      })
    } else {
      res.json({
        ok:1,
        data:data
      })
    }
  })
})


module.exports = router
