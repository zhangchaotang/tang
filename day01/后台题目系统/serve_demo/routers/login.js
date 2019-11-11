const express = require("express")
const md5 = require("md5")
const router = express.Router()
const db = require("../db")
const { secret_key } = require("../config")

// 登录
router.post("/login", (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let sql = "select * from user where username = ?"
  db.query(sql, username, (error, data) => {
    if (error) {
      return res.json({
        code: 400,
        error: error,
        msg:"登录失败!"
      })
    }
    if (data.length == 0) {
      res.json({
        code: 400,
        msg: "没有这个用户名"
      })
    } else {
      if (data[0].password == password) {
        res.json({
          code: 200,
          data:{
            token: md5(secret_key + password),
            username:username
          },
          msg: "登录成功!"
        })
      } else {
        res.json({
          code: 400,
          msg: "密码错误"
        })
      }
    }
  })

})

// 退出登录

module.exports = router;