const express = require('express')
const router = express.Router()
const db = require('../db')
const config = require("../config")

// 根据请求的商品id列表 返回对应的商品

router.get("/api/v1/goods", (req, res) => {
  let goodsList = req.query.goodsList
  // console.log(goodsList)
  let sql = `select * from shop_goods where id in(?)`
  db.query(sql,[goodsList],(error, data) => {
    if (error) {
      res.json({
        ok: 0,
        error: error
      })
    } else {
      res.json({
        ok: 1,
        data: data
      })
    }
  })
})


module.exports = router