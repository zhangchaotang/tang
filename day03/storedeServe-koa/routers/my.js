const Router = require("koa-router")

const md5 = require('md5')

const jwt = require("jsonwebtoken")

const router = new Router();

const db = require("../db")

let defaultURL = '/api/v1'

let { secretKey } = require("../config")


// 登录

router.post(`${defaultURL}/login`, async (ctx, next) => {
  let phone = ctx.request.body.phone
  let password = ctx.request.body.password

  let phoneER = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/

  if (!phoneER.test(phone)) {
    return ctx.body = {
      ok: 0,
      error: '电话号格式不正确!'
    }
  }

  if (password.length > 18 || password.length < 6) {
    return ctx.body = {
      ok: 0,
      error: '密码必须为6到18位!'
    }
  }
  let sql = 'select * from shop_users where phone = ?'
  let [rows, files] = await db.query(sql, phone)
  if (rows.length <= 0) {
    return ctx.body = {
      ok: 0,
      error: '该手机号没有注册'
    }
  } else {
    if (rows[0].password === md5(secretKey + password)) {
      let token = jwt.sign({
        id: rows[0].id
      }, secretKey, { expiresIn: (24 * 30 * 6) + 'h' })
      return ctx.body = {
        ok: 1,
        data: {
          token: token
        }
      }
    } else {
      return ctx.body = {
        ok: 0,
        error: '密码错误!'
      }
    }
  }
})

// 注册
router.post(`${defaultURL}/register`, async (ctx, next) => {
  let phone = ctx.request.body.phone
  let password = ctx.request.body.password

  let phoneER = /^1(3|4|5|7|8)\d{9}$/

  if (!phoneER.test(phone)) {
    return ctx.body = {
      ok: 0,
      error: '电话号格式不正确!'
    }
  }

  if (password.length > 18 || password.length < 6) {
    return ctx.body = {
      ok: 0,
      error: '密码必须为6到18位!'
    }
  }


  let sql = 'select count(*) c from shop_users where phone = ?'
  let [rows, files] = await db.query(sql, phone)
  if (rows[0].c > 0) {
    return ctx.body = {
      ok: 0,
      error: '手机号码已被注册'
    }
  } else {

    let date = parseInt(new Date().getTime() / 1000)
    let sql = 'INSERT INTO shop_users SET ?'
    let data = {
      phone,
      password: md5(secretKey + password),
      date
    }

    let [rows, files] = await db.query(sql, data)
    if (rows[0].affectedRows) {
      return {
        ok: 1
      }
    } else {
      return {
        ok: 0
      }
    }
  }
})


module.exports = router